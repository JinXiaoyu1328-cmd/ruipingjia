import { type ChangeEvent, type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import criticOne from "./assets/critic-1.png";
import criticThree from "./assets/critic-3.png";
import criticTwo from "./assets/critic-2.png";
import escapeRunner from "./assets/escape-runner.svg";
import fashionIcon from "./assets/fashion-icon.svg";
import foodCriticOne from "./assets/food-critic-1.png";
import foodCriticThree from "./assets/food-critic-3.png";
import foodCriticTwo from "./assets/food-critic-2.png";
import foodFunnyRamsayOne from "./assets/food-funny-ramsay-01.png";
import foodFunnyRamsayTwo from "./assets/food-funny-ramsay-02.png";
import foodFunnyXiaolangEight from "./assets/food-funny-xiaolang-08.png";
import foodFunnyXiaolangEleven from "./assets/food-funny-xiaolang-11.png";
import foodFunnyXiaolangFive from "./assets/food-funny-xiaolang-05.png";
import foodFunnyXiaolangFour from "./assets/food-funny-xiaolang-04.png";
import foodFunnyXiaolangNine from "./assets/food-funny-xiaolang-09.png";
import foodFunnyXiaolangOne from "./assets/food-funny-xiaolang-01.png";
import foodFunnyXiaolangSeven from "./assets/food-funny-xiaolang-07.png";
import foodFunnyXiaolangSix from "./assets/food-funny-xiaolang-06.png";
import foodFunnyXiaolangTen from "./assets/food-funny-xiaolang-10.png";
import foodFunnyXiaolangThree from "./assets/food-funny-xiaolang-03.png";
import foodFunnyXiaolangTwo from "./assets/food-funny-xiaolang-02.png";
import foodForkKnife from "./assets/food-fork-knife.svg";
import foodIcon from "./assets/food-icon.svg";
import foodJudgeButtonOne from "./assets/food-judge-button-1.png";
import foodJudgeButtonThree from "./assets/food-judge-button-3.png";
import foodJudgeButtonTwo from "./assets/food-judge-button-2.png";
import foodUploadGroup from "./assets/food-upload-group38.svg";
import foodUploadVector from "./assets/food-upload-vector4.svg";
import foodUploadTapArea from "./assets/food-upload-vector50.svg";
import frame04LeftIcon from "./assets/frame04-left-icon.svg";
import judgePlaceholders from "./assets/judge-placeholders.svg";
import foodFrame04BubbleOne from "./assets/food-frame04-bubble-transparent-1.png";
import foodFrame04BubbleThree from "./assets/food-frame04-bubble-transparent-3.png";
import foodFrame04BubbleTwo from "./assets/food-frame04-bubble-transparent-2.png";
import musicIcon from "./assets/music-icon.svg";
import nextArrow from "./assets/next-arrow.svg";
import paintingIcon from "./assets/painting-icon.svg";
import paintingFunnyCandidateTwo from "./assets/painting-funny-candidate-2.png";
import paintingFunnyCandidateThree from "./assets/painting-funny-candidate-3.png";
import paintingJudgePicasso from "./assets/painting-judge-picasso.png";
import paintingJudgeVangogh from "./assets/painting-judge-vangogh.png";
import photoIcon from "./assets/photo-icon.svg";
import uploadFashionStickerBg from "./assets/upload-fashion-sticker-bg.svg";
import uploadFashionVector8 from "./assets/upload-fashion-vector8.svg";
import uploadFashionVector9 from "./assets/upload-fashion-vector9.svg";
import uploadMusicStickerBg from "./assets/upload-music-sticker-bg.svg";
import uploadMusicVector17 from "./assets/upload-music-vector17.svg";
import uploadPaintingStickerBg from "./assets/upload-painting-sticker-bg.svg";
import uploadPaintingVector15 from "./assets/upload-painting-vector15.svg";
import uploadPhotoStickerBg from "./assets/upload-photo-sticker-bg.svg";
import uploadPhotoVector15 from "./assets/upload-photo-vector15.svg";
import uploadWritingStickerBg from "./assets/upload-writing-sticker-bg.svg";
import uploadWritingVector4 from "./assets/upload-writing-vector4.svg";
import uploadWritingVector5 from "./assets/upload-writing-vector5.svg";
import uploadWritingVector6 from "./assets/upload-writing-vector6.svg";
import uploadWritingVector7 from "./assets/upload-writing-vector7.svg";
import writingPaperFrame01 from "./assets/writing-paper-frames/paper-01.png";
import writingPaperFrame02 from "./assets/writing-paper-frames/paper-02.png";
import writingPaperFrame03 from "./assets/writing-paper-frames/paper-03.png";
import writingPaperFrame04 from "./assets/writing-paper-frames/paper-04.png";
import writingPaperFrame05 from "./assets/writing-paper-frames/paper-05.png";
import writingPaperFrame06 from "./assets/writing-paper-frames/paper-06.png";
import writingPaperFrame07 from "./assets/writing-paper-frames/paper-07.png";
import writingPaperFrame08 from "./assets/writing-paper-frames/paper-08.png";
import writingPaperFrame09 from "./assets/writing-paper-frames/paper-09.png";
import writingPaperFrame10 from "./assets/writing-paper-frames/paper-10.png";
import writingPaperFrame11 from "./assets/writing-paper-frames/paper-11.png";
import waitFashionMain from "./assets/wait-fashion-main.svg";
import waitFoodMain from "./assets/wait-food-main.svg";
import waitMusicMain from "./assets/wait-music-main.svg";
import waitPaintingMain from "./assets/wait-painting-main.svg";
import waitWritingMain from "./assets/wait-writing-main.svg";
import writingIcon from "./assets/writing-icon.svg";

type Domain = "food" | "writing" | "fashion" | "painting" | "photo" | "music";
type Route = { domain: "home"; step: 0 } | { domain: Domain; step: number };

type Judge = {
  domain?: Domain;
  funnySrcs?: string[];
  id: string;
  name: string;
  src: string;
};

type CritiqueBubble = {
  id: number;
  judgeId: string;
  projectile: "bomb" | "egg" | "knife";
  slot: number;
  text: string;
};

type FunnyFaceState = {
  src: string;
  nonce: number;
};

type UploadedMediaKind = "audio" | "image" | "video";

type FoodAnalysis = {
  cues: string;
  kind: string;
  source: "api" | "local";
};

type FoodModalState = "escape" | "magic-select" | "magic-result" | null;

type FoodToastState = {
  duration: number;
  id: number;
  text: string;
} | null;

type HomeEntry = {
  domain: Domain;
  label: string;
  src: string;
  className: string;
  imageClassName: string;
};

type DomainFlow = {
  domain: Domain;
  title: string;
  uploadLabel: string;
  nodeIds: string[];
  mainSrc: string;
  mainClassName: string;
  homeEntry: HomeEntry;
};

const WRITING_AVATAR_VERSION = "writing-judges-rebuilt-20260612";
const NORMAL_AVATAR_VERSION = "normal-transparent-20260612-layout2";

function judgeAsset(path: string) {
  return `${path}?v=${NORMAL_AVATAR_VERSION}`;
}

const desktopJudgeModules = import.meta.glob("./assets/judges/**/*.png", {
  eager: true,
  import: "default",
  query: "?url",
}) as Record<string, string>;

const desktopJudgeFolderByDomain: Record<Domain, string> = {
  fashion: "时尚穿搭锐评",
  food: "美食锐评",
  music: "音乐锐评",
  painting: "绘画设计锐评",
  photo: "摄影锐评",
  writing: "文学锐评",
};

function frameNumberFromPath(path: string) {
  return Number.parseInt(path.match(/Frame\s+(\d+)/)?.[1] || "0", 10);
}

function getDesktopJudgeAssets(domain: Domain, stage: "变脸前" | "变脸后", judgeName?: string) {
  const folder = desktopJudgeFolderByDomain[domain];
  return Object.entries(desktopJudgeModules)
    .filter(([path]) => {
      const segments = path.split("/");
      const domainIndex = segments.indexOf(folder);
      if (domainIndex < 0) return false;
      const stageIndex = segments.indexOf(stage);
      if (stageIndex < 0) return false;
      if (judgeName && segments[domainIndex + 1] !== judgeName) return false;
      return true;
    })
    .sort(([a], [b]) => frameNumberFromPath(a) - frameNumberFromPath(b))
    .map(([, src]) => src);
}

function getDesktopJudgePool(domain: Domain, fallback: Judge[]): Judge[] {
  const folder = desktopJudgeFolderByDomain[domain];
  const judgeNames = Array.from(
    new Set(
      Object.keys(desktopJudgeModules)
        .map((path) => {
          const segments = path.split("/");
          const domainIndex = segments.indexOf(folder);
          return domainIndex >= 0 ? segments[domainIndex + 1] : "";
        })
        .filter(Boolean),
    ),
  );
  if (judgeNames.length === 0) return fallback;
  const judges: Judge[] = [];
  judgeNames.forEach((name) => {
      const beforeAssets = getDesktopJudgeAssets(domain, "变脸前", name);
      if (beforeAssets.length === 0) return;
      judges.push({
        domain,
        funnySrcs: getDesktopJudgeAssets(domain, "变脸后", name),
        id: `${domain}-desktop-${name}`,
        name,
        src: beforeAssets[0],
      });
    });
  return judges;
}

const foodJudgePool: Judge[] = [
  { id: "food-xiaolang", name: "小郎二野", src: judgeAsset("/judge-assets/food-xiaolang.png") },
  { id: "food-bourdain", name: "安东尼·波登", src: judgeAsset("/judge-assets/food-bourdain.png") },
  { id: "food-ramsay", name: "戈登·拉姆齐", src: judgeAsset("/judge-assets/food-ramsay.png") },
  { id: "food-cailan", name: "蔡澜", src: judgeAsset("/judge-assets/food-cailan.png") },
  { id: "food-caokefan", name: "曹可凡", src: judgeAsset("/judge-assets/food-caokefan.png") },
];

const writingJudgePool: Judge[] = [
  { id: "writing-tolstoy", name: "列夫·托尔斯泰", src: `/judge-assets/writing-tolstoy.png?v=${WRITING_AVATAR_VERSION}-${NORMAL_AVATAR_VERSION}` },
  { id: "writing-shakespeare", name: "莎士比亚", src: `/judge-assets/writing-shakespeare.png?v=${WRITING_AVATAR_VERSION}-${NORMAL_AVATAR_VERSION}` },
  { id: "writing-hemingway", name: "海明威", src: `/judge-assets/writing-hemingway.png?v=${WRITING_AVATAR_VERSION}-${NORMAL_AVATAR_VERSION}` },
  { id: "writing-luxun", name: "鲁迅", src: `/judge-assets/writing-luxun.png?v=${WRITING_AVATAR_VERSION}-${NORMAL_AVATAR_VERSION}` },
];

const fashionJudgePool: Judge[] = [
  { id: "fashion-wintour", name: "安娜·温图尔", src: judgeAsset("/judge-assets/fashion-wintour.png") },
  { id: "fashion-lagerfeld", name: "卡尔·拉格斐", src: judgeAsset("/judge-assets/fashion-lagerfeld.png") },
  { id: "fashion-kawakubo", name: "川久保玲", src: judgeAsset("/judge-assets/fashion-kawakubo.png") },
  { id: "fashion-saint-laurent", name: "伊夫·圣罗兰", src: judgeAsset("/judge-assets/fashion-saint-laurent.png") },
  { id: "fashion-chanel", name: "可可·香奈儿", src: judgeAsset("/judge-assets/fashion-chanel.png") },
];

const musicJudgePool: Judge[] = [
  { id: "music-beethoven", name: "贝多芬", src: judgeAsset("/judge-assets/music-beethoven.png") },
  { id: "music-jay", name: "周杰伦", src: judgeAsset("/judge-assets/music-jay.png") },
  { id: "music-tchaikovsky", name: "柴科夫斯基", src: judgeAsset("/judge-assets/music-tchaikovsky.png") },
  { id: "music-jj", name: "林俊杰", src: judgeAsset("/judge-assets/music-jj.png") },
  { id: "music-liuhuan", name: "刘欢", src: judgeAsset("/judge-assets/music-liuhuan.png") },
];

const paintingJudgePool: Judge[] = [
  { id: "painting-monet", name: "莫奈", src: judgeAsset("/judge-assets/painting-monet.png") },
  { id: "painting-davinci", name: "达·芬奇", src: judgeAsset("/judge-assets/painting-davinci.png") },
  { id: "painting-vangogh", name: "梵高", src: judgeAsset("/judge-assets/painting-vangogh.png") },
  { id: "painting-picasso", name: "毕加索", src: judgeAsset("/judge-assets/painting-picasso.png") },
  { id: "painting-ive", name: "乔纳森·伊夫", src: judgeAsset("/judge-assets/painting-ive.png") },
  { id: "painting-hara", name: "原研哉", src: judgeAsset("/judge-assets/painting-hara.png") },
  { id: "painting-dyson", name: "詹姆斯·戴森", src: judgeAsset("/judge-assets/painting-dyson.png") },
  { id: "painting-pei", name: "贝聿铭", src: judgeAsset("/judge-assets/painting-pei.png") },
];

const photoJudgePool: Judge[] = [
  { id: "photo-mccurry", name: "史蒂夫·迈凯瑞", src: judgeAsset("/judge-assets/photo-mccurry.png") },
  { id: "photo-bresson", name: "亨利·卡蒂埃-布列松", src: judgeAsset("/judge-assets/photo-bresson.png") },
  { id: "photo-chenman", name: "陈漫", src: judgeAsset("/judge-assets/photo-chenman.png") },
  { id: "photo-maier", name: "薇薇安·迈尔", src: judgeAsset("/judge-assets/photo-maier.png") },
  { id: "photo-adams", name: "安塞尔·亚当斯", src: judgeAsset("/judge-assets/photo-adams.png") },
];

const judgePoolsByDomain: Record<Domain, Judge[]> = {
  fashion: getDesktopJudgePool("fashion", fashionJudgePool),
  food: getDesktopJudgePool("food", foodJudgePool),
  music: getDesktopJudgePool("music", musicJudgePool),
  painting: getDesktopJudgePool("painting", paintingJudgePool),
  photo: getDesktopJudgePool("photo", photoJudgePool),
  writing: getDesktopJudgePool("writing", writingJudgePool),
};

const foodJudgeButtonAssets: Record<string, string> = {
  "food-xiaolang": foodJudgeButtonOne,
  "food-bourdain": foodJudgeButtonThree,
  "food-ramsay": foodJudgeButtonTwo,
};

const critiqueBubbleAssets = [foodFrame04BubbleOne, foodFrame04BubbleTwo, foodFrame04BubbleThree];

const writingFunnyFaceAssets: Record<string, string[]> = {
  "writing-hemingway": [`/judge-assets/funny-writing-hemingway-1.png?v=${WRITING_AVATAR_VERSION}`],
  "writing-luxun": [`/judge-assets/funny-writing-luxun-1.png?v=${WRITING_AVATAR_VERSION}`, `/judge-assets/funny-writing-luxun-2.png?v=${WRITING_AVATAR_VERSION}`],
  "writing-shakespeare": [`/judge-assets/funny-writing-shakespeare-1.png?v=${WRITING_AVATAR_VERSION}`],
  "writing-tolstoy": [`/judge-assets/funny-writing-tolstoy-1.png?v=${WRITING_AVATAR_VERSION}`],
};

const foodCritiqueLines: Record<string, string[]> = {
  "food-xiaolang": ["先别跑，这作品比我还急。", "我锐评完，它也想逃跑。", "味道很努力，方向全错。"],
  "food-bourdain": ["大胆，混乱，像迷路旅行。", "锅在流浪，味道没护照。", "它有野心，但没到达。"],
  "food-ramsay": ["醒醒！锅都想辞职。", "这不是料理，是警报。", "羊驼都比它有层次。"],
};

const foodFunnyFaceAssets: Record<string, string[]> = {
  "food-xiaolang": [
    "/judge-assets/funny-food-xiaolang-1.png",
    "/judge-assets/funny-food-xiaolang-2.png",
    foodFunnyXiaolangOne,
    foodFunnyXiaolangTwo,
    foodFunnyXiaolangThree,
    foodFunnyXiaolangFour,
    foodFunnyXiaolangFive,
    foodFunnyXiaolangSix,
    foodFunnyXiaolangSeven,
    foodFunnyXiaolangEight,
    foodFunnyXiaolangNine,
    foodFunnyXiaolangTen,
    foodFunnyXiaolangEleven,
  ],
  "food-ramsay": ["/judge-assets/funny-food-ramsay-1.png", "/judge-assets/funny-food-ramsay-2.png", foodFunnyRamsayOne, foodFunnyRamsayTwo],
  "food-cailan": ["/judge-assets/funny-food-cailan-1.png", "/judge-assets/funny-food-cailan-2.png"],
  "food-caokefan": ["/judge-assets/funny-food-caokefan-1.png", "/judge-assets/funny-food-caokefan-2.png"],
  "music-beethoven": ["/judge-assets/funny-music-beethoven-1.png"],
  "music-jay": ["/judge-assets/funny-music-jay-1.png", "/judge-assets/funny-music-jay-2.png"],
  "music-tchaikovsky": ["/judge-assets/funny-music-tchaikovsky-1.png", "/judge-assets/funny-music-tchaikovsky-2.png", "/judge-assets/funny-music-tchaikovsky-3.png"],
  "music-jj": ["/judge-assets/funny-music-jj-1.png", "/judge-assets/funny-music-jj-2.png", "/judge-assets/funny-music-jj-3.png"],
  "music-liuhuan": ["/judge-assets/funny-music-liuhuan-1.png"],
  "fashion-kawakubo": ["/judge-assets/funny-fashion-kawakubo-1.png"],
  "fashion-saint-laurent": ["/judge-assets/funny-fashion-saint-laurent-1.png", "/judge-assets/funny-fashion-saint-laurent-2.png"],
  "fashion-chanel": ["/judge-assets/funny-fashion-chanel-1.png", "/judge-assets/funny-fashion-chanel-2.png"],
  "painting-davinci": ["/judge-assets/funny-painting-davinci-1.png", "/judge-assets/funny-painting-davinci-2.png", paintingFunnyCandidateThree],
  "painting-monet": ["/judge-assets/funny-painting-monet-1.png", paintingFunnyCandidateTwo],
  "painting-picasso": ["/judge-assets/funny-painting-picasso-1.png", "/judge-assets/funny-painting-picasso-2.png", paintingJudgePicasso],
  "painting-vangogh": [paintingJudgeVangogh],
  "photo-mccurry": ["/judge-assets/funny-photo-mccurry-1.png", "/judge-assets/funny-photo-mccurry-2.png", "/judge-assets/funny-photo-mccurry-3.png"],
  "photo-bresson": ["/judge-assets/funny-photo-bresson-1.png"],
  "photo-chenman": ["/judge-assets/funny-photo-chenman-1.png", "/judge-assets/funny-photo-chenman-2.png", "/judge-assets/funny-photo-chenman-3.png"],
  "photo-maier": ["/judge-assets/funny-photo-maier-1.png"],
};

function pickRandomAsset(assets: string[]) {
  return assets[Math.floor(Math.random() * assets.length)];
}

function getFoodKind(fileName: string | null) {
  const name = (fileName || "").toLowerCase();
  if (/pizza|披萨|pisa/.test(name)) return "披萨";
  if (/noodle|ramen|面|粉|米线/.test(name)) return "面食";
  if (/rice|饭|炒饭|盖饭/.test(name)) return "米饭";
  if (/cake|甜品|dessert|蛋糕|饼干/.test(name)) return "甜品";
  if (/burger|汉堡|sandwich|三明治/.test(name)) return "汉堡";
  if (/hotpot|火锅|串|烧烤|bbq/.test(name)) return "重口味料理";
  if (/salad|沙拉|蔬菜|vegetable/.test(name)) return "沙拉";
  if (/soup|汤|粥/.test(name)) return "汤粥";
  return "神秘料理";
}

function inferFoodAnalysis(fileName: string | null): FoodAnalysis {
  const kind = getFoodKind(fileName);
  return {
    cues: kind === "神秘料理" ? "画面信息不足，只能从视觉气质和摆盘状态开喷" : `用户上传内容疑似${kind}`,
    kind,
    source: "local",
  };
}

function inferDomainAnalysis(domain: Domain, fileName: string | null): FoodAnalysis {
  if (domain === "food") return inferFoodAnalysis(fileName);
  const names: Record<Domain, string> = {
    fashion: "穿搭作品",
    food: "美食作品",
    music: "音乐作品",
    painting: "绘画设计",
    photo: "摄影作品",
    writing: "文字作品",
  };
  const rawName = fileName ? fileName.replace(/\.[^.]+$/, "").slice(0, 12) : names[domain];
  return {
    cues: `${rawName || names[domain]}已上传`,
    kind: names[domain],
    source: "local",
  };
}

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function analyzeFoodWithApi(file: File): Promise<FoodAnalysis> {
  const fallback = inferFoodAnalysis(file.name);
  const env = import.meta.env as Record<string, string | undefined>;
  const apiKey = env.VITE_OPENAI_API_KEY;
  if (!apiKey) return fallback;

  try {
    const imageUrl = await fileToDataUrl(file);
    const response = await fetch("https://api.openai.com/v1/responses", {
      body: JSON.stringify({
        input: [
          {
            content: [
              {
                text:
                  '分析这张用户上传的美食作品图片。只输出 JSON，格式为 {"kind":"不超过8字的食物或作品种类","cues":"不超过14字的画面特征"}。不要输出其他文字。',
                type: "input_text",
              },
              { image_url: imageUrl, type: "input_image" },
            ],
            role: "user",
          },
        ],
        model: env.VITE_OPENAI_MODEL || "gpt-4o-mini",
      }),
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    if (!response.ok) return fallback;
    const data = await response.json();
    const text = String(data.output_text || data.output?.[0]?.content?.[0]?.text || "");
    const parsed = JSON.parse(text.replace(/^```json|```$/g, "").trim()) as Partial<FoodAnalysis>;
    return {
      cues: parsed.cues || fallback.cues,
      kind: parsed.kind || fallback.kind,
      source: "api",
    };
  } catch {
    return fallback;
  }
}

function pickCritiqueLine(judge: Judge, analysis: FoodAnalysis, domain: Domain = "food") {
  const foodKind = analysis.kind;
  const emojiLines = ["😂", "🤡", "😵‍💫", "💀", "🥚", "🔪"];
  if (domain === "writing") {
    const writingLines: Record<string, string[]> = {
      "writing-hemingway": ["短一点，再短一点，别让句子喘不上气。", "这句有海，但船还没造好。", "少讲道理，多给一拳。"],
      "writing-luxun": ["我向来不惮以最坏的逻辑揣测此句。", "横竖读来，只看见两个字：重写。", "这句话很热闹，思想却在旁观。"],
      "writing-shakespeare": ["这句若是舞台，观众已经退场。", "词藻戴冠，灵魂却没登基。", "生存还是重写，这是问题。"],
      "writing-tolstoy": ["所有好句各有光，坏句都一样慌。", "它想写史诗，却先迷路在逗号里。", "人物还没站稳，情绪先跪了。"],
    };
    const pool = [...(writingLines[judge.id] || []), ...emojiLines];
    return pool[Math.floor(Math.random() * pool.length)];
  }
  if (domain !== "food") {
    const domainLines: Record<Domain, string[]> = {
      fashion: ["这套穿搭很努力，但镜子想报警。", "层次有了，方向迷路了。", "像赶时间，也像赶潮流没赶上。"],
      food: [],
      music: ["节奏在上班，灵魂在请假。", "音色很勇敢，耳朵很无辜。", "这段旋律像刚睡醒还没刷牙。"],
      painting: ["构图有野心，画面在撤退。", "线条很真诚，审美还在路上。", "它像作品，也像事故现场草稿。"],
      photo: ["光线很努力，主体很迷茫。", "构图像抓拍，情绪像误拍。", "这张照片先别发，先开会。"],
      writing: ["文字很满，灵魂有点缺勤。", "句子跑得快，意思没跟上。", "它像开头，也像道歉信。"],
    };
    const judgeLines = foodCritiqueLines[judge.id] || ["我需要重新组织一下尖锐措辞。"];
    const cueLine = analysis.source === "api" ? [`${analysis.cues}很明显，评委沉默了。`] : [];
    const pool = [...cueLine, ...domainLines[domain], ...judgeLines, ...emojiLines];
    return pool[Math.floor(Math.random() * pool.length)];
  }
  const contextualLines: Record<string, string[]> = {
    披萨: ["芝士在求救，饼底在摆烂。", "这披萨像被赶出意大利。", "一口下去，烤箱想辞职。"],
    面食: ["面条缠住了，但味道逃了。", "汤底很努力，灵魂缺席。", "这碗面像深夜赶工。"],
    米饭: ["米粒各过各的，毫无团队。", "这饭有野心，锅没跟上。", "粒粒分明，水尬也分明。"],
    甜品: ["甜得很用力，快乐没到账。", "奶油在表演，蛋糕在沉默。", "它像甜品界的迟到作业。"],
    汉堡: ["面包夹住了一个误会。", "肉饼在现场迷路。", "这汉堡咬一口就开会。"],
    重口味料理: ["香味很凶，逻辑很散。", "它不是重口，是重拳出击。", "味道像冲锋，收尾像撤退。"],
    沙拉: ["叶子很健康，灵魂很西。", "这沙拉像被迫营业。", "清爽是有了，快乐没了。"],
    汤粥: ["它很温柔，也很没主见。", "汤在冒泡，味道在请假。", "这一碗像安慰奖。"],
    神秘料理: ["我看不懂，但我大受震撼。", "它很有态度，方向另说。", "这作品先别端，先开会。"],
  };
  const judgeLines = foodCritiqueLines[judge.id] || ["我需要重新组织一下尖锐措辞。"];
  const apiLines =
    analysis.source === "api"
      ? [`${foodKind}很努力，${analysis.cues}先扣分。`, `看得出是${foodKind}，但${analysis.cues}太抢戏。`, `${analysis.cues}，评委沉默了。`]
      : [];
  const pool = [...apiLines, ...(contextualLines[foodKind] || contextualLines.神秘料理), ...judgeLines, ...emojiLines];
  return pool[Math.floor(Math.random() * pool.length)];
}

function sanitizeGeneratedText(text: string, purpose: "critique" | "magic") {
  const clean = text
    .replace(/^["“”'`]+|["“”'`]+$/g, "")
    .replace(/\s+/g, "")
    .trim();
  if (!clean) return "";
  if (isEmojiOnly(clean)) return [...clean][0] || "";
  return clean.slice(0, purpose === "magic" ? 58 : 32);
}

async function requestDeepSeekText({
  analysis,
  domain,
  judge,
  purpose,
  writingText,
}: {
  analysis: FoodAnalysis;
  domain: Domain;
  judge: Judge | null;
  purpose: "critique" | "magic";
  writingText?: string;
}) {
  try {
    const response = await fetch("/api/deepseek-critique", {
      body: JSON.stringify({
        analysis,
        domain,
        judge: judge ? { id: judge.id, name: judge.name } : null,
        purpose,
        writingText: writingText?.slice(0, 220) || "",
      }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });
    if (!response.ok) return "";
    const data = (await response.json()) as { text?: string };
    return sanitizeGeneratedText(String(data.text || ""), purpose);
  } catch {
    return "";
  }
}

function pickProjectile(): CritiqueBubble["projectile"] {
  const projectiles: CritiqueBubble["projectile"][] = ["bomb", "egg", "knife"];
  return projectiles[Math.floor(Math.random() * projectiles.length)];
}

const escapeRoasts = [
  "评委刚热身，你就撤退？作品都替你脸红。",
  "现在跑也行，锅会替你留下来受审。",
  "你可以逃，但证据已经递交给锐评法庭。",
  "跑慢了，评委连你的背影都要锐评两句。",
  "确认逃跑？这份作品会被登记为未遂审美事件。",
];

function pickEscapeRoast() {
  return escapeRoasts[Math.floor(Math.random() * escapeRoasts.length)];
}

function buildMagicAdvice(judge: Judge | null, foodKind: string, domain: Domain = "food") {
  const opener = judge?.id === "food-ramsay" ? "醒醒！" : judge?.id === "food-bourdain" ? "先别端走。" : "听我一句。";
  if (domain !== "food") {
    const domainAdvice: Record<Domain, string> = {
      fashion: "把主次先分清，颜色少吵架，配饰别像临时来救场。",
      food: "",
      music: "先把节奏拧紧，再让旋律说人话，别让耳朵替你加班。",
      painting: "删掉一半犹豫，留下三处狠线条，让画面先站稳再发疯。",
      photo: "主体往前推，光线别躲，构图少摆烂，情绪要敢露面。",
      writing: "砍掉空话，留下最狠的一句，再让每段都承担一个任务。",
    };
    return `${opener}\n${domainAdvice[domain]}`;
  }
  const advice: Record<string, string> = {
    披萨: "饼底烤到有脾气，芝士少演内心戏，配料别像临时拼桌。",
    面食: "汤底先立人格，面条别泡到失忆，最后加一点能救场的香气。",
    米饭: "米粒先各归各位，油别开年会，配菜要像来帮忙不是来凑数。",
    甜品: "甜度撤退三步，奶油停止表演，口感加一点脆的让它醒醒。",
    汉堡: "面包别塌，肉饼别装深沉，酱料从洪水改成点题。",
    重口味料理: "香料别群殴，辣味别抢麦，给主食材留一条活路。",
    沙拉: "叶子可以健康，但别无聊；酱汁要负责，不要只负责湿。",
    汤粥: "汤要有骨气，粥要有层次，别像温水写检讨。",
    神秘料理: "先确认它到底想成为谁，再决定要不要继续加调料。",
  };
  return `${opener}\n${advice[foodKind] || advice.神秘料理}`;
}

function formatCritiqueText(text: string) {
  if (isEmojiOnly(text)) return [...text.trim()][0] || "";
  const clean = text.trim().slice(0, 32);
  const lines: string[] = [];
  let current = "";
  [...clean].forEach((char) => {
    const charWidth = /[A-Za-z0-9 .,!?]/.test(char) ? 0.56 : 1;
    const currentWidth = [...current].reduce((sum, item) => sum + (/[A-Za-z0-9 .,!?]/.test(item) ? 0.56 : 1), 0);
    if (current && currentWidth + charWidth > 8.6 && lines.length < 2) {
      lines.push(current);
      current = char;
    } else {
      current += char;
    }
  });
  if (current) lines.push(current);
  return lines.slice(0, 3).join("\n");
}

function isEmojiOnly(text: string) {
  const clean = text.trim();
  return clean.length > 0 && /^[\p{Emoji_Presentation}\p{Extended_Pictographic}\uFE0F\u200D]+$/u.test(clean);
}

let critiqueAudioContext: AudioContext | null = null;

function getCritiqueAudioContext() {
  if (typeof window === "undefined") return;
  const audioWindow = window as typeof window & { webkitAudioContext?: typeof AudioContext };
  const AudioContextClass = audioWindow.AudioContext || audioWindow.webkitAudioContext;
  if (!AudioContextClass) return;
  critiqueAudioContext ||= new AudioContextClass();
  if (critiqueAudioContext.state === "suspended") {
    void critiqueAudioContext.resume();
  }
  return critiqueAudioContext;
}

function primeCritiqueVoice() {
  const context = getCritiqueAudioContext();
  if (!context) return;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = "square";
  oscillator.frequency.value = 760;
  gain.gain.setValueAtTime(0.0001, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.018, context.currentTime + 0.004);
  gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.024);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + 0.026);
}

function playCritiqueTick(step: number, judgeId: string) {
  const context = getCritiqueAudioContext();
  if (!context) return;
  const oscillator = context.createOscillator();
  const formant = context.createOscillator();
  const gain = context.createGain();
  const formantGain = context.createGain();
  const voice =
    judgeId === "food-ramsay"
      ? { base: 210, spread: 92, type: "sawtooth" as OscillatorType, volume: 0.105, formant: 92 }
      : judgeId === "food-bourdain"
      ? { base: 320, spread: 68, type: "triangle" as OscillatorType, volume: 0.075, formant: 54 }
      : { base: 720, spread: 145, type: "square" as OscillatorType, volume: 0.082, formant: 210 };
  const jitter = (step % 5) * voice.spread;
  oscillator.type = voice.type;
  oscillator.frequency.value = voice.base + jitter + (step % 2) * voice.spread * 0.72;
  formant.type = step % 2 === 0 ? "triangle" : "square";
  formant.frequency.value = voice.base + voice.formant + ((step * 37) % 160);
  gain.gain.setValueAtTime(0.0001, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(voice.volume, context.currentTime + 0.004);
  gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.046);
  formantGain.gain.setValueAtTime(0.0001, context.currentTime);
  formantGain.gain.exponentialRampToValueAtTime(voice.volume * 0.34, context.currentTime + 0.004);
  formantGain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.04);
  oscillator.connect(gain);
  formant.connect(formantGain);
  gain.connect(context.destination);
  formantGain.connect(context.destination);
  oscillator.start();
  formant.start();
  oscillator.stop(context.currentTime + 0.05);
  formant.stop(context.currentTime + 0.045);
}

function playBombPop() {
  const context = getCritiqueAudioContext();
  if (!context) return;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = "sawtooth";
  oscillator.frequency.setValueAtTime(120, context.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(42, context.currentTime + 0.18);
  gain.gain.setValueAtTime(0.0001, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.06, context.currentTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.2);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + 0.22);
}

function playImpact(kind: CritiqueBubble["projectile"]) {
  const context = getCritiqueAudioContext();
  if (!context) return;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const now = context.currentTime;
  const preset =
    kind === "egg"
      ? { from: 260, to: 92, type: "triangle" as OscillatorType, volume: 0.07, length: 0.18 }
      : kind === "knife"
      ? { from: 980, to: 1380, type: "sawtooth" as OscillatorType, volume: 0.045, length: 0.09 }
      : { from: 120, to: 42, type: "sawtooth" as OscillatorType, volume: 0.06, length: 0.2 };
  oscillator.type = preset.type;
  oscillator.frequency.setValueAtTime(preset.from, now);
  oscillator.frequency.exponentialRampToValueAtTime(preset.to, now + preset.length);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(preset.volume, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + preset.length);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(now);
  oscillator.stop(now + preset.length + 0.02);
}

function playUiBlip(kind: "download" | "face" | "magic" | "shuffle" | "upload" | "whoosh") {
  const context = getCritiqueAudioContext();
  if (!context) return;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const now = context.currentTime;
  const presets = {
    download: { from: 520, to: 760, type: "triangle" as OscillatorType, volume: 0.055, length: 0.11 },
    face: { from: 310, to: 930, type: "square" as OscillatorType, volume: 0.035, length: 0.08 },
    magic: { from: 260, to: 880, type: "sawtooth" as OscillatorType, volume: 0.05, length: 0.16 },
    shuffle: { from: 740, to: 390, type: "square" as OscillatorType, volume: 0.045, length: 0.09 },
    upload: { from: 430, to: 620, type: "triangle" as OscillatorType, volume: 0.048, length: 0.12 },
    whoosh: { from: 680, to: 280, type: "sine" as OscillatorType, volume: 0.04, length: 0.14 },
  };
  const preset = presets[kind];
  oscillator.type = preset.type;
  oscillator.frequency.setValueAtTime(preset.from, now);
  oscillator.frequency.exponentialRampToValueAtTime(preset.to, now + preset.length);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(preset.volume, now + 0.006);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + preset.length);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(now);
  oscillator.stop(now + preset.length + 0.02);
}

function playMagicRemix(seedText: string) {
  const context = getCritiqueAudioContext();
  if (!context) return;
  void context.resume?.();
  const now = context.currentTime + 0.03;
  const seed = [...seedText].reduce((sum, char) => sum + char.charCodeAt(0), 0) || 777;
  const notes = Array.from({ length: 18 }, (_, index) => {
    const baseNotes = [196, 233, 277, 330, 392, 466, 554, 659];
    const note = baseNotes[(seed + index * 3) % baseNotes.length];
    return note * (1 + ((seed + index * 17) % 9) / 26);
  });
  const master = context.createGain();
  master.gain.setValueAtTime(0.0001, now);
  master.gain.exponentialRampToValueAtTime(0.22, now + 0.08);
  master.gain.exponentialRampToValueAtTime(0.0001, now + 5.05);
  master.connect(context.destination);

  notes.forEach((frequency, index) => {
    const start = now + index * 0.19;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = index % 3 === 0 ? "sawtooth" : index % 3 === 1 ? "square" : "triangle";
    oscillator.frequency.setValueAtTime(frequency, start);
    oscillator.frequency.exponentialRampToValueAtTime(frequency * (index % 2 === 0 ? 1.42 : 0.72), start + 0.18);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.24, start + 0.018);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.21);
    oscillator.connect(gain);
    gain.connect(master);
    oscillator.start(start);
    oscillator.stop(start + 0.25);
  });

  for (let index = 0; index < 24; index += 1) {
    const start = now + 0.06 + index * 0.145;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(920 + ((seed + index * 53) % 420), start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.095, start + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.055);
    oscillator.connect(gain);
    gain.connect(master);
    oscillator.start(start);
    oscillator.stop(start + 0.065);
  }
}

function drawFunnyFaceForJudge(judge: Judge, nonce: number): FunnyFaceState | null {
  const funnyPool = judge.funnySrcs && judge.funnySrcs.length > 0 ? judge.funnySrcs : writingFunnyFaceAssets[judge.id] || foodFunnyFaceAssets[judge.id] || [];
  return { nonce, src: funnyPool.length > 0 ? pickRandomAsset(funnyPool) : judge.src };
}

function drawFunnyFacesForJudges(judges: Judge[], nonceBase: number) {
  return judges.reduce<Record<number, FunnyFaceState>>((faces, judge, index) => {
    const funnyFace = drawFunnyFaceForJudge(judge, nonceBase + index);
    if (funnyFace) faces[index] = funnyFace;
    return faces;
  }, {});
}

function drawFunnyRevealOrder(judges: Judge[]) {
  return judges.map((_, index) => index).sort(() => Math.random() - 0.5);
}

function countFunnyRevealableJudges(judges: Judge[]) {
  return judges.length;
}

const flows: DomainFlow[] = [
  {
    domain: "food",
    title: "On-site Culinary Critique",
    uploadLabel: "上传美食",
    nodeIds: ["138:2707", "138:2674", "138:2745", "138:2774"],
    mainSrc: waitFoodMain,
    mainClassName: "left-[41px] top-[314px] h-[260px] w-[344.5px]",
    homeEntry: {
      domain: "food",
      label: "美食锐评",
      src: foodIcon,
      className: "left-[42.54px] top-[388.17px] h-[76px] w-[100.7px]",
      imageClassName: "inset-[-2.73%_-2.09%_-3.12%_-1.42%]",
    },
  },
  {
    domain: "writing",
    title: "Literary Review Scene",
    uploadLabel: "开始写作",
    nodeIds: ["138:1968", "138:2055", "138:2089", "138:2120", "138:2151"],
    mainSrc: waitWritingMain,
    mainClassName: "left-[49px] top-[303px] h-[269.685px] w-[331px]",
    homeEntry: {
      domain: "writing",
      label: "文学锐评",
      src: writingIcon,
      className: "left-[173.5px] top-[385px] h-[76.19px] w-[89.5px]",
      imageClassName: "inset-[0_-2.74%_-3.24%_-2.79%]",
    },
  },
  {
    domain: "fashion",
    title: "Dress up review on-site",
    uploadLabel: "上传穿搭照片",
    nodeIds: ["138:6445", "138:3709", "139:6771", "139:6827"],
    mainSrc: waitFashionMain,
    mainClassName: "left-[39px] top-[321px] h-[252.31px] w-[349.895px]",
    homeEntry: {
      domain: "fashion",
      label: "时尚穿搭锐评",
      src: fashionIcon,
      className: "left-[281px] top-[388.17px] h-[72.45px] w-[112.87px]",
      imageClassName: "inset-[-3.59%_-2.72%_-2.94%_-3.09%]",
    },
  },
  {
    domain: "painting",
    title: "Painting and Design Sharp Review Site",
    uploadLabel: "上传作品",
    nodeIds: ["138:6525", "138:3734", "139:7050", "139:7097"],
    mainSrc: waitPaintingMain,
    mainClassName: "left-[40.5px] top-[297px] h-[279px] w-[349px]",
    homeEntry: {
      domain: "painting",
      label: "绘画设计锐评",
      src: paintingIcon,
      className: "left-[285px] top-[486.18px] h-[77.99px] w-[110.5px]",
      imageClassName: "inset-[-1.98%_-0.28%_-3.02%_-1.77%]",
    },
  },
  {
    domain: "photo",
    title: "Photography review on-site",
    uploadLabel: "上传作品",
    nodeIds: ["138:6612", "138:3757"],
    mainSrc: waitPaintingMain,
    mainClassName: "left-[40.5px] top-[297px] h-[279px] w-[349px]",
    homeEntry: {
      domain: "photo",
      label: "摄影锐评",
      src: photoIcon,
      className: "left-[175px] top-[488.17px] h-[74.96px] w-[88px]",
      imageClassName: "inset-[-3.17%_-2.48%_-3.28%_-2.84%]",
    },
  },
  {
    domain: "music",
    title: "Music Review Live",
    uploadLabel: "上传作品",
    nodeIds: ["138:6689", "138:3780"],
    mainSrc: waitMusicMain,
    mainClassName: "left-[49.5px] top-[344.5px] h-[228px] w-[331px]",
    homeEntry: {
      domain: "music",
      label: "音乐锐评",
      src: musicIcon,
      className: "left-[41px] top-[490.17px] h-[73px] w-[105px]",
      imageClassName: "inset-[-3.43%_-2.24%_-3.42%_-1.25%]",
    },
  },
];

const flowByDomain = new Map(flows.map((flow) => [flow.domain, flow]));
const homeEntries = flows.map((flow) => flow.homeEntry);

function routeFromHash(): Route {
  const value = window.location.hash.replace("#", "");
  if (!value || value === "home") return { domain: "home", step: 0 };
  const [domainValue, stepValue] = value.split("/");
  const flow = flowByDomain.get(domainValue as Domain);
  if (!flow) return { domain: "home", step: 0 };
  const rawStep = Number.parseInt(stepValue || "01", 10);
  const maxStep = Math.max(4, flow.nodeIds.length);
  const step = Number.isFinite(rawStep) ? Math.min(Math.max(rawStep, 1), maxStep) : 1;
  return { domain: flow.domain, step };
}

function hrefFor(domain: Domain, step: number) {
  return `#${domain}/${String(step).padStart(2, "0")}`;
}

function drawJudges(domain: Domain = "food") {
  const pool = judgePoolsByDomain[domain] || foodJudgePool;
  return [...pool].sort(() => Math.random() - 0.5).slice(0, 3);
}

function drawRevealOrder(count = 3) {
  return Array.from({ length: count }, (_, index) => index).sort(() => Math.random() - 0.5);
}

function StatusBar() {
  return (
    <div className="absolute left-0 top-0 z-20 h-[51px] w-full bg-white">
      <div className="absolute left-[23px] top-1/2 -translate-y-[calc(50%-0.5px)] font-['Urbanist'] text-[16px] font-semibold leading-[1.4] tracking-[0.2px] text-black">
        9:41
      </div>
      <div className="absolute right-[23px] top-1/2 flex -translate-y-1/2 items-center gap-[5px] text-black">
        <div className="flex h-[12px] w-[18px] items-end gap-[2px]">
          <span className="h-[4px] w-[3px] bg-black" />
          <span className="h-[6px] w-[3px] bg-black" />
          <span className="h-[9px] w-[3px] bg-black" />
          <span className="h-[12px] w-[3px] bg-black" />
        </div>
        <svg aria-hidden="true" className="h-[13px] w-[17px]" viewBox="0 0 18 14">
          <path
            d="M1.5 5.4C5.7 1.8 12.3 1.8 16.5 5.4M4.5 8.3C7 6.2 11 6.2 13.5 8.3M7.3 11.1C8.3 10.3 9.7 10.3 10.7 11.1"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
        </svg>
        <div className="relative h-[13px] w-[27px] rounded-[3px] border-[1.8px] border-black">
          <span className="absolute -right-[3.5px] top-[3.3px] h-[5.5px] w-[2px] rounded-r-sm bg-black" />
          <span className="absolute left-[2.5px] top-[2.5px] h-[6px] w-[19px] rounded-[1.5px] bg-black" />
        </div>
      </div>
    </div>
  );
}

function PhoneFrame({ children, nodeId, label }: { children: ReactNode; nodeId: string; label: string }) {
  return (
    <div className="phone-mockup-shell">
      <span aria-hidden="true" className="phone-mockup-button phone-mockup-button-left" />
      <span aria-hidden="true" className="phone-mockup-button phone-mockup-button-right" />
      <div aria-hidden="true" className="phone-mockup-island">
        <span />
      </div>
      <section
        aria-label={label}
        className="phone-mockup-screen relative h-[932px] w-[430px] origin-center overflow-hidden bg-white"
        data-node-id={nodeId}
        data-name="01"
      >
        {children}
      </section>
    </div>
  );
}

function EntryButton({
  domain,
  isSelected,
  label,
  onSelect,
  src,
  className,
  imageClassName,
}: HomeEntry & { isSelected: boolean; onSelect: (domain: Domain) => void }) {
  const shortLabels: Record<Domain, string> = {
    fashion: "穿搭",
    food: "美食",
    music: "音乐",
    painting: "画作",
    photo: "照片",
    writing: "文学",
  };

  return (
    <button
      aria-label={label}
      aria-pressed={isSelected}
      className={`home-entry-hit absolute block bg-transparent p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/70 ${isSelected ? "is-selected" : ""} ${className}`}
      data-domain={domain}
      onClick={() => onSelect(domain)}
      type="button"
    >
      <div className={`absolute ${imageClassName}`}>
        <img alt="" className="block size-full max-w-none select-none" draggable={false} src={src} />
      </div>
      <span className="home-entry-label">{shortLabels[domain]}</span>
    </button>
  );
}

function HomeScreen() {
  const [selectedDomain, setSelectedDomain] = useState<Domain>("food");
  const selectedFlow = flowByDomain.get(selectedDomain) || flows[0];

  return (
    <PhoneFrame label="锐评家首页" nodeId="56:608">
      <StatusBar />
      <h1 className="absolute left-1/2 top-[94px] z-10 flex h-[87px] w-[397px] -translate-x-1/2 items-center justify-center text-center font-['Covered_By_Your_Grace'] text-[90px] font-normal leading-[0.9] tracking-normal text-black">
        RUIPINGJIA
      </h1>
      <h2 className="hidden">锐评家</h2>
      <p className="absolute left-1/2 top-[220px] z-20 w-[264px] -translate-x-1/2 text-center font-['Didact_Gothic','Didact_Gothic','Varela_Round',sans-serif] text-[20px] font-normal leading-[1.3] text-black">
        Please select a field, upload your work, and wait for it to be pranked and criticized by celebrity judges
      </p>
      <div aria-hidden="true" className="hidden">
        <span className="absolute left-[47px] top-[318px] h-[4px] w-[246px] rotate-[-4deg] bg-black" />
        <span className="absolute left-[58px] top-[744px] h-[4px] w-[270px] rotate-[4deg] bg-black" />
        <p className="absolute left-[25px] top-[804px] w-[200px] font-['Varela_Round'] text-[8px] font-bold leading-[1.08]">
          Choose a field. Upload a work. Invite unreasonable but weirdly precise comments.
        </p>
        <p className="absolute right-[23px] top-[790px] w-[115px] text-right font-['Arial_Black','Arial',sans-serif] text-[18px] font-black leading-[0.82]">
          SHARP
          <br />
          REVIEW
          <br />
          LIVE
        </p>
        <div className="absolute left-[28px] top-[656px] flex gap-[4px]">
          {[38, 20, 50, 29, 43, 16].map((height, index) => (
            <span className="block w-[4px] bg-black" key={`${height}-${index}`} style={{ height }} />
          ))}
        </div>
      </div>
      <nav aria-label="锐评类别入口" className="absolute inset-0 z-10">
        {homeEntries.map((entry) => (
          <EntryButton isSelected={entry.domain === selectedDomain} key={entry.domain} onSelect={setSelectedDomain} {...entry} />
        ))}
      </nav>
      <p className="absolute left-1/2 top-[705px] z-20 w-[279px] -translate-x-1/2 text-center font-['Didact_Gothic','Varela_Round',sans-serif] text-[20px] leading-[1.25] text-black">
        Are you ready to be critically evaluated?
      </p>
      <a
        aria-label={`进入${selectedFlow.title}`}
        className="absolute left-[108px] top-[779px] z-30 flex h-[44px] w-[214px] items-center justify-center rounded-[25px] bg-black text-center font-['Imprima','Federo',sans-serif] text-[20px] leading-[1.5] text-white"
        href={hrefFor(selectedDomain, 1)}
      >
        GO!
      </a>
    </PhoneFrame>
  );
}

function DisclaimerModal({ onAccept }: { onAccept: () => void }) {
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/28 px-[24px]">
      <div className="w-full max-w-[336px] rounded-[8px] border-2 border-black bg-white px-[24px] pb-[22px] pt-[24px] text-center shadow-[6px_7px_0_rgba(0,0,0,0.18)]">
        <h2 className="font-['Varela_Round'] text-[20px] leading-[1.35] text-black">整蛊免责声明</h2>
        <p className="mt-[14px] font-['Varela_Round'] text-[13px] leading-[1.65] text-black">
          本应用是荒诞搞笑向锐评小游戏，评委发言均为娱乐生成，不代表真实人物观点。请勿把锐评结果当成专业建议，也请不要用来攻击任何人。
        </p>
        <button
          className="mt-[20px] h-[44px] w-[214px] rounded-[25px] bg-black text-center font-['Imprima','Federo',sans-serif] text-[17px] leading-[1.5] text-white"
          onClick={onAccept}
          type="button"
        >
          已知晓
        </button>
      </div>
    </div>
  );
}

function EscapeLink({ onEscape }: { onEscape?: () => void }) {
  if (onEscape) {
    return (
      <button aria-label="返回首页" className="escape-link-shadow absolute left-[23px] top-[60px] z-30 block h-[27.5px] w-[83px] bg-transparent p-0" onClick={onEscape} type="button">
        <img alt="" className="absolute left-0 top-0 h-[27.5px] w-[23px] max-w-none" src={escapeRunner} />
        <span className="absolute left-[23px] top-[1.5px] flex h-[18px] w-[40px] items-center justify-center text-center font-['Varela_Round'] text-[15px] font-normal leading-[1.5] text-black">
          逃跑
        </span>
      </button>
    );
  }

  return (
    <a aria-label="返回首页" className="escape-link-shadow absolute left-[23px] top-[60px] z-30 block h-[27.5px] w-[83px]" href="#home">
      <img alt="" className="absolute left-0 top-0 h-[27.5px] w-[23px] max-w-none" src={escapeRunner} />
      <span className="absolute left-[23px] top-[1.5px] flex h-[18px] w-[40px] items-center justify-center text-center font-['Varela_Round'] text-[15px] font-normal leading-[1.5] text-black">
        逃跑
      </span>
    </a>
  );
}

function Title({ children }: { children: string }) {
  return (
    <h1 className="absolute left-1/2 top-[98px] z-10 flex h-[163px] w-[397px] -translate-x-1/2 items-center justify-center text-center font-['Covered_By_Your_Grace'] text-[50px] font-normal leading-[0.9] tracking-normal text-black">
      {children}
    </h1>
  );
}

function MainSketch({ flow, compact = false, onClick }: { flow: DomainFlow; compact?: boolean; onClick?: () => void }) {
  const className = compact
    ? flow.mainClassName
    : flow.mainClassName;

  if (onClick) {
    return (
      <button aria-label={flow.uploadLabel} className={`absolute cursor-pointer p-0 ${className}`} onClick={onClick} type="button">
        <img alt="" className="size-full max-w-none object-contain" src={flow.mainSrc} />
      </button>
    );
  }

  return <img alt="" className={`absolute max-w-none object-contain ${className}`} src={flow.mainSrc} />;
}

function getJudgeSlots(count: number) {
  return [
    { x: 16, y: 631, w: 126, h: 161, labelTop: 165 },
    { x: 152, y: 635, w: 126, h: 157, labelTop: 161 },
    { x: 288, y: 632, w: 126, h: 160, labelTop: 164 },
  ];
}

function getJudgeStickerSlots(judges: Judge[]) {
  return [
    { x: 16, y: 631, w: 126, h: 161, faceLeft: 0, faceTop: 0, faceW: 126, faceH: 161, labelTop: 165 },
    { x: 152, y: 635, w: 126, h: 157, faceLeft: 0, faceTop: 0, faceW: 126, faceH: 157, labelTop: 161 },
    { x: 288, y: 632, w: 126, h: 160, faceLeft: 0, faceTop: 0, faceW: 126, faceH: 160, labelTop: 164 },
  ];
}

const writingJudgeSlots = [
  { x: 16, y: 631, imageW: 126, imageH: 161, labelTop: 165, containerH: 161 },
  { x: 152, y: 635, imageW: 126, imageH: 157, labelTop: 161, containerH: 157 },
  { x: 288, y: 632, imageW: 126, imageH: 160, labelTop: 164, containerH: 160 },
];

function FoodJudgeRow({
  animated = false,
  judges,
  revealOrder = [0, 1, 2],
  thinking = false,
  withLabels = false,
}: {
  animated?: boolean;
  judges: Judge[];
  revealOrder?: number[];
  thinking?: boolean;
  withLabels?: boolean;
}) {
  const slots = getJudgeSlots(judges.length);

  return (
    <>
      {slots.map((slot, index) => {
        const judge = judges[index] || foodJudgePool[index];
        const revealIndex = Math.max(0, revealOrder.indexOf(index));
        return (
          <div
            key={`${judge.id}-${index}`}
            className={`absolute ${animated ? "judge-pop-in opacity-0" : ""}`}
            style={{
              left: slot.x,
              top: slot.y,
              width: slot.w,
              height: slot.h,
              ["--judge-delay" as string]: `${200 + revealIndex * 500}ms`,
              ["--judge-rotate" as string]: `${index === 1 ? -1.5 : index === 2 ? 1.8 : 1.2}deg`,
            }}
          >
            <img alt="" className="judge-avatar-shadow absolute inset-0 size-full max-w-none object-contain" src={judge.src} />
            {thinking ? <ThinkingBadge /> : null}
            {withLabels && !judge.src.includes("-full.png") ? (
              <p className="absolute left-1/2 h-[22px] w-[136px] -translate-x-1/2 text-center font-['Varela_Round'] text-[10px] leading-[1.5] text-black" style={{ top: slot.labelTop }}>
                {judge.name}
              </p>
            ) : null}
          </div>
        );
      })}
    </>
  );
}

function WritingJudgeRow({
  animated = false,
  judges,
  revealOrder = [0, 1, 2],
  thinking = false,
  withLabels = false,
}: {
  animated?: boolean;
  judges: Judge[];
  revealOrder?: number[];
  thinking?: boolean;
  withLabels?: boolean;
}) {
  return (
    <>
      {writingJudgeSlots.map((slot, index) => {
        const judge = judges[index] || writingJudgePool[index];
        const revealIndex = Math.max(0, revealOrder.indexOf(index));

        return (
          <div
            className={`absolute ${animated ? "judge-pop-in opacity-0" : ""}`}
            key={`${judge.id}-writing-row-${index}`}
            style={{
              height: slot.containerH,
              left: slot.x,
              top: slot.y,
              width: slot.imageW,
              ["--judge-delay" as string]: `${200 + revealIndex * 500}ms`,
              ["--judge-rotate" as string]: `${index === 1 ? -1.5 : index === 2 ? 1.8 : 1.2}deg`,
            }}
          >
            <img
              alt=""
              className="judge-avatar-shadow absolute left-0 top-0 max-w-none object-contain"
              src={judge.src}
              style={{ height: slot.imageH, width: slot.imageW }}
            />
            {thinking ? <ThinkingBadge /> : null}
            {withLabels && !judge.src.includes("-full.png") ? (
              <p className="absolute left-1/2 h-[22px] w-[136px] -translate-x-1/2 text-center font-['Varela_Round'] text-[10px] leading-[1.5] text-black" style={{ top: slot.labelTop }}>
                {judge.name}
              </p>
            ) : null}
          </div>
        );
      })}
    </>
  );
}

function WritingJudgeStickerRow({
  animate = true,
  funnyFaces,
  judges,
  onJudgeClick,
  thinking = false,
}: {
  animate?: boolean;
  funnyFaces: Record<number, FunnyFaceState>;
  judges: Judge[];
  onJudgeClick?: (index: number) => void;
  thinking?: boolean;
}) {
  return (
    <>
      {writingJudgeSlots.map((slot, index) => {
        const judge = judges[index] || writingJudgePool[index];
        const funnyFace = funnyFaces[index];
        const avatarSrc = funnyFace?.src || judge.src;

        return (
          <button
            className={`judge-sticker-button absolute bg-transparent p-0 ${animate && funnyFace ? "sticker-entry-in" : ""} ${onJudgeClick ? "cursor-pointer" : "cursor-default"}`}
            disabled={!onJudgeClick}
            key={`${judge.id}-writing-sticker-${index}`}
            onClick={() => onJudgeClick?.(index)}
            style={{
              height: slot.containerH,
              left: slot.x,
              top: slot.y,
              width: slot.imageW,
              ["--sticker-delay" as string]: `${index * 80}ms`,
            }}
            type="button"
          >
            <img
              alt=""
              className={`judge-avatar-shadow ${animate && funnyFace ? "funny-face-pop" : ""} absolute left-0 top-0 max-w-none object-contain`}
              key={`${index}-${funnyFace?.nonce || "normal"}`}
              src={avatarSrc}
              style={{ height: slot.imageH, width: slot.imageW }}
            />
            {thinking ? <ThinkingBadge /> : null}
            <span className="absolute left-1/2 h-[22px] w-[136px] -translate-x-1/2 text-center font-['Varela_Round'] text-[10px] leading-[1.5] text-black" style={{ top: slot.labelTop }}>
              {judge.name}
            </span>
          </button>
        );
      })}
    </>
  );
}

function FoodJudgeStickerRow({
  animate = true,
  funnyFaces,
  judges,
  onJudgeClick,
  thinking = false,
}: {
  animate?: boolean;
  funnyFaces: Record<number, FunnyFaceState>;
  judges: Judge[];
  onJudgeClick?: (index: number) => void;
  thinking?: boolean;
}) {
  const slots = getJudgeStickerSlots(judges);

  return (
    <>
      {slots.map((slot, index) => {
        const judge = judges[index] || foodJudgePool[index];
        const sticker = foodJudgeButtonAssets[judge.id] || foodJudgeButtonOne;
        const funnyFace = funnyFaces[index];

        if (!funnyFace && onJudgeClick && !foodJudgeButtonAssets[judge.id]) {
          return (
            <button
              className="judge-sticker-button absolute cursor-pointer bg-transparent p-0"
              key={`${judge.id}-plain-clickable-${index}`}
              onClick={() => onJudgeClick?.(index)}
              style={{
                left: slot.x,
                top: slot.y,
                width: slot.w,
                height: slot.h,
              }}
              type="button"
            >
              <img alt="" className="judge-avatar-shadow absolute left-0 top-0 max-w-none object-contain" src={judge.src} style={{ height: slot.faceH, width: slot.faceW }} />
              {thinking ? <ThinkingBadge /> : null}
              <span className="absolute left-1/2 h-[22px] w-[136px] -translate-x-1/2 text-center font-['Varela_Round'] text-[10px] leading-[1.5] text-black" style={{ top: slot.labelTop }}>
                {judge.name}
              </span>
            </button>
          );
        }

        if (!funnyFace && !onJudgeClick) {
          return (
            <div
              className="absolute"
              key={`${judge.id}-waiting-${index}`}
              style={{
                left: slot.x,
                top: slot.y,
                width: slot.w,
                height: slot.h,
              }}
            >
              <img alt="" className="judge-avatar-shadow absolute left-0 top-0 max-w-none object-contain" src={judge.src} style={{ height: slot.faceH, width: slot.faceW }} />
              {thinking ? <ThinkingBadge /> : null}
              <p className="absolute left-1/2 h-[22px] w-[136px] -translate-x-1/2 text-center font-['Varela_Round'] text-[10px] leading-[1.5] text-black" style={{ top: slot.labelTop }}>
                {judge.name}
              </p>
            </div>
          );
        }

        return (
          <button
            className={`judge-sticker-button absolute bg-transparent p-0 ${animate ? "sticker-entry-in" : ""} ${onJudgeClick ? "cursor-pointer" : "cursor-default"}`}
            disabled={!onJudgeClick}
            key={`${judge.id}-sticker-${index}`}
            onClick={() => onJudgeClick?.(index)}
            style={{
              left: slot.x,
              top: slot.y,
              width: slot.w,
              height: slot.h,
              ["--sticker-delay" as string]: `${index * 80}ms`,
            }}
            type="button"
          >
            {funnyFace ? (
              <>
                <img
                  alt=""
                  className={`judge-avatar-shadow ${animate ? "funny-face-pop" : ""} absolute max-w-none object-contain`}
                  key={`${index}-${funnyFace.nonce}`}
                  src={funnyFace.src}
                  style={{ left: slot.faceLeft, top: slot.faceTop, width: slot.faceW, height: slot.faceH }}
                />
                {thinking ? <ThinkingBadge /> : null}
                <span className="absolute left-1/2 h-[22px] w-[136px] -translate-x-1/2 text-center font-['Varela_Round'] text-[10px] leading-[1.5] text-black" style={{ top: slot.labelTop }}>
                  {judge.name}
                </span>
              </>
            ) : (
              <>
                <img alt="" className="judge-avatar-shadow size-full max-w-none object-fill" src={sticker} />
                {thinking ? <ThinkingBadge /> : null}
                <span className="absolute left-1/2 h-[22px] w-[136px] -translate-x-1/2 bg-white/80 text-center font-['Varela_Round'] text-[10px] leading-[1.5] text-black" style={{ top: slot.labelTop }}>
                  {judge.name}
                </span>
              </>
            )}
          </button>
        );
      })}
    </>
  );
}

function ThinkingBadge() {
  const rays = Array.from({ length: 10 }, (_, index) => index);

  return (
    <span aria-label="思考中" className="thinking-badge absolute right-[-6px] top-[-10px] z-30 h-[34px] w-[34px]">
      {rays.map((ray) => (
        <span className="thinking-badge-ray" key={ray} style={{ ["--ray-index" as string]: ray }} />
      ))}
    </span>
  );
}

function CritiqueBubbleActor({
  bubble,
  index,
  path,
  onExplode,
}: {
  bubble: CritiqueBubble;
  index: number;
  path: { startLeft: number; startTop: number; targetLeft: number; targetTop: number };
  onExplode: () => void;
}) {
  const [visibleChars, setVisibleChars] = useState(0);
  const [phase, setPhase] = useState<"typing" | "projectile" | "done">("typing");
  const impactDoneRef = useRef(false);
  const driftX = ((bubble.id % 5) - 2) * 13;
  const driftY = -((Math.floor(bubble.id / 2) % 4) * 10);
  const bubbleAsset = critiqueBubbleAssets[bubble.slot] || foodFrame04BubbleOne;
  const visibleText = formatCritiqueText(bubble.text.slice(0, visibleChars));
  const emojiOnly = isEmojiOnly(bubble.text);

  function finishProjectile() {
    if (impactDoneRef.current) return;
    impactDoneRef.current = true;
    playImpact(bubble.projectile);
    onExplode();
    setPhase("done");
  }

  useEffect(() => {
    if (phase !== "typing") return;
    const timer = window.setInterval(() => {
      setVisibleChars((current) => {
        if (current >= bubble.text.length) return current;
        playCritiqueTick(current, bubble.judgeId);
        return current + 1;
      });
    }, 38);
    return () => window.clearInterval(timer);
  }, [bubble.text, phase]);

  useEffect(() => {
    if (visibleChars < bubble.text.length || phase !== "typing") return;
    const timer = window.setTimeout(() => setPhase("projectile"), 2000);
    return () => window.clearTimeout(timer);
  }, [bubble.text.length, phase, visibleChars]);

  useEffect(() => {
    if (phase !== "projectile") return;
    const timer = window.setTimeout(finishProjectile, 820);
    return () => window.clearTimeout(timer);
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      className="absolute z-20"
      key={`critique-bubble-${bubble.id}`}
      style={{
        left: path.startLeft,
        top: path.startTop,
        ["--bubble-dx" as string]: `${path.targetLeft + driftX - path.startLeft}px`,
        ["--bubble-dy" as string]: `${path.targetTop + driftY - path.startTop}px`,
        ["--bubble-delay" as string]: `${Math.min(index * 18, 120)}ms`,
      }}
    >
      {phase === "typing" ? (
        <div className="critique-type-bubble h-[88px] w-[142px]">
          <img alt="" className="absolute inset-0 h-[88px] w-[142px] max-w-none object-fill" src={bubbleAsset} />
          <span
            className={`absolute left-[16px] top-[12px] flex h-[50px] w-[110px] items-center justify-center whitespace-pre-line text-center font-['Varela_Round'] text-black ${
              emojiOnly ? "text-[31px] leading-none" : "text-[12px] leading-[1.12]"
            }`}
          >
            {visibleText}
          </span>
        </div>
      ) : (
        <div className="critique-projectile-flight" onAnimationEnd={finishProjectile}>
          <CritiqueProjectile kind={bubble.projectile} />
        </div>
      )}
    </div>
  );
}

function CritiqueProjectile({ kind }: { kind: CritiqueBubble["projectile"] }) {
  if (kind === "knife") {
    return (
      <div className="critique-knife">
        <span className="critique-knife-blade" />
        <span className="critique-knife-handle" />
      </div>
    );
  }
  if (kind === "egg") {
    return (
      <div className="critique-egg">
        <span className="critique-egg-shell" />
        <span className="critique-egg-yolk" />
        <span className="critique-egg-white" />
      </div>
    );
  }
  return (
    <div className="critique-bomb">
      <span className="critique-bomb-fuse" />
    </div>
  );
}

function FoodCritiqueBubbles({ bubbles, onExplode }: { bubbles: CritiqueBubble[]; onExplode: () => void }) {
  const paths = [
    { startLeft: 7, startTop: 526, targetLeft: 70, targetTop: 242 },
    { startLeft: 146, startTop: 526, targetLeft: 156, targetTop: 314 },
    { startLeft: 282, startTop: 526, targetLeft: 236, targetTop: 250 },
    { startLeft: 300, startTop: 526, targetLeft: 278, targetTop: 324 },
  ];

  return (
    <>
      {bubbles.map((item, index) => {
        const path = paths[item.slot] || paths[0];
        return <CritiqueBubbleActor bubble={item} index={index} key={`critique-bubble-${item.id}`} onExplode={onExplode} path={path} />;
      })}
    </>
  );
}

function GenericCriticRow({ withLabels = false }: { withLabels?: boolean }) {
  const critics = [
    { src: criticOne, x: 16, y: 630, w: 126, h: 133 },
    { src: criticTwo, x: 152, y: 630, w: 126, h: 133 },
    { src: criticThree, x: 288, y: 631, w: 125, h: 131 },
  ];

  return (
    <>
      {critics.map((critic, index) => (
        <div key={critic.src} className="absolute" style={{ left: critic.x, top: critic.y, width: critic.w, height: critic.h }}>
          <img alt="" className="absolute inset-0 size-full max-w-none object-cover" src={critic.src} />
          {withLabels ? (
            <p className="absolute left-1/2 top-[139px] h-[22px] w-[44px] -translate-x-1/2 text-center font-['Varela_Round'] text-[12px] leading-[1.5] text-black">
              XXXX
            </p>
          ) : null}
        </div>
      ))}
    </>
  );
}

function DisabledPill({ className = "", label }: { className?: string; label: string }) {
  return (
    <div
      aria-disabled="true"
      className={`flex items-center justify-center rounded-[25px] border-2 border-black bg-white text-center font-['Federo'] text-[14px] leading-[1.5] text-black ${className}`}
    >
      {label}
    </div>
  );
}

function EnabledPill({ className = "", label, onClick }: { className?: string; label: string; onClick: () => void }) {
  return (
    <button className={`rounded-[25px] bg-black text-center font-['Federo'] text-[16px] leading-[1.5] text-white ${className}`} onClick={onClick} type="button">
      {label}
    </button>
  );
}

function IconButton({ ariaLabel, className = "", onClick }: { ariaLabel: string; className?: string; onClick?: () => void }) {
  return (
    <button aria-label={ariaLabel} className={`grid place-items-center rounded-[25px] bg-black ${className}`} onClick={onClick} type="button">
      <img alt="" className="h-[18px] w-[18px]" src={nextArrow} />
    </button>
  );
}

function Frame04Actions({ onDownload, onMagic }: { onDownload: () => void; onMagic: () => void }) {
  return (
    <>
      <button aria-label="下载" className="absolute left-[40px] top-[837px] z-40 grid h-[44px] w-[50px] place-items-center rounded-[25px] bg-black" onClick={onDownload} type="button">
        <img alt="" className="h-[16px] w-[16px] max-w-none object-contain" src={frame04LeftIcon} />
      </button>
      <button className="absolute left-[265px] top-[837px] z-40 h-[44px] w-[125px] rounded-[25px] bg-black text-center font-['Federo'] text-[16px] leading-[1.5] text-white" onClick={onMagic} type="button">
        请求魔改
      </button>
    </>
  );
}

function FoodToast({ toast }: { toast: FoodToastState }) {
  if (!toast) return null;
  return (
    <div
      className="food-toast-fade absolute inset-0 z-[60] grid place-items-center bg-white/20 pointer-events-none"
      key={toast.id}
      style={{ ["--food-toast-duration" as string]: `${toast.duration}ms` }}
    >
      <div className="max-w-[268px] rounded-[6px] border border-black/20 bg-white px-[24px] py-[18px] text-center font-['Federo'] text-[15px] leading-[1.45] text-black shadow-[0_5px_18px_rgba(0,0,0,0.08)]">
        {toast.text}
      </div>
    </div>
  );
}

function FoodEditorialDecor({ step }: { step: number }) {
  if (step < 3) return null;
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] text-black">
      <p className="absolute left-[24px] top-[108px] w-[126px] font-['Arial_Black','Arial',sans-serif] text-[13px] font-black leading-[0.92] tracking-[-0.2px]">
        BUSHCRAFT
        <br />
        CRITIQUE
      </p>
      <p className="absolute right-[24px] top-[104px] w-[112px] text-right font-['Varela_Round'] text-[7px] font-bold leading-[1.08]">
        Not Just Survival
        <br />
        But Thriving
        <br />
        On-site Review
      </p>
      <p className="absolute left-[26px] top-[150px] w-[92px] font-['Covered_By_Your_Grace'] text-[21px] leading-[0.9]">
        2026.
        <br />
        judge it.
      </p>
      <p className="absolute right-[27px] top-[520px] w-[95px] rotate-[-7deg] font-['Covered_By_Your_Grace'] text-[19px] leading-[0.88]">
        cruel
        <br />
        but useful
      </p>
      <span className="absolute left-[18px] top-[590px] h-[3px] w-[72px] rotate-[11deg] bg-black" />
      <span className="absolute left-[340px] top-[568px] h-[3px] w-[48px] rotate-[-18deg] bg-black" />
      <span className="absolute left-[362px] top-[548px] h-[3px] w-[30px] rotate-[27deg] bg-black" />
      <span className="absolute left-[61px] top-[512px] h-[84px] w-[3px] rotate-[62deg] bg-black" />
      <span className="absolute left-[333px] top-[132px] h-[42px] w-[2px] rotate-[64deg] bg-black" />
      <span className="absolute left-[337px] top-[151px] h-[42px] w-[2px] rotate-[-61deg] bg-black" />
      <div className="absolute left-[26px] top-[712px] flex gap-[3px]">
        {[18, 28, 39, 25, 34].map((height, index) => (
          <span className="block w-[3px] bg-black" key={`${height}-${index}`} style={{ height }} />
        ))}
      </div>
    </div>
  );
}

function FoodModalButton({ label, onClick, variant = "black" }: { label: string; onClick: () => void; variant?: "black" | "white" }) {
  return (
    <button
      className={`h-[44px] rounded-[25px] px-[25px] text-center font-['Federo'] text-[16px] leading-[1.5] ${
        variant === "black" ? "bg-black text-white" : "border-2 border-black bg-white text-black"
      }`}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  );
}

function FoodFrame04Modal({
  domain,
  escapeText,
  funnyFaces,
  judges,
  magicAdviceText,
  modal,
  selectedJudgeIndex,
  uploadedFoodKind,
  uploadedImage,
  onClose,
  onConfirmEscape,
  onSelectJudge,
}: {
  domain: Domain;
  escapeText: string;
  funnyFaces: Record<number, FunnyFaceState>;
  judges: Judge[];
  magicAdviceText: string;
  modal: FoodModalState;
  selectedJudgeIndex: number | null;
  uploadedFoodKind: string;
  uploadedImage: string | null;
  onClose: () => void;
  onConfirmEscape: () => void;
  onSelectJudge: (index: number) => void;
}) {
  if (!modal) return null;
  const selectedJudge = selectedJudgeIndex === null ? null : judges[selectedJudgeIndex] || foodJudgePool[selectedJudgeIndex] || null;
  const selectedFace = selectedJudgeIndex === null ? null : funnyFaces[selectedJudgeIndex]?.src || selectedJudge?.src || null;

  return (
    <div className="absolute inset-0 z-50 bg-white/75 px-[30px] pt-[154px] backdrop-blur-[1px]" onClick={onClose}>
      <div className="relative min-h-[360px] rounded-[8px] border-2 border-black bg-white px-[24px] pb-[25px] pt-[27px] shadow-[5px_6px_0_rgba(0,0,0,0.12)]" onClick={(event) => event.stopPropagation()}>
        {modal === "escape" ? (
          <>
            <h2 className="mb-[28px] text-center font-['Varela_Round'] text-[18px] leading-[1.4] text-black">现在就逃跑？</h2>
            <p className="mx-auto mb-[36px] w-[250px] text-center font-['Federo'] text-[17px] leading-[1.45] text-black">
              {escapeText}
            </p>
            <div className="flex justify-center gap-[14px]">
              <FoodModalButton label="留下" onClick={onClose} />
              <FoodModalButton label="逃跑" onClick={onConfirmEscape} variant="white" />
            </div>
          </>
        ) : null}

        {modal === "magic-select" ? (
          <>
            <h2 className="mb-[24px] text-center font-['Varela_Round'] text-[18px] leading-[1.4] text-black">选择一位评委魔改</h2>
            <div className="grid grid-cols-3 gap-[8px]">
              {judges.map((judge, index) => (
                <button className="min-h-[150px] bg-transparent p-0 text-center" key={`${judge.id}-magic`} onClick={() => onSelectJudge(index)} type="button">
                  <img alt="" className="judge-avatar-shadow mx-auto h-[105px] w-[105px] object-contain" src={funnyFaces[index]?.src || judge.src} />
                  <span className="mt-[8px] block font-['Varela_Round'] text-[10px] leading-[1.4] text-black">{judge.name}</span>
                </button>
              ))}
            </div>
            <div className="mt-[24px] flex justify-center">
              <FoodModalButton label="返回" onClick={onClose} variant="white" />
            </div>
          </>
        ) : null}

        {modal === "magic-result" ? (
          <>
            <button className="absolute left-[18px] top-[18px] h-[34px] rounded-[18px] border-2 border-black bg-white px-[16px] font-['Federo'] text-[14px]" onClick={onClose} type="button">
              返回
            </button>
            <h2 className="mb-[18px] text-center font-['Varela_Round'] text-[18px] leading-[1.4] text-black">魔改完成</h2>
            <div className="relative mx-auto mb-[18px] min-h-[220px] w-[260px] bg-[#f8f7f2] px-[18px] py-[20px]">
              {selectedFace ? <img alt="" className="absolute bottom-[-4px] right-[-5px] h-[92px] w-[92px] object-contain" src={selectedFace} /> : null}
              <p className="relative z-10 whitespace-pre-line pr-[72px] text-left font-['Federo'] text-[15px] leading-[1.45] text-black">
                {magicAdviceText || buildMagicAdvice(selectedJudge, uploadedFoodKind, domain)}
              </p>
            </div>
            <p className="mx-auto w-[250px] text-center font-['Federo'] text-[16px] leading-[1.45] text-black">
              {selectedJudge ? `${selectedJudge.name} 给出了文字版雷霆魔改。` : "评委已经完成一次荒诞魔改。"}
            </p>
          </>
        ) : null}
      </div>
    </div>
  );
}

function ReadyControl({ onShuffle }: { onShuffle?: () => void }) {
  return (
    <>
      <DisabledPill className="absolute left-1/2 top-[837px] h-[44px] w-[214px] -translate-x-1/2" label="评委已就座" />
      <IconButton ariaLabel="换一批评委" className="absolute left-[346px] top-[837px] h-[44px] w-[50px]" onClick={onShuffle} />
    </>
  );
}

function BlackActionButton({ label, onClick }: { label: string; onClick: () => void }) {
  return <EnabledPill className="absolute left-[108px] top-[837px] h-[44px] w-[214px]" label={label} onClick={onClick} />;
}

function WhiteActionButton({ href, label }: { href: string; label: string }) {
  return (
    <a
      className="absolute left-1/2 top-[837.5px] flex h-[50px] w-[203.43px] -translate-x-1/2 items-center justify-center border-2 border-black bg-white text-center font-['Federo'] text-[16px] leading-[1.5] text-black shadow-[2px_3px_0_rgba(0,0,0,0.18)]"
      href={href}
    >
      {label}
    </a>
  );
}

function WaitingJudgeOutlines({ revealOrder, revealing = false }: { revealOrder?: number[]; revealing?: boolean }) {
  const slots = [
    { left: 25, offset: 0, width: 104 },
    { left: 164, offset: 139, width: 104 },
    { left: 301, offset: 276, width: 104 },
  ];

  if (!revealing || !revealOrder) {
    return <img alt="" className="absolute left-[25px] top-[663px] h-[101px] w-[380px] max-w-none object-fill" src={judgePlaceholders} />;
  }

  return (
    <>
      {slots.map((slot, index) => {
        const revealIndex = Math.max(0, revealOrder.indexOf(index));
        return (
          <div
            key={slot.left}
            className="judge-placeholder-out absolute top-[663px] h-[101px] overflow-hidden"
            style={{
              left: slot.left,
              width: slot.width,
              ["--judge-delay" as string]: `${200 + revealIndex * 500}ms`,
            }}
          >
            <img alt="" className="absolute left-0 top-0 h-[101px] w-[380px] max-w-none object-fill" src={judgePlaceholders} style={{ transform: `translateX(-${slot.offset}px)` }} />
          </div>
        );
      })}
    </>
  );
}

function UploadedFoodImage({ image, frame }: { image: string | null; frame: "request" | "process" }) {
  if (!image) return null;
  const className = frame === "request" ? "left-[105px] top-[336px] h-[204px] w-[222px]" : "left-[50px] top-[190px] h-[304px] w-[330px]";
  return <img alt="上传的作品" className={`absolute ${className} object-contain transition-all duration-500 ease-out`} src={image} />;
}

function AttackedFoodImage({ attackCount, image }: { attackCount: number; image: string | null }) {
  if (!image) return null;
  const blast = Math.min(1, attackCount / 8);

  return (
    <div
      className="food-work-target absolute left-[50px] top-[190px] h-[304px] w-[330px]"
      style={{
        ["--blast" as string]: blast,
        ["--shake-x" as string]: `${Math.min(8, 1 + attackCount * 0.45)}px`,
        ["--shake-y" as string]: `${Math.min(6, 1 + attackCount * 0.32)}px`,
      }}
    >
      <div className={attackCount > 0 ? "food-work-bombed absolute inset-0" : "absolute inset-0"} key={`food-work-${attackCount}`}>
        <img alt="" className="food-work-image absolute inset-0 size-full object-contain transition-all duration-500 ease-out" src={image} />
      </div>
      {attackCount > 0 ? (
        <div className="food-work-blast absolute inset-0" key={`food-blast-${attackCount}`}>
          <span className="food-work-blast-ring" />
          <span className="food-work-blast-flash" />
        </div>
      ) : null}
    </div>
  );
}

function FoodPlatePreview({ image }: { image: string | null }) {
  return (
    <>
      <img alt="" className="absolute left-[41px] top-[314px] h-[260px] w-[344.5px] max-w-none object-fill opacity-100 transition-opacity duration-200 ease-out" src={foodForkKnife} />
      <div className="absolute left-[105px] top-[336px] z-10 grid h-[204px] w-[222px] place-items-center overflow-hidden">
        {image ? <img alt="上传的作品" className="h-full w-full object-contain transition-all duration-500 ease-out" src={image} /> : null}
      </div>
    </>
  );
}

function FramedWorkPreview({ attackCount = 0, flow, image, process = false }: { attackCount?: number; flow: DomainFlow; image: string | null; process?: boolean }) {
  const blast = Math.min(1, attackCount / 8);
  const frameBox = { height: 303, left: 26.75, top: process ? 205 : 295.5, width: 376.5 };
  const imageBox = { height: 196, left: frameBox.left + (frameBox.width - 266) / 2, top: frameBox.top + (frameBox.height - 196) / 2 + 4, width: 266 };

  return (
    <div
      className="food-work-target absolute left-0 top-0 h-full w-full"
      style={{
        ["--blast" as string]: blast,
        ["--shake-x" as string]: `${Math.min(8, 1 + attackCount * 0.45)}px`,
        ["--shake-y" as string]: `${Math.min(6, 1 + attackCount * 0.32)}px`,
      }}
    >
      <div className={attackCount > 0 ? "food-work-bombed absolute inset-0" : "absolute inset-0"} key={`${flow.domain}-framed-${attackCount}`}>
        <img alt="" className="absolute max-w-none object-fill" src={flow.mainSrc} style={{ height: frameBox.height, left: frameBox.left, top: frameBox.top, width: frameBox.width }} />
        <div className="absolute z-10 grid place-items-center overflow-hidden bg-[#d9d9d9]" style={{ height: imageBox.height, left: imageBox.left, top: imageBox.top, width: imageBox.width }}>
          {image ? <img alt="上传的作品" className="h-full w-full object-contain transition-all duration-500 ease-out" src={image} /> : null}
        </div>
      </div>
      {attackCount > 0 ? (
        <div className="food-work-blast absolute" key={`${flow.domain}-blast-${attackCount}`} style={{ height: imageBox.height, left: imageBox.left, top: imageBox.top, width: imageBox.width }}>
          <span className="food-work-blast-ring" />
          <span className="food-work-blast-flash" />
        </div>
      ) : null}
    </div>
  );
}

function FashionWorkPreview({ attackCount = 0, image }: { attackCount?: number; image: string | null }) {
  if (!image) return null;
  const blast = Math.min(1, attackCount / 8);

  return (
    <div
      className="food-work-target absolute left-[63px] top-[231px] h-[346px] w-[304px]"
      style={{
        ["--blast" as string]: blast,
        ["--shake-x" as string]: `${Math.min(8, 1 + attackCount * 0.45)}px`,
        ["--shake-y" as string]: `${Math.min(6, 1 + attackCount * 0.32)}px`,
      }}
    >
      <div className={attackCount > 0 ? "food-work-bombed absolute inset-0" : "absolute inset-0"} key={`fashion-work-${attackCount}`}>
        <img alt="上传的穿搭作品" className="absolute inset-0 size-full object-contain transition-all duration-500 ease-out" src={image} />
      </div>
      {attackCount > 0 ? (
        <div className="food-work-blast absolute inset-0" key={`fashion-blast-${attackCount}`}>
          <span className="food-work-blast-ring" />
          <span className="food-work-blast-flash" />
        </div>
      ) : null}
    </div>
  );
}

function MusicWorkPreview({ attackCount = 0, flow, process = false }: { attackCount?: number; flow: DomainFlow; process?: boolean }) {
  const blast = Math.min(1, attackCount / 8);

  return (
    <div
      className={`food-work-target absolute left-[52px] h-[246px] w-[326px] ${process ? "top-[210px]" : "top-[300px]"}`}
      style={{
        ["--blast" as string]: blast,
        ["--shake-x" as string]: `${Math.min(8, 1 + attackCount * 0.45)}px`,
        ["--shake-y" as string]: `${Math.min(6, 1 + attackCount * 0.32)}px`,
      }}
    >
      <div className={attackCount > 0 ? "food-work-bombed absolute inset-0" : "absolute inset-0"} key={`music-work-${attackCount}`}>
        <img alt="" className="absolute inset-0 size-full max-w-none object-contain opacity-100 transition-opacity duration-200 ease-out" src={flow.mainSrc} />
      </div>
      {attackCount > 0 ? (
        <div className="food-work-blast absolute inset-0" key={`music-blast-${attackCount}`}>
          <span className="food-work-blast-ring" />
          <span className="food-work-blast-flash" />
        </div>
      ) : null}
    </div>
  );
}

function DomainWorkPreview({ flow, image }: { flow: DomainFlow; image: string | null }) {
  if (flow.domain === "food") return <FoodPlatePreview image={image} />;
  if (flow.domain === "fashion") return <FashionWorkPreview image={image} />;
  if (flow.domain === "painting" || flow.domain === "photo") return <FramedWorkPreview flow={flow} image={image} />;
  if (flow.domain === "music") return <MusicWorkPreview flow={flow} />;

  return (
    <>
      <img alt="" className="absolute left-[52px] top-[300px] h-[246px] w-[326px] max-w-none object-contain opacity-45 transition-opacity duration-200 ease-out" src={flow.mainSrc} />
      <div className="absolute left-[72px] top-[248px] z-10 grid h-[286px] w-[286px] place-items-center overflow-hidden rounded-[4px] bg-white/60">
        {image ? <img alt="uploaded work" className="h-full w-full object-contain transition-all duration-500 ease-out" src={image} /> : null}
      </div>
      <p className="absolute left-1/2 top-[557px] z-10 w-[260px] -translate-x-1/2 text-center font-['Varela_Round'] text-[13px] leading-[1.35] text-black">
        {flow.uploadLabel}
      </p>
    </>
  );
}

function DomainProcessWork({
  attackCount,
  flow,
  image,
}: {
  attackCount: number;
  flow: DomainFlow;
  image: string | null;
}) {
  if (flow.domain === "food") return <AttackedFoodImage attackCount={attackCount} image={image} />;
  if (flow.domain === "fashion") return <FashionWorkPreview attackCount={attackCount} image={image} />;
  if (flow.domain === "painting" || flow.domain === "photo") return <FramedWorkPreview attackCount={attackCount} flow={flow} image={image} process />;
  if (flow.domain === "music") return <MusicWorkPreview attackCount={attackCount} flow={flow} process />;
  return <AttackedFoodImage attackCount={attackCount} image={image} />;
}

const WRITING_MAX_LINES = 13;
const WRITING_CHARS_PER_LINE = 16;
const WRITING_MAX_CHARS = WRITING_MAX_LINES * WRITING_CHARS_PER_LINE;
const WRITING_MIN_LINES_PER_FRAME = 2;
const WRITING_CONTENT_TOP = 170;
const WRITING_LINE_HEIGHT = 18;
const WRITING_TEXT_WIDTH = 210;
const WRITING_PAPER_WIDTH = 339;
const writingPaperFrames = [
  { height: 263, src: writingPaperFrame01 },
  { height: 283, src: writingPaperFrame02 },
  { height: 303, src: writingPaperFrame03 },
  { height: 323, src: writingPaperFrame04 },
  { height: 343, src: writingPaperFrame05 },
  { height: 363, src: writingPaperFrame06 },
  { height: 386, src: writingPaperFrame07 },
  { height: 386, src: writingPaperFrame08 },
  { height: 401, src: writingPaperFrame09 },
  { height: 422, src: writingPaperFrame10 },
  { height: 442, src: writingPaperFrame11 },
];

function clampWritingText(value: string) {
  const limitedChars = [...value].slice(0, WRITING_MAX_CHARS).join("");
  const lines = limitedChars.split(/\r?\n/);
  return lines.length > WRITING_MAX_LINES ? lines.slice(0, WRITING_MAX_LINES).join("\n") : limitedChars;
}

function getWritingPaperMetrics(text: string) {
  const lineCount = estimateWritingLineCount(text);
  const charCount = [...text].length;
  const frameIndex =
    lineCount >= WRITING_MAX_LINES || charCount >= WRITING_MAX_CHARS
      ? writingPaperFrames.length - 1
      : Math.min(writingPaperFrames.length - 1, Math.max(0, lineCount - WRITING_MIN_LINES_PER_FRAME));
  const paperFrame = writingPaperFrames[frameIndex];
  const paperHeight = paperFrame.height;
  const contentHeight = Math.max(WRITING_MIN_LINES_PER_FRAME, lineCount) * WRITING_LINE_HEIGHT;

  return { contentHeight, frameIndex, lineCount, paperFrame, paperHeight };
}

function WritingPaper({
  attackCount = 0,
  className = "",
  interactive = false,
  onClick,
  showText = true,
  text,
}: {
  attackCount?: number;
  className?: string;
  interactive?: boolean;
  onClick?: () => void;
  showText?: boolean;
  text: string;
}) {
  const cleanText = text.trim() || "开始写作";
  const { contentHeight, paperFrame, paperHeight } = getWritingPaperMetrics(text);

  return (
    <button
      aria-label={interactive ? "修改文本" : "文学作品文本"}
      className={`writing-paper-target absolute bg-transparent p-0 text-left ${interactive ? "cursor-pointer" : "cursor-default"} ${className}`}
      disabled={!interactive}
      onClick={onClick}
      style={{
        height: paperHeight,
        width: WRITING_PAPER_WIDTH,
        ["--shake-x" as string]: `${Math.min(8, 1 + attackCount * 0.45)}px`,
        ["--shake-y" as string]: `${Math.min(6, 1 + attackCount * 0.32)}px`,
      }}
      type="button"
    >
      <div className={attackCount > 0 ? "food-work-bombed absolute inset-0" : "absolute inset-0"} key={`writing-paper-${attackCount}-${paperHeight}`}>
        <img alt="" className="absolute left-0 top-0 w-[339px] max-w-none" src={paperFrame.src} />
        {showText ? (
          <p
            className="absolute left-[65px] z-10 whitespace-pre-wrap break-words font-['Varela_Round'] text-[13px] text-black"
            style={{ lineHeight: `${WRITING_LINE_HEIGHT}px`, minHeight: contentHeight, top: WRITING_CONTENT_TOP, width: WRITING_TEXT_WIDTH }}
          >
            {cleanText}
          </p>
        ) : null}
      </div>
      {attackCount > 0 ? (
        <div className="food-work-blast absolute inset-0" key={`writing-blast-${attackCount}`}>
          <span className="food-work-blast-ring" />
          <span className="food-work-blast-flash" />
        </div>
      ) : null}
    </button>
  );
}

function estimateWritingLineCount(value: string) {
  const lines = value.split(/\r?\n/);
  const estimated = lines.reduce((count, line) => {
    const weightedLength = [...line].reduce((sum, char) => sum + (/[A-Za-z0-9 .,!?'"()-]/.test(char) ? 0.56 : 1), 0);
    return count + Math.max(1, Math.ceil(weightedLength / WRITING_CHARS_PER_LINE));
  }, 0);

  return Math.min(WRITING_MAX_LINES, Math.max(1, estimated));
}

function WritingInputStage({ onCommit, onTextChange, text }: { onCommit: () => void; onTextChange: (value: string) => void; text: string }) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const commitTimerRef = useRef<number | null>(null);
  const { contentHeight, paperHeight } = getWritingPaperMetrics(text);
  const hasReachedLimit = [...text].length >= WRITING_MAX_CHARS || estimateWritingLineCount(text) >= WRITING_MAX_LINES;

  useEffect(() => {
    const timer = window.setTimeout(() => textareaRef.current?.focus(), 220);
    return () => window.clearTimeout(timer);
  }, []);

  function scheduleCommit() {
    if (commitTimerRef.current) window.clearTimeout(commitTimerRef.current);
    commitTimerRef.current = window.setTimeout(() => {
      if (textareaRef.current?.value.trim()) onCommit();
    }, 360);
  }

  return (
    <>
      <WritingPaper className="left-[45px] top-[156px]" showText={false} text={text} />
      {!text ? (
        <div className="pointer-events-none absolute left-[114px] top-[326px] z-50 flex h-[24px] items-center gap-[6px] font-['Varela_Round'] text-[13px] leading-none text-black/70">
          <span className="writing-input-caret h-[19px] w-[2px] bg-black" />
          <span className="writing-input-dots">...</span>
        </div>
      ) : null}
      <textarea
        aria-label="输入文学作品文本"
        className="absolute left-[114px] z-40 resize-none overflow-hidden bg-transparent font-['Varela_Round'] text-[13px] text-black caret-black outline-none placeholder:text-black"
        maxLength={WRITING_MAX_CHARS}
        onBlur={scheduleCommit}
        onChange={(event) => onTextChange(clampWritingText(event.target.value))}
        onKeyDown={(event) => {
          if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
            event.preventDefault();
            textareaRef.current?.blur();
          }
        }}
        ref={textareaRef}
        style={{ height: contentHeight, lineHeight: `${WRITING_LINE_HEIGHT}px`, top: 156 + WRITING_CONTENT_TOP, width: WRITING_TEXT_WIDTH }}
        value={text}
      />
      {hasReachedLimit ? (
        <p
          className="pointer-events-none absolute left-1/2 z-50 w-[220px] -translate-x-1/2 text-center font-['Varela_Round'] text-[12px] leading-[1.35] text-black/55"
          style={{ top: 156 + paperHeight + 10 }}
        >
          文本量达到最大限度
        </p>
      ) : null}
    </>
  );
}

function WritingProcessTarget({ attackCount, onEdit, text }: { attackCount: number; onEdit: () => void; text: string }) {
  return <WritingPaper attackCount={attackCount} className="left-[46px] top-[151px]" interactive onClick={onEdit} text={text} />;
}

function FoodUploadButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      aria-label="上传美食"
      className="upload-entry-in absolute left-[37.5px] top-[306.5px] z-10 h-[276.5px] w-[357.5px] cursor-pointer bg-transparent p-0"
      onClick={onClick}
      type="button"
    >
      <img alt="" className="absolute inset-0 h-full w-full max-w-none object-fill" src={foodUploadTapArea} />
      <img alt="" className="absolute left-[4.5px] top-[7.5px] h-[260px] w-[344.5px] max-w-none object-fill" src={foodUploadVector} />
      <img alt="" className="absolute left-[62.56px] top-[24.5px] h-[225.354px] w-[231.68px] max-w-none object-fill" src={foodUploadGroup} />
      <span className="absolute left-[140.5px] top-[127.5px] flex h-[26px] w-[71px] items-center justify-center text-center font-['Federo'] text-[14px] leading-[1.5] text-black">
        上传美食
      </span>
    </button>
  );
}

const uploadTextPositionByDomain = {
  fashion: { left: "185.5px", top: "139px" },
  food: { left: "176px", top: "140.5px" },
  music: { left: "176.5px", top: "152px" },
  painting: { left: "188.5px", top: "153px" },
  photo: { left: "188.5px", top: "153px" },
  writing: { left: "178.5px", top: "85.5px" },
} satisfies Record<Domain, { left: string; top: string }>;

function DomainUploadButton({ flow, onClick }: { flow: DomainFlow; onClick: () => void }) {
  if (flow.domain === "food") return <FoodUploadButton onClick={onClick} />;

  const labelByDomain: Record<Domain, string> = {
    fashion: "上传穿搭照片",
    food: "上传美食",
    music: "上传作品",
    painting: "上传作品",
    photo: "上传作品",
    writing: "开始写作",
  };
  const layoutByDomain: Record<Exclude<Domain, "food">, string> = {
    fashion: "left-[28.75px] top-[304px] h-[278.5px] w-[372.5px]",
    music: "left-[38.75px] top-[344.5px] h-[250px] w-[352.5px]",
    painting: "left-[26.75px] top-[295.5px] h-[303.5px] w-[376.5px]",
    photo: "left-[26.75px] top-[295.5px] h-[303.5px] w-[376.5px]",
    writing: "left-[34px] top-[295.5px] h-[291px] w-[356px]",
  };

  return (
    <button
      aria-label={flow.uploadLabel}
      className={`upload-entry-in absolute z-10 cursor-pointer bg-transparent p-0 ${layoutByDomain[flow.domain]}`}
      onClick={onClick}
      type="button"
    >
      {flow.domain === "writing" ? (
        <>
          <img alt="" className="absolute left-0 top-0 h-[291px] w-[356px] max-w-none object-fill" src={uploadWritingStickerBg} />
          <img alt="" className="absolute left-[15px] top-[8.5px] h-[78.74px] w-[43.51px] max-w-none object-fill" src={uploadWritingVector4} />
          <img alt="" className="absolute left-[332.53px] top-[9.02px] h-[80.29px] w-[13.47px] max-w-none object-fill" src={uploadWritingVector6} />
          <img alt="" className="absolute left-[32.09px] top-[29.22px] h-[248.97px] w-[299.92px] max-w-none object-fill" src={uploadWritingVector5} />
          <img alt="" className="absolute left-[47.12px] top-[68.07px] h-[38.33px] w-[13.47px] max-w-none object-fill" src={uploadWritingVector7} />
        </>
      ) : null}
      {flow.domain === "fashion" ? (
        <>
          <img alt="" className="absolute left-0 top-0 h-[278.5px] w-[372.5px] max-w-none object-fill" src={uploadFashionStickerBg} />
          <img alt="" className="absolute left-[10.5px] top-[12.5px] h-[252.31px] w-[349.9px] max-w-none object-fill" src={uploadFashionVector8} />
          <img alt="" className="absolute left-[136.67px] top-[12.5px] h-[41.17px] w-[80.64px] max-w-none object-fill" src={uploadFashionVector9} />
        </>
      ) : null}
      {flow.domain === "painting" ? (
        <>
          <img alt="" className="absolute left-0 top-0 h-[303.5px] w-[376.5px] max-w-none object-fill" src={uploadPaintingStickerBg} />
          <img alt="" className="absolute left-[15px] top-[13.5px] h-[279px] w-[349px] max-w-none object-fill" src={uploadPaintingVector15} />
        </>
      ) : null}
      {flow.domain === "photo" ? (
        <>
          <img alt="" className="absolute left-0 top-0 h-[303.5px] w-[376.5px] max-w-none object-fill" src={uploadPhotoStickerBg} />
          <img alt="" className="absolute left-[15px] top-[13.5px] h-[279px] w-[349px] max-w-none object-fill" src={uploadPhotoVector15} />
        </>
      ) : null}
      {flow.domain === "music" ? (
        <>
          <img alt="" className="absolute left-0 top-0 h-[250px] w-[352.5px] max-w-none object-fill" src={uploadMusicStickerBg} />
          <img alt="" className="absolute left-[10.5px] top-[9.5px] h-[228px] w-[331px] max-w-none object-fill" src={uploadMusicVector17} />
        </>
      ) : null}
      <span
        className="absolute z-10 flex h-[27px] w-[174px] -translate-x-1/2 -translate-y-1/2 items-center justify-center text-center font-['Varela_Round'] text-[15px] leading-[1.5] text-black"
        style={uploadTextPositionByDomain[flow.domain]}
      >
        {labelByDomain[flow.domain]}
      </span>
    </button>
  );
}

function SpeechBubbleRow() {
  const bubbles = [
    { left: 15, top: 577 },
    { left: 159, top: 577 },
    { left: 302, top: 577 },
  ];

  return (
    <>
      {bubbles.map((bubble) => (
        <div key={bubble.left} className="absolute h-[42px] w-[113px]" style={{ left: bubble.left, top: bubble.top }}>
          <div className="absolute left-0 top-0 h-[34px] w-[113px] rounded-[17px] border-2 border-black bg-white" />
          <div className="absolute left-[13px] top-[27px] h-[14px] w-[18px] rotate-[-18deg] rounded-bl-[12px] border-b-2 border-l-2 border-black bg-white" />
        </div>
      ))}
    </>
  );
}

function FoodFlowScreen({
  activeJudgeBubbles,
  bombImpactCount,
  escapeText,
  flow,
  funnyFaces,
  foodModal,
  foodToast,
  step,
  judges,
  judgesReady,
  judgesRevealed,
  isTasting,
  magicAdviceText,
  magicJudgeIndex,
  judgeRevealOrder,
  uploadedImage,
  uploadedFoodKind,
  uploadedMediaKind,
  writingText,
  onDownloadCritique,
  onEscapeClick,
  onJudgeStickerClick,
  onWritingTextChange,
  onWritingTextCommit,
  onWritingTextEdit,
  onStartCritique,
  onMagicClick,
  onModalClose,
  onModalEscape,
  onSelectMagicJudge,
  onBombExplode,
  onShuffle,
  onUpload,
  fileInputRef,
}: {
  activeJudgeBubbles: CritiqueBubble[];
  bombImpactCount: number;
  escapeText: string;
  flow: DomainFlow;
  funnyFaces: Record<number, FunnyFaceState>;
  foodModal: FoodModalState;
  foodToast: FoodToastState;
  step: number;
  judges: Judge[];
  judgesReady: boolean;
  judgesRevealed: boolean;
  isTasting: boolean;
  magicAdviceText: string;
  magicJudgeIndex: number | null;
  judgeRevealOrder: number[];
  uploadedImage: string | null;
  uploadedFoodKind: string;
  uploadedMediaKind: UploadedMediaKind | null;
  writingText: string;
  onDownloadCritique: () => void;
  onEscapeClick: () => void;
  onJudgeStickerClick: (index: number) => void;
  onWritingTextChange: (value: string) => void;
  onWritingTextCommit: () => void;
  onWritingTextEdit: () => void;
  onStartCritique: (index: number) => void;
  onMagicClick: () => void;
  onModalClose: () => void;
  onModalEscape: () => void;
  onSelectMagicJudge: (index: number) => void;
  onBombExplode: () => void;
  onShuffle: () => void;
  onUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}) {
  const nodeId = flow.nodeIds[step - 1] || flow.nodeIds[flow.nodeIds.length - 1] || flow.nodeIds[0];
  const funnyRevealableCount = countFunnyRevealableJudges(judges);
  const funnyRevealDone = funnyRevealableCount === 0 || Object.keys(funnyFaces).length >= funnyRevealableCount;

  return (
    <PhoneFrame label={`${flow.title} ${String(step).padStart(2, "0")}`} nodeId={nodeId}>
      <StatusBar />
      <EscapeLink onEscape={step === 4 ? onEscapeClick : undefined} />
      {step !== 4 && !(flow.domain === "writing" && step === 3) ? <Title>{flow.title}</Title> : null}

      {step === 1 ? (
        <>
          <MainSketch flow={flow} />
          <WaitingJudgeOutlines />
          <DisabledPill className="absolute left-[108px] top-[837px] h-[44px] w-[214px]" label="等待评委入座ing……" />
        </>
      ) : null}

      {step === 2 ? (
        <>
          {judgesRevealed ? (
            <DomainUploadButton flow={flow} onClick={() => {
              playUiBlip("upload");
              if (flow.domain === "writing") {
                onWritingTextChange("");
                window.location.hash = hrefFor(flow.domain, 3);
              } else {
                fileInputRef.current?.click();
              }
            }} />
          ) : (
            <MainSketch flow={flow} compact />
          )}
          <input accept={flow.domain === "music" ? "audio/*,video/*" : "image/*"} className="hidden" onChange={onUpload} ref={fileInputRef} type="file" />
          <WaitingJudgeOutlines revealOrder={judgeRevealOrder} revealing={judgesReady} />
          {judgesReady ? (
            flow.domain === "writing" ? (
              <WritingJudgeRow animated judges={judges} revealOrder={judgeRevealOrder} withLabels />
            ) : (
              <FoodJudgeRow animated judges={judges} revealOrder={judgeRevealOrder} withLabels />
            )
          ) : null}
          {judgesRevealed ? <ReadyControl onShuffle={onShuffle} /> : <DisabledPill className="absolute left-[108px] top-[837px] h-[44px] w-[214px]" label="等待评委入座ing……" />}
        </>
      ) : null}

      {step === 3 ? (
        flow.domain === "writing" ? (
          <>
            <WritingInputStage onCommit={onWritingTextCommit} onTextChange={onWritingTextChange} text={writingText} />
            {isTasting || Object.keys(funnyFaces).length > 0 ? (
              <>
                {Object.keys(funnyFaces).length > 0 ? (
                  <WritingJudgeStickerRow funnyFaces={funnyFaces} judges={judges} />
                ) : (
                  <WritingJudgeRow judges={judges} thinking withLabels />
                )}
                <FoodToast toast={isTasting ? foodToast : null} />
              </>
            ) : null}
          </>
        ) : (
          <>
            <DomainWorkPreview flow={flow} image={uploadedImage} />
            {flow.domain === "music" && uploadedMediaKind ? <span className="sr-only">已上传{uploadedMediaKind === "video" ? "视频声音" : "音频"}作品</span> : null}
            {Object.keys(funnyFaces).length > 0 ? (
              <FoodJudgeStickerRow
                funnyFaces={funnyFaces}
                judges={judges}
                thinking={isTasting}
              />
            ) : (
              <FoodJudgeRow judges={judges} thinking={isTasting} withLabels />
            )}
            <FoodToast toast={isTasting ? foodToast : null} />
          </>
        )
      ) : null}

      {step === 4 ? (
        <>
          {flow.domain === "writing" ? (
            <WritingProcessTarget attackCount={bombImpactCount} onEdit={onWritingTextEdit} text={writingText} />
          ) : (
            <DomainProcessWork attackCount={bombImpactCount} flow={flow} image={uploadedImage} />
          )}
          <FoodCritiqueBubbles bubbles={activeJudgeBubbles} onExplode={onBombExplode} />
          {flow.domain === "writing" ? (
            <WritingJudgeStickerRow animate={false} funnyFaces={funnyFaces} judges={judges} onJudgeClick={onJudgeStickerClick} />
          ) : (
            <FoodJudgeStickerRow animate={false} funnyFaces={funnyFaces} judges={judges} onJudgeClick={onJudgeStickerClick} />
          )}
          <Frame04Actions onDownload={onDownloadCritique} onMagic={onMagicClick} />
          <FoodToast toast={foodToast} />
          <FoodFrame04Modal
            domain={flow.domain}
            escapeText={escapeText}
            funnyFaces={funnyFaces}
            judges={judges}
            magicAdviceText={magicAdviceText}
            modal={foodModal}
            onClose={onModalClose}
            onConfirmEscape={onModalEscape}
            onSelectJudge={onSelectMagicJudge}
            selectedJudgeIndex={magicJudgeIndex}
            uploadedFoodKind={uploadedFoodKind}
            uploadedImage={uploadedImage}
          />
        </>
      ) : null}
    </PhoneFrame>
  );
}

function UploadPrompt({ flow }: { flow: DomainFlow }) {
  return (
    <div className="absolute left-1/2 top-[363px] z-20 flex min-h-[24px] w-[190px] -translate-x-1/2 items-center justify-center text-center font-['Varela_Round'] text-[15px] leading-[1.5] text-black">
      {flow.uploadLabel}
    </div>
  );
}

function TextInputOverlay({ flow, step }: { flow: DomainFlow; step: number }) {
  if (flow.domain !== "writing") return null;
  if (step === 3) {
    return (
      <div className="absolute inset-x-0 bottom-0 h-[292px] bg-[#d4d7de] px-[7px] pt-[9px] font-['Urbanist'] text-black">
        <div className="mb-[8px] flex justify-between text-[25px]">
          {"QWERTYUIOP".split("").map((key) => (
            <span key={key} className="grid h-[42px] w-[32px] place-items-center rounded-[5px] bg-white shadow-sm">
              {key}
            </span>
          ))}
        </div>
        <div className="mb-[8px] flex justify-center gap-[6px] text-[25px]">
          {"ASDFGHJKL".split("").map((key) => (
            <span key={key} className="grid h-[42px] w-[32px] place-items-center rounded-[5px] bg-white shadow-sm">
              {key}
            </span>
          ))}
        </div>
        <div className="mb-[8px] flex justify-center gap-[6px] text-[25px]">
          {"ZXCVBNM".split("").map((key) => (
            <span key={key} className="grid h-[42px] w-[32px] place-items-center rounded-[5px] bg-white shadow-sm">
              {key}
            </span>
          ))}
        </div>
        <div className="mx-auto h-[42px] w-[215px] rounded-[5px] bg-white" />
      </div>
    );
  }
  if (step >= 4) {
    return (
      <p className="absolute left-[88px] top-[359px] z-20 w-[254px] whitespace-pre-line text-center font-['Varela_Round'] text-[15px] leading-[1.5] text-black">
        {"开始写作\nXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"}
      </p>
    );
  }
  return null;
}

function GenericFlowScreen({ flow, step }: { flow: DomainFlow; step: number }) {
  const nodeId = flow.nodeIds[step - 1] || flow.nodeIds[0];
  const hasMore = step < flow.nodeIds.length;
  const nextHref = hasMore ? hrefFor(flow.domain, step + 1) : hrefFor(flow.domain, Math.max(1, flow.nodeIds.length - 1));

  return (
    <PhoneFrame label={`${flow.title} ${String(step).padStart(2, "0")}`} nodeId={nodeId}>
      <StatusBar />
      <EscapeLink />
      <Title>{flow.title}</Title>
      <MainSketch flow={flow} compact={step > 1} />

      {step === 1 ? (
        <a aria-label="进入下一步" className="absolute inset-x-[16px] top-[630px] h-[180px]" href={nextHref}>
          <GenericCriticRow />
        </a>
      ) : null}

      {step === 2 ? (
        <>
          <UploadPrompt flow={flow} />
          <GenericCriticRow withLabels />
          <ReadyControl />
        </>
      ) : null}

      {step === 3 ? (
        <>
          <GenericCriticRow withLabels />
          <TextInputOverlay flow={flow} step={step} />
          <WhiteActionButton href={nextHref} label="请求锐评" />
        </>
      ) : null}

      {step >= 4 ? (
        <>
          <GenericCriticRow withLabels />
          <TextInputOverlay flow={flow} step={step} />
          <WhiteActionButton href={hrefFor(flow.domain, 2)} label={step === flow.nodeIds.length ? "请求魔改" : "请求锐评"} />
        </>
      ) : null}
    </PhoneFrame>
  );
}

function loadCanvasImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

async function tryLoadCanvasImage(src: string | null | undefined) {
  if (!src) return null;
  try {
    return await loadCanvasImage(src);
  } catch {
    return null;
  }
}

function drawContainImage(context: CanvasRenderingContext2D, image: HTMLImageElement, x: number, y: number, width: number, height: number) {
  const scale = Math.min(width / image.naturalWidth, height / image.naturalHeight);
  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;
  context.drawImage(image, x + (width - drawWidth) / 2, y + (height - drawHeight) / 2, drawWidth, drawHeight);
}

function drawFallbackBubble(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, tail: "left" | "right") {
  context.save();
  context.fillStyle = "#ffffff";
  context.strokeStyle = "rgba(0, 0, 0, 0.14)";
  context.lineWidth = 2;
  context.beginPath();
  context.roundRect(x, y, width, height - 22, 28);
  if (tail === "left") {
    context.moveTo(x + 36, y + height - 24);
    context.lineTo(x + 18, y + height);
    context.lineTo(x + 58, y + height - 23);
  } else {
    context.moveTo(x + width - 58, y + height - 23);
    context.lineTo(x + width - 18, y + height);
    context.lineTo(x + width - 36, y + height - 24);
  }
  context.closePath();
  context.fill();
  context.stroke();
  context.restore();
}

function downloadBlobWithAnchor(blob: Blob, fileName: string) {
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = fileName;
  link.href = objectUrl;
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 4000);
}

function drawWrappedText(context: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
  const chars = [...text];
  let line = "";
  let currentY = y;
  chars.forEach((char) => {
    const next = line + char;
    if (context.measureText(next).width > maxWidth && line) {
      context.fillText(line, x, currentY);
      line = char;
      currentY += lineHeight;
    } else {
      line = next;
    }
  });
  if (line) context.fillText(line, x, currentY);
}

function wrapCanvasText(context: CanvasRenderingContext2D, text: string, maxWidth: number, maxLines: number) {
  const lines: string[] = [];
  let line = "";
  [...text].forEach((char) => {
    const next = line + char;
    if (context.measureText(next).width > maxWidth && line) {
      if (lines.length < maxLines) lines.push(line);
      line = char;
    } else {
      line = next;
    }
  });
  if (line && lines.length < maxLines) lines.push(line);
  return lines;
}

function wrapCanvasLines(context: CanvasRenderingContext2D, text: string, maxWidth: number, maxLines = Number.POSITIVE_INFINITY) {
  const lines: string[] = [];
  let line = "";
  [...text].forEach((char) => {
    const next = line + char;
    if (context.measureText(next).width > maxWidth && line) {
      if (lines.length < maxLines) lines.push(line);
      line = char;
    } else {
      line = next;
    }
  });
  if (line && lines.length < maxLines) lines.push(line);
  return lines;
}

function drawCenteredBubbleText(
  context: CanvasRenderingContext2D,
  text: string,
  centerX: number,
  centerY: number,
  lineHeight: number,
  maxWidth = 150,
  maxLines = 3,
) {
  context.textAlign = "center";
  context.textBaseline = "middle";
  if (isEmojiOnly(text)) {
    context.font = "32px 'Federo', sans-serif";
    context.fillText(formatCritiqueText(text), centerX, centerY);
    context.textBaseline = "alphabetic";
    return;
  }
  context.font = "14px 'Federo', 'Varela Round', sans-serif";
  const lines = wrapCanvasLines(context, text, maxWidth, maxLines);
  const firstY = centerY - ((lines.length - 1) * lineHeight) / 2;
  lines.forEach((line, index) => {
    context.fillText(line, centerX, firstY + index * lineHeight);
  });
  context.textBaseline = "alphabetic";
}

function App() {
  const [route, setRoute] = useState<Route>(() => {
    if (window.location.hash !== "#home") {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}#home`);
    }
    return { domain: "home", step: 0 };
  });
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);
  const [foodJudges, setFoodJudges] = useState<Judge[]>(() => drawJudges("food"));
  const [foodJudgesReady, setFoodJudgesReady] = useState(false);
  const [foodJudgesRevealed, setFoodJudgesRevealed] = useState(false);
  const [judgeRevealOrder, setJudgeRevealOrder] = useState<number[]>(() => drawRevealOrder());
  const [uploadedFoodImage, setUploadedFoodImage] = useState<string | null>(null);
  const [uploadedMediaKind, setUploadedMediaKind] = useState<UploadedMediaKind | null>(null);
  const [uploadedFoodName, setUploadedFoodName] = useState<string | null>(null);
  const [uploadedFoodAnalysis, setUploadedFoodAnalysis] = useState<FoodAnalysis>(() => inferFoodAnalysis(null));
  const [writingText, setWritingText] = useState("");
  const [foodJudgeBubbles, setFoodJudgeBubbles] = useState<CritiqueBubble[]>([]);
  const [foodFunnyFaces, setFoodFunnyFaces] = useState<Record<number, FunnyFaceState>>({});
  const [tasteComplete, setTasteComplete] = useState(true);
  const [foodBombImpactCount, setFoodBombImpactCount] = useState(0);
  const [foodModal, setFoodModal] = useState<FoodModalState>(null);
  const [foodToast, setFoodToast] = useState<FoodToastState>(null);
  const [escapeText, setEscapeText] = useState(() => pickEscapeRoast());
  const [magicJudgeIndex, setMagicJudgeIndex] = useState<number | null>(null);
  const [magicAdviceText, setMagicAdviceText] = useState("");
  const foodBubbleIdRef = useRef(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const uploadedAudioRef = useRef<HTMLAudioElement | null>(null);
  const pendingCritiqueIndexRef = useRef<number | null>(null);

  function showFoodToast(text: string, duration = 1800) {
    const id = Date.now();
    setFoodToast({ duration, id, text });
    window.setTimeout(() => {
      setFoodToast((current) => (current?.id === id ? null : current));
    }, duration);
  }

  useEffect(() => {
    const onHashChange = () => setRoute(routeFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [route]);

  useEffect(() => {
    if (route.domain === "home") return;
    const nextJudges = drawJudges(route.domain);
    setFoodJudges(nextJudges);
    setJudgeRevealOrder(drawRevealOrder(nextJudges.length));
    setFoodJudgesReady(false);
    setFoodJudgesRevealed(false);
    setFoodFunnyFaces({});
    setFoodJudgeBubbles([]);
    setTasteComplete(true);
  }, [route.domain]);

  useEffect(() => {
    if (route.domain !== "home" && route.step === 4) {
      setFoodJudgeBubbles([]);
      setFoodBombImpactCount(0);
      const pendingIndex = pendingCritiqueIndexRef.current;
      if (pendingIndex !== null) {
        pendingCritiqueIndexRef.current = null;
        window.setTimeout(() => triggerJudgeCritique(pendingIndex), 120);
      }
    } else {
      setFoodModal(null);
    }
  }, [route.domain, route.step]);

  useEffect(() => {
    if (route.domain === "home") return;
    if (route.step !== 3) {
      if (route.step < 3) setFoodFunnyFaces({});
      return;
    }
    if (route.domain === "writing") return;
    if (!tasteComplete) return;
    setFoodFunnyFaces({});
    const timers = drawFunnyRevealOrder(foodJudges).map((judgeIndex, revealIndex) =>
      window.setTimeout(() => {
        const judge = foodJudges[judgeIndex] || judgePoolsByDomain[route.domain]?.[judgeIndex] || foodJudgePool[judgeIndex];
        playUiBlip("face");
        foodBubbleIdRef.current += 1;
        const funnyFace = drawFunnyFaceForJudge(judge, foodBubbleIdRef.current);
        if (!funnyFace) return;
        setFoodFunnyFaces((current) => ({ ...current, [judgeIndex]: funnyFace }));
      }, (revealIndex + 1) * 1000),
    );
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [foodJudges, route.domain, route.step, tasteComplete, uploadedFoodImage]);

  useEffect(() => {
    if (route.domain === "home" || route.step !== 4 || Object.keys(foodFunnyFaces).length > 0) return;
    if (countFunnyRevealableJudges(foodJudges) === 0) return;
    foodBubbleIdRef.current += 1;
    setFoodFunnyFaces(drawFunnyFacesForJudges(foodJudges, foodBubbleIdRef.current * 10));
  }, [foodFunnyFaces, foodJudges, route.domain, route.step]);

  useEffect(() => {
    if (route.domain === "home" || route.step !== 3) return;
    if (route.domain === "writing") return;
    if (!tasteComplete) return;
    const revealableCount = countFunnyRevealableJudges(foodJudges);
    const revealDone = revealableCount === 0 || Object.keys(foodFunnyFaces).length >= revealableCount;
    if (!revealDone) return;
    const timer = window.setTimeout(() => {
      playUiBlip("whoosh");
      window.location.hash = hrefFor(route.domain, 4);
    }, 520);
    return () => window.clearTimeout(timer);
  }, [foodFunnyFaces, foodJudges, route.domain, route.step, tasteComplete]);

  useEffect(() => {
    if (route.domain === "home") return;
    if (route.step === 3) {
      if (route.domain === "writing") return;
      if (!tasteComplete) return;
      const revealableCount = countFunnyRevealableJudges(foodJudges);
      const revealDone = revealableCount === 0 || Object.keys(foodFunnyFaces).length >= revealableCount;
      if (!revealDone) showFoodToast("等待评委变脸中...", 1400);
    }
    if (route.step === 4) {
      const timer = window.setTimeout(() => showFoodToast("点击评委头像，请求评委锐评", 2600), 180);
      return () => window.clearTimeout(timer);
    }
  }, [foodFunnyFaces, foodJudges, route.domain, route.step, tasteComplete]);

  useEffect(() => {
    if (route.domain === "home" || route.step !== 3 || route.domain === "writing" || !uploadedFoodImage) return;
    setTasteComplete(false);
    const delay = route.domain === "music" ? 5000 : 2000;
    showFoodToast("细品中……", delay + 240);
    const timer = window.setTimeout(() => setTasteComplete(true), delay);
    return () => window.clearTimeout(timer);
  }, [route.domain, route.step, uploadedFoodImage]);

  useEffect(() => {
    if (route.domain === "home" || route.step !== 1) return;
    setFoodJudgesReady(false);
    setFoodJudgesRevealed(false);
    const timer = window.setTimeout(() => {
      window.location.hash = hrefFor(route.domain, 2);
    }, 850);
    return () => window.clearTimeout(timer);
  }, [route]);

  useEffect(() => {
    if (route.domain === "home" || route.step !== 2 || foodJudgesReady) return;
    const timer = window.setTimeout(() => {
      const nextJudges = drawJudges(route.domain);
      setFoodJudges(nextJudges);
      setJudgeRevealOrder(drawRevealOrder(nextJudges.length));
      setFoodJudgesReady(true);
    }, 700);
    return () => window.clearTimeout(timer);
  }, [foodJudgesReady, route]);

  useEffect(() => {
    if (route.domain === "home" || route.step !== 2 || !foodJudgesReady) return;
    const timer = window.setTimeout(() => {
      setFoodJudgesRevealed(true);
    }, 1700);
    return () => window.clearTimeout(timer);
  }, [foodJudgesReady, route]);

  function redrawFoodJudges() {
    if (route.domain === "home") return;
    playUiBlip("shuffle");
    setFoodJudgesReady(false);
    window.setTimeout(() => {
      const nextJudges = drawJudges(route.domain);
      setFoodJudges(nextJudges);
      setJudgeRevealOrder(drawRevealOrder(nextJudges.length));
      setFoodJudgesReady(true);
    }, 550);
  }

  function handleFoodUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const targetDomain = route.domain === "home" ? "food" : route.domain;
    const url = URL.createObjectURL(file);
    const mediaKind: UploadedMediaKind = file.type.startsWith("audio/")
      ? "audio"
      : file.type.startsWith("video/")
        ? "video"
        : "image";
    setUploadedFoodName(file.name);
    setUploadedMediaKind(mediaKind);
    setTasteComplete(false);
    setUploadedFoodAnalysis(inferDomainAnalysis(targetDomain, file.name));
    if (targetDomain === "food") {
      void analyzeFoodWithApi(file).then((analysis) => setUploadedFoodAnalysis(analysis));
    }
    if (uploadedAudioRef.current) {
      uploadedAudioRef.current.pause();
      uploadedAudioRef.current.src = "";
      uploadedAudioRef.current = null;
    }
    if (targetDomain === "music") {
      const audio = new Audio(url);
      audio.volume = 0.85;
      uploadedAudioRef.current = audio;
      void audio.play().catch(() => undefined);
      window.setTimeout(() => {
        if (uploadedAudioRef.current === audio) audio.pause();
      }, 5000);
    }
    setUploadedFoodImage((previous) => {
      if (previous) URL.revokeObjectURL(previous);
      return url;
    });
    window.location.hash = hrefFor(targetDomain, 3);
  }

  function commitWritingText() {
    const cleanText = writingText.trim();
    if (!cleanText || route.domain !== "writing") return;
    setTasteComplete(false);
    showFoodToast("细品中……", 2240);
    setUploadedFoodAnalysis({
      cues: `用户写下了${cleanText.slice(0, 14)}`,
      kind: "文学作品",
      source: "local",
    });
    window.setTimeout(() => {
      setFoodFunnyFaces({});
      const revealOrder = drawFunnyRevealOrder(foodJudges);
      showFoodToast("等待评委变脸中...", revealOrder.length * 1000 + 900);
      revealOrder.forEach((judgeIndex, revealIndex) => {
        window.setTimeout(() => {
          const judge = foodJudges[judgeIndex] || writingJudgePool[judgeIndex] || foodJudgePool[judgeIndex];
          playUiBlip("face");
          foodBubbleIdRef.current += 1;
          const funnyFace = drawFunnyFaceForJudge(judge, foodBubbleIdRef.current);
          if (!funnyFace) return;
          setFoodFunnyFaces((current) => ({ ...current, [judgeIndex]: funnyFace }));
        }, (revealIndex + 1) * 1000);
      });
      window.setTimeout(() => {
        setTasteComplete(true);
        playUiBlip("whoosh");
        showFoodToast("点击评委头像，请求评委锐评", 2600);
        window.location.hash = hrefFor("writing", 4);
      }, (revealOrder.length + 1) * 1000 + 520);
    }, 2000);
  }

  async function triggerJudgeCritique(index: number) {
    primeCritiqueVoice();
    foodBubbleIdRef.current += 1;
    const critiqueDomain = route.domain === "home" ? "food" : route.domain;
    const judge = foodJudges[index] || judgePoolsByDomain[critiqueDomain]?.[index] || foodJudgePool[index];
    const bubbleId = foodBubbleIdRef.current;
    const generatedText = await requestDeepSeekText({
      analysis: uploadedFoodAnalysis,
      domain: critiqueDomain,
      judge,
      purpose: "critique",
      writingText,
    });
    const text = generatedText || pickCritiqueLine(judge, uploadedFoodAnalysis, critiqueDomain);
    setFoodJudgeBubbles((current) => [
      ...current,
      {
        id: bubbleId,
        judgeId: judge.id,
        projectile: pickProjectile(),
        slot: index,
        text,
      },
    ]);
  }

  async function handleDownloadCritique() {
    playUiBlip("download");
    showFoodToast("正在生成锐评记录...");
    try {
      const comments =
        foodJudgeBubbles.length > 0
          ? foodJudgeBubbles
          : foodJudges.map((judge, index) => ({
              id: index,
              judgeId: judge.id,
              projectile: pickProjectile(),
              slot: index,
              text: pickCritiqueLine(judge, uploadedFoodAnalysis, route.domain === "home" ? "food" : route.domain),
            }));
      const maxCommentRows = Math.max(1, ...foodJudges.map((judge) => comments.filter((comment) => comment.judgeId === judge.id).length));
      const commentsTop = 856;
      const commentRowHeight = 128;
      const footerTop = commentsTop + maxCommentRows * commentRowHeight + 92;
      const canvas = document.createElement("canvas");
      canvas.width = 900;
      canvas.height = Math.max(1280, footerTop + 90);
      const context = canvas.getContext("2d");
      if (!context) throw new Error("无法创建下载画布");

      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "#000000";
      context.textAlign = "center";
      context.font = "64px 'Covered By Your Grace', sans-serif";
      context.fillText(route.domain === "writing" ? "Literary Review Scene" : "On-site Culinary Critique", canvas.width / 2, 104);

      context.strokeStyle = "#000000";
      context.lineWidth = 4;
      context.strokeRect(170, 145, 560, 430);
      if (route.domain === "writing") {
        context.fillStyle = "#fffdf8";
        context.fillRect(205, 188, 490, 300);
        context.strokeStyle = "#050505";
        context.lineWidth = 5;
        context.strokeRect(205, 188, 490, 300);
        context.font = "30px 'Varela Round', sans-serif";
        context.fillStyle = "#000000";
        context.textAlign = "left";
        const lines = wrapCanvasText(context, writingText.trim() || "开始写作", 400, 5);
        lines.forEach((line, index) => context.fillText(line, 250, 260 + index * 42));
        context.textAlign = "center";
      } else if (uploadedFoodImage) {
        const workImage = await tryLoadCanvasImage(uploadedFoodImage);
        if (workImage) {
          drawContainImage(context, workImage, 190, 165, 520, 390);
        } else {
          context.font = "34px 'Federo', sans-serif";
          context.fillStyle = "#000000";
          context.textAlign = "center";
          context.fillText("作品图片读取失败", canvas.width / 2, 350);
          context.font = "24px 'Federo', sans-serif";
          context.fillText("但锐评记录仍然成功封存。", canvas.width / 2, 400);
        }
      } else {
        context.font = "34px 'Federo', sans-serif";
        context.fillStyle = "#000000";
        context.textAlign = "center";
        context.fillText("尚未上传作品", canvas.width / 2, 350);
        context.font = "24px 'Federo', sans-serif";
        context.fillText("评委已先行开喷，作品正在赶来的路上。", canvas.width / 2, 400);
      }

      await Promise.all(
        foodJudges.map(async (judge, index) => {
          const x = 96 + index * 270;
          const avatar = await tryLoadCanvasImage(foodFunnyFaces[index]?.src || judge.src);
          if (avatar) {
            drawContainImage(context, avatar, x, 620, 170, 170);
          } else {
            context.save();
            context.fillStyle = "#111111";
            context.beginPath();
            context.arc(x + 85, 690, 54, 0, Math.PI * 2);
            context.fill();
            context.fillRect(x + 36, 744, 98, 40);
            context.restore();
          }
          context.font = "24px 'Varela Round', sans-serif";
          context.textAlign = "center";
          context.fillStyle = "#000000";
          context.fillText(judge.name, x + 85, 830);

          const judgeComments = comments.filter((comment) => comment.judgeId === judge.id);
          await Promise.all(
            judgeComments.map(async (comment, commentIndex) => {
              const bubbleImage = await tryLoadCanvasImage(critiqueBubbleAssets[comment.slot] || foodFrame04BubbleOne);
              const bubbleX = x - 22;
              const bubbleY = commentsTop + commentIndex * commentRowHeight;
              if (bubbleImage) {
                drawContainImage(context, bubbleImage, bubbleX, bubbleY, 224, 116);
              } else {
                drawFallbackBubble(context, bubbleX, bubbleY + 4, 224, 108, comment.slot === 2 ? "right" : "left");
              }
              drawCenteredBubbleText(context, comment.text, bubbleX + 112, bubbleY + 53, 18, 148, 4);
            }),
          );
        }),
      );

      context.textAlign = "center";
      context.font = "28px 'Federo', sans-serif";
      context.fillText("锐评记录已封存，作品暂未提出上诉。", canvas.width / 2, footerTop);

      const fileName = `锐评家-锐评记录-${Date.now()}.png`;
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((result) => {
          if (result) resolve(result);
          else reject(new Error("无法生成图片文件"));
        }, "image/png");
      });
      const filePickerWindow = window as typeof window & {
        showSaveFilePicker?: (options: {
          suggestedName: string;
          types: Array<{ accept: Record<string, string[]>; description: string }>;
        }) => Promise<{ createWritable: () => Promise<{ close: () => Promise<void>; write: (blob: Blob) => Promise<void> }> }>;
      };

      if (filePickerWindow.showSaveFilePicker && window.isSecureContext) {
        showFoodToast("请选择保存位置");
        try {
          const handle = await filePickerWindow.showSaveFilePicker({
            suggestedName: fileName,
            types: [{ accept: { "image/png": [".png"] }, description: "PNG 图片" }],
          });
          const writable = await handle.createWritable();
          await writable.write(blob);
          await writable.close();
          showFoodToast("锐评记录已保存到所选位置");
          return;
        } catch (error) {
          if (error instanceof DOMException && error.name === "AbortError") {
            showFoodToast("已取消保存", 1600);
            return;
          }
          downloadBlobWithAnchor(blob, fileName);
          showFoodToast("已改用浏览器默认下载");
          return;
        }
      } else {
        downloadBlobWithAnchor(blob, fileName);
        showFoodToast("锐评记录已下载到默认下载目录");
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        showFoodToast("已取消保存", 1600);
        return;
      }
      showFoodToast("下载失败，请再点一次", 2400);
    }
  }

  const flow = useMemo(() => (route.domain === "home" ? null : flowByDomain.get(route.domain)), [route]);
  const acceptDisclaimer = () => {
    setDisclaimerAccepted(true);
  };

  return (
    <main className="flex min-h-screen justify-center bg-[#e9e3d8] p-0 text-black sm:p-6">
      {!flow || route.domain === "home" ? <HomeScreen /> : null}
      {flow && route.domain !== "home" ? (
        <FoodFlowScreen
          activeJudgeBubbles={foodJudgeBubbles}
          bombImpactCount={foodBombImpactCount}
          escapeText={escapeText}
          fileInputRef={fileInputRef}
          flow={flow}
          foodModal={foodModal}
          foodToast={foodToast}
          funnyFaces={foodFunnyFaces}
          judges={foodJudges}
          judgesReady={foodJudgesReady}
          judgesRevealed={foodJudgesRevealed}
          isTasting={route.step === 3 && !tasteComplete}
          judgeRevealOrder={judgeRevealOrder}
          magicAdviceText={magicAdviceText}
          magicJudgeIndex={magicJudgeIndex}
          onDownloadCritique={handleDownloadCritique}
          onEscapeClick={() => {
            setEscapeText(pickEscapeRoast());
            setFoodModal("escape");
          }}
          onJudgeStickerClick={triggerJudgeCritique}
          onWritingTextChange={setWritingText}
          onWritingTextCommit={commitWritingText}
          onWritingTextEdit={() => {
            playUiBlip("upload");
            window.location.hash = hrefFor("writing", 3);
          }}
          onStartCritique={(index) => {
            playUiBlip("whoosh");
            pendingCritiqueIndexRef.current = index;
            window.location.hash = hrefFor(flow.domain, 4);
          }}
          onMagicClick={() => {
            playUiBlip("magic");
            setMagicJudgeIndex(null);
            setMagicAdviceText("");
            setFoodModal("magic-select");
          }}
          onModalClose={() => setFoodModal(null)}
          onModalEscape={() => {
            setFoodModal(null);
            window.location.hash = "#home";
          }}
          onSelectMagicJudge={(index) => {
            playUiBlip("magic");
            const judge = foodJudges[index] || null;
            const fallbackAdvice = buildMagicAdvice(judge, uploadedFoodAnalysis.kind, flow.domain);
            setMagicJudgeIndex(index);
            setMagicAdviceText(fallbackAdvice);
            setFoodModal("magic-result");
            if (flow.domain === "music") {
              showFoodToast("正在播放魔性魔改版本", 1800);
              playMagicRemix(`${judge?.name || "评委"}${uploadedFoodAnalysis.kind}${fallbackAdvice}`);
            }
            void requestDeepSeekText({
              analysis: uploadedFoodAnalysis,
              domain: flow.domain,
              judge,
              purpose: "magic",
              writingText,
            }).then((text) => {
              if (text) setMagicAdviceText(text);
            });
          }}
          onBombExplode={() => setFoodBombImpactCount((current) => current + 1)}
          onShuffle={redrawFoodJudges}
          onUpload={handleFoodUpload}
          step={route.step}
          uploadedFoodKind={uploadedFoodAnalysis.kind}
          uploadedImage={uploadedFoodImage}
          uploadedMediaKind={uploadedMediaKind}
          writingText={writingText}
        />
      ) : null}
      {!disclaimerAccepted ? <DisclaimerModal onAccept={acceptDisclaimer} /> : null}
    </main>
  );
}

export default App;
