import fs from "node:fs";
import path from "node:path";

const configPath = path.resolve("public/admin/config.yml");
const nextBaseUrl = process.argv[2];
const shouldClear = nextBaseUrl === "--clear";

if (!fs.existsSync(configPath)) {
  console.error("config.yml 파일을 찾을 수 없습니다:", configPath);
  process.exit(1);
}

if (!shouldClear && !nextBaseUrl) {
  console.error("사용법: npm run cms:auth:set -- https://your-worker.workers.dev");
  process.exit(1);
}

if (!shouldClear) {
  let parsed;

  try {
    parsed = new URL(nextBaseUrl);
  } catch {
    console.error("유효한 URL을 넣어주세요.");
    process.exit(1);
  }

  if (!/^https:$/.test(parsed.protocol)) {
    console.error("OAuth proxy URL은 https:// 로 시작해야 합니다.");
    process.exit(1);
  }
}

const original = fs.readFileSync(configPath, "utf8");
const siteDomain = "jhle0.github.io";
const baseUrlLine = shouldClear
  ? "  # base_url: https://your-auth-service.example.com"
  : `  base_url: ${nextBaseUrl}`;
const authEndpointLine = shouldClear
  ? "  # auth_endpoint: auth"
  : "  auth_endpoint: auth";

let updated = original.replace(
  /  (?:# )?base_url: .*?\n  (?:# )?auth_endpoint: .*?\n/,
  `${baseUrlLine}\n${authEndpointLine}\n`,
);

if (!/^\s+site_domain:/m.test(updated)) {
  updated = updated.replace(
    /  use_graphql: true\n/,
    `  use_graphql: true\n  site_domain: ${siteDomain}\n`,
  );
}

fs.writeFileSync(configPath, updated);

console.log(
  shouldClear
    ? "Decap CMS OAuth 설정을 주석 상태로 되돌렸습니다."
    : `Decap CMS OAuth base_url을 ${nextBaseUrl} 로 설정했습니다.`,
);
