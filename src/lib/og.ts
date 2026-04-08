type OgOptions = {
  title: string;
  subtitle: string;
  meta: string;
};

const escapeXml = (text: string) =>
  text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

export const createOgSvg = ({ title, subtitle, meta }: OgOptions) => {
  const safeTitle = escapeXml(title);
  const safeSubtitle = escapeXml(subtitle);
  const safeMeta = escapeXml(meta);

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="${safeTitle}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f6f4ef"/>
      <stop offset="100%" stop-color="#ece7db"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="56" y="56" width="1088" height="518" rx="32" fill="#fffdf8" stroke="#d7cfbf" stroke-width="2"/>
  <text x="96" y="140" fill="#1f4d3f" font-size="30" font-family="Georgia, 'Noto Serif KR', serif" font-weight="700">${safeMeta}</text>
  <foreignObject x="96" y="180" width="1008" height="260">
    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: Georgia, 'Noto Serif KR', serif; color:#171717; font-size:58px; line-height:1.18; font-weight:700; letter-spacing:-0.02em; word-break:keep-all;">
      ${safeTitle}
    </div>
  </foreignObject>
  <text x="96" y="500" fill="#67645c" font-size="30" font-family="Georgia, 'Noto Serif KR', serif">${safeSubtitle}</text>
  <text x="96" y="550" fill="#171717" font-size="26" font-family="Georgia, 'Noto Serif KR', serif">jhle0.dev</text>
</svg>`.trim();
};
