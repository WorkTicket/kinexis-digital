import sharp from "sharp";

const posts = [
  ["how-to-ask-for-google-reviews-contractor", "Ask for Google reviews", "#f97316"],
  ["missed-call-text-delayed-10dlc", "Why texts get delayed", "#2563eb"],
  ["google-business-profile-vs-website", "GBP vs website", "#031b4e"],
  ["freelancer-vs-agency-vs-subscription-website", "Freelancer vs agency", "#ea580c"],
  ["wix-vs-squarespace-vs-managed-website-contractors", "DIY vs managed site", "#1d4ed8"],
];

for (const [slug, label, accent] of posts) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#031b4e"/>
        <stop offset="100%" stop-color="#0a3a7a"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="675" fill="url(#g)"/>
    <rect x="64" y="64" width="180" height="18" fill="${accent}"/>
    <text x="64" y="180" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="54" font-weight="700">Kinexis Digital</text>
    <text x="64" y="270" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="42" font-weight="700">${label}</text>
    <text x="64" y="340" fill="#c7d7ff" font-family="Arial, Helvetica, sans-serif" font-size="28">Practical guides for service businesses</text>
    <rect x="64" y="520" width="220" height="64" fill="${accent}"/>
    <text x="90" y="562" fill="#031b4e" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="700">Blog guide</text>
  </svg>`;
  await sharp(Buffer.from(svg)).webp({ quality: 86 }).toFile(`public/blog/${slug}.webp`);
  console.log("wrote", slug);
}
