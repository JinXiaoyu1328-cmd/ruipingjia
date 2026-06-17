import type { IncomingMessage, ServerResponse } from "node:http";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

function readJsonBody(request: IncomingMessage) {
  return new Promise<Record<string, unknown>>((resolve, reject) => {
    let raw = "";
    request.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > 24_000) {
        reject(new Error("Payload too large"));
        request.destroy();
      }
    });
    request.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch (error) {
        reject(error);
      }
    });
    request.on("error", reject);
  });
}

function sendJson(response: ServerResponse, statusCode: number, payload: Record<string, unknown>) {
  response.statusCode = statusCode;
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.end(JSON.stringify(payload));
}

function deepSeekPrompt(payload: Record<string, unknown>) {
  return [
    "你是小游戏《锐评家》的文案引擎。",
    "根据领域、作品类型线索、评委姓名和评委性格，生成荒诞、搞笑、尖锐但不恶意的人格化评论。",
    "purpose=critique 时只输出一句锐评，最多 22 个中文字符；可以偶尔只输出一个搞怪 emoji。",
    "purpose=magic 时输出一段讽刺雷霆修改意见，最多 58 个中文字符，适合弹窗展示。",
    "不要解释，不要 Markdown，不要引号，不要输出敏感或仇恨内容。",
    `输入：${JSON.stringify(payload)}`,
  ].join("\n");
}

function deepSeekDevProxy() {
  return {
    configureServer(server: { middlewares: { use: (path: string, handler: (request: IncomingMessage, response: ServerResponse) => void) => void } }) {
      server.middlewares.use("/api/deepseek-critique", async (request, response) => {
        if (request.method !== "POST") {
          sendJson(response, 405, { error: "Method not allowed" });
          return;
        }
        const apiKey = process.env.DEEPSEEK_API_KEY;
        if (!apiKey) {
          sendJson(response, 503, { error: "DeepSeek API key is not configured" });
          return;
        }
        try {
          const payload = await readJsonBody(request);
          const upstream = await fetch("https://api.deepseek.com/chat/completions", {
            body: JSON.stringify({
              messages: [
                {
                  content: deepSeekPrompt(payload),
                  role: "user",
                },
              ],
              model: process.env.DEEPSEEK_MODEL || "deepseek-chat",
              temperature: 1.08,
            }),
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
            method: "POST",
          });
          if (!upstream.ok) {
            sendJson(response, upstream.status, { error: "DeepSeek request failed" });
            return;
          }
          const data = await upstream.json();
          const text = String(data?.choices?.[0]?.message?.content || "").trim();
          sendJson(response, 200, { text });
        } catch {
          sendJson(response, 500, { error: "DeepSeek proxy failed" });
        }
      });
    },
    name: "deepseek-dev-proxy",
  };
}

export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ""));
  return {
    base: "./",
    plugins: [react(), deepSeekDevProxy()],
    server: {
      allowedHosts: [".loca.lt"],
    },
  };
});
