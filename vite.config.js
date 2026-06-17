var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
function readJsonBody(request) {
    return new Promise(function (resolve, reject) {
        var raw = "";
        request.on("data", function (chunk) {
            raw += chunk;
            if (raw.length > 24000) {
                reject(new Error("Payload too large"));
                request.destroy();
            }
        });
        request.on("end", function () {
            try {
                resolve(raw ? JSON.parse(raw) : {});
            }
            catch (error) {
                reject(error);
            }
        });
        request.on("error", reject);
    });
}
function sendJson(response, statusCode, payload) {
    response.statusCode = statusCode;
    response.setHeader("Content-Type", "application/json; charset=utf-8");
    response.end(JSON.stringify(payload));
}
function deepSeekPrompt(payload) {
    return [
        "你是小游戏《锐评家》的文案引擎。",
        "根据领域、作品类型线索、评委姓名和评委性格，生成荒诞、搞笑、尖锐但不恶意的人格化评论。",
        "purpose=critique 时只输出一句锐评，最多 22 个中文字符；可以偶尔只输出一个搞怪 emoji。",
        "purpose=magic 时输出一段讽刺雷霆修改意见，最多 58 个中文字符，适合弹窗展示。",
        "不要解释，不要 Markdown，不要引号，不要输出敏感或仇恨内容。",
        "\u8F93\u5165\uFF1A".concat(JSON.stringify(payload)),
    ].join("\n");
}
function deepSeekDevProxy() {
    return {
        configureServer: function (server) {
            var _this = this;
            server.middlewares.use("/api/deepseek-critique", function (request, response) { return __awaiter(_this, void 0, void 0, function () {
                var apiKey, payload, upstream, data, text, _a;
                var _b, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            if (request.method !== "POST") {
                                sendJson(response, 405, { error: "Method not allowed" });
                                return [2 /*return*/];
                            }
                            apiKey = process.env.DEEPSEEK_API_KEY;
                            if (!apiKey) {
                                sendJson(response, 503, { error: "DeepSeek API key is not configured" });
                                return [2 /*return*/];
                            }
                            _e.label = 1;
                        case 1:
                            _e.trys.push([1, 5, , 6]);
                            return [4 /*yield*/, readJsonBody(request)];
                        case 2:
                            payload = _e.sent();
                            return [4 /*yield*/, fetch("https://api.deepseek.com/chat/completions", {
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
                                        Authorization: "Bearer ".concat(apiKey),
                                        "Content-Type": "application/json",
                                    },
                                    method: "POST",
                                })];
                        case 3:
                            upstream = _e.sent();
                            if (!upstream.ok) {
                                sendJson(response, upstream.status, { error: "DeepSeek request failed" });
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, upstream.json()];
                        case 4:
                            data = _e.sent();
                            text = String(((_d = (_c = (_b = data === null || data === void 0 ? void 0 : data.choices) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.message) === null || _d === void 0 ? void 0 : _d.content) || "").trim();
                            sendJson(response, 200, { text: text });
                            return [3 /*break*/, 6];
                        case 5:
                            _a = _e.sent();
                            sendJson(response, 500, { error: "DeepSeek proxy failed" });
                            return [3 /*break*/, 6];
                        case 6: return [2 /*return*/];
                    }
                });
            }); });
        },
        name: "deepseek-dev-proxy",
    };
}
export default defineConfig(function (_a) {
    var mode = _a.mode;
    Object.assign(process.env, loadEnv(mode, process.cwd(), ""));
    return {
        base: "./",
        plugins: [react(), deepSeekDevProxy()],
        server: {
            allowedHosts: [".loca.lt"],
        },
    };
});
