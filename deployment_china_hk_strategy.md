# Portfolio China / Hong Kong Deployment Strategy

## Goal

Make the portfolio reachable from both Mainland China, especially Shenzhen interview scenarios, and Hong Kong, while keeping the public experience as one clean domain.

This document is a strategy note only. No deployment has been performed.

## Main Conclusion

There is no fully guaranteed combination of:

- one public domain
- free or near-free hosting
- stable Mainland China access
- stable Hong Kong access
- no ICP filing

The lowest-cost practical path is:

1. Keep the site as a fully static Vite build.
2. Use one custom domain.
3. Deploy the static `dist/` output to a Hong Kong origin or Hong Kong-friendly static host first.
4. Remove blocked third-party dependencies and optimize heavy media before launch.
5. If Shenzhen access must be reliable for interviews, later add ICP filing and move the same domain to Mainland static hosting/CDN or use GeoDNS behind the same public domain.

## Recommended Path

### Stage 1: Before The Site Is Finished

Do not deploy yet. Keep finishing the visual and interaction work locally.

Prepare for China-friendly deployment while building:

- Keep all fonts local or system-font based.
- Avoid Google Fonts, YouTube embeds, Google Analytics, unpkg/jsdelivr dependency loading, and other blocked or unstable third-party resources.
- Keep all portfolio images and videos under the site domain.
- Compress `hero-ribbon-loop.mp4` and large PNG assets before final deployment.
- Prefer WebP/JPG for large still images unless PNG transparency is required.
- Lazy-load non-hero detail images.

### Stage 2: First Low-Cost Public Version

Use one custom domain, for example `yourname.design`, and point it to a Hong Kong static hosting origin.

Good candidates:

- Hong Kong object storage + static website hosting.
- Hong Kong lightweight cloud server with Nginx.
- Hong Kong edge/static hosting provider with decent Mainland routing.
- EdgeOne Pages or EdgeOne acceleration, but only after checking the selected acceleration region and ICP requirement.

This is the most practical first step because:

- Hong Kong does not require Mainland ICP filing for the same reason a Mainland CDN/site does.
- It should open in Hong Kong.
- It is more likely to open in Shenzhen than Vercel-only, Cloudflare Pages-only, Netlify-only, or GitHub Pages-only.
- Cost can stay low because the portfolio is static and has no backend requirement.

Limits:

- This is not a hard guarantee for Mainland China speed or availability.
- Cross-border routing can still fluctuate.
- Final confidence must come from real Shenzhen network testing.

### EdgeOne Candidate Note

Tencent EdgeOne / EdgeOne Pages is worth testing because it is closer to the China access problem than Vercel, Netlify, GitHub Pages, or Cloudflare Pages.

However, do not treat it as a no-ICP guarantee:

- EdgeOne Pages documentation says custom domains using the Chinese mainland availability zone or global availability zone including Chinese mainland must complete ICP registration first.
- If the project uses a global availability zone excluding Chinese mainland, no ICP filing is required, but that does not prove stable Mainland China access.

Therefore EdgeOne belongs in the candidate list, not the final guaranteed answer until the domain, region, ICP status, and Shenzhen network test are known.

### Stage 3: Stable Mainland Interview Version

If the website must be stable for Shenzhen interviews, use Mainland infrastructure.

That usually means:

- Complete ICP filing for the domain.
- Host the static build on Mainland object storage, Mainland static hosting, or Mainland CDN.
- Keep the same public domain.

This is the most stable route for Mainland users, but it costs more time and requires filing. It is not the fastest first launch path.

### Stage 4: One Domain With Regional Routing

If later the portfolio needs professional reliability in both regions, use the same public domain with regional routing:

- Mainland visitors route to Mainland static hosting/CDN.
- Hong Kong and overseas visitors route to Hong Kong or global hosting.

This can be done with GeoDNS or a CDN routing setup, but the Mainland side still needs the required ICP filing if it uses Mainland infrastructure.

The user-facing URL can remain one domain. The routing is hidden behind DNS/CDN.

## Why Not Vercel As The Main Link

Vercel is excellent for development and global previews, but it is not the safest main interview link for Mainland China.

Vercel's own documentation says it does not have Mainland China infrastructure or CDN nodes, and it cannot guarantee Mainland availability. A custom domain may help compared with a `.vercel.app` URL, but it does not change the underlying Mainland infrastructure limitation.

For Hong Kong, Vercel is usually more acceptable. For Shenzhen, it is a risk.

## Current Site Audit

Current project:

- `C:\Users\Yang\Documents\New project\portfolio-site`
- React + Vite static app.
- No backend requirement found.
- No required external runtime APIs found in the checked source files.
- No Google Fonts, gstatic, YouTube, unpkg, jsdelivr, or external CDN scripts found in the checked app source.

Main technical risk:

- Heavy media assets, especially `hero-ribbon-loop.mp4` and several large PNG files.
- These should be compressed before final deployment to improve Mainland/Hong Kong loading.

This means the current technical direction is suitable for a China-friendly static deployment, as long as the final build remains self-contained.

## Pre-Launch Checklist

- Run `npm run build`.
- Run `npm run audit:china`.
- When the site is close to launch, run `npm run predeploy:china` and treat any strict failure as a launch blocker.
- Run `npm run package:china` to generate a zip package and manifest under `release/`.
- Inspect the production build's network requests in the browser.
- Confirm all JS/CSS/image/video/font files load from the same domain or trusted China-friendly host.
- Compress hero video and large still images.
- Test on desktop and mobile.
- Test from Hong Kong network.
- Test from Shenzhen/Mainland network without VPN.
- After a public domain is bound, run `cmd /c npm run verify:url -- https://your-domain.example --repeat 5 --interval 2000 --report release/live-domain-check.json --markdown release/live-domain-check.md`.
- Also run `cmd /c npm run verify:domain -- https://your-domain.example --report release/domain-check.json --markdown release/domain-check.md` to separate DNS/TLS problems from app-content problems.
- Record the automated result plus Hong Kong and Shenzhen no-VPN checks in `deployment_verification_log.md`.
- Keep a local offline backup build for interview emergencies.

## Release Package Workflow

When the website is ready to test on a real domain:

1. Run `npm run package:china`.
2. Upload the contents of the generated `release/<package-name>/dist/` folder to the selected static host.
3. Bind one custom domain.
4. Run `cmd /c npm run verify:release -- --latest` before uploading the selected package.
5. Run `cmd /c npm run verify:domain -- https://your-domain.example --report release/domain-check.json --markdown release/domain-check.md`.
6. Run `cmd /c npm run verify:url -- https://your-domain.example --repeat 5 --interval 2000 --report release/live-domain-check.json --markdown release/live-domain-check.md`.
7. Record the result in `deployment_verification_log.md`.
8. Open the same domain from Hong Kong and Shenzhen/Mainland China without VPN.
9. Generate `deployment_evidence.json` with `cmd /c npm run generate:evidence -- --url https://your-domain.example --output deployment_evidence.json`, fill regional evidence, then run the launch gate.
8. If the Shenzhen test is unstable, keep the same domain and move to ICP plus Mainland static hosting/CDN or regional routing.

## Decision Recommendation

For this portfolio, use:

**One custom domain + EdgeOne Pages global excluding Mainland as the first free/low-cost test.**

If that is unstable from Shenzhen, use:

**One custom domain + Hong Kong object storage static hosting as the second low-cost test.**

Then, if Shenzhen interview reliability becomes critical:

**Use the same domain, complete ICP filing, and move or mirror the static build to Mainland hosting/CDN.**

This gives the lowest-cost near-term path without locking the project into a bad long-term deployment architecture.

The detailed candidate matrix is recorded in `hosting_decision_matrix.md`.

## Sources Checked

- Vercel Mainland China guidance: https://vercel.com/kb/guide/accessing-vercel-hosted-sites-from-mainland-china
- Cloudflare China Network ICP requirements: https://developers.cloudflare.com/china-network/concepts/icp/
- Alibaba Cloud CDN ICP filing requirement: https://www.alibabacloud.com/help/en/icp-filing/basic-icp-service/product-overview/use-alibaba-cloud-cdn
- EdgeOne Pages custom domain ICP requirement: https://pages.edgeone.ai/document/custom-domain
- EdgeOne Pages domain overview and acceleration regions: https://pages.edgeone.ai/document/domain-overview
- Hong Kong hosting and Mainland China caveats: https://www.chinafy.com/blog/is-hosting-a-website-in-hong-kong-the-same-as-china
