# One-Domain Low-Cost Launch Runbook

## Objective

Use one public domain for the portfolio, keep cost as low as possible, and verify that the site opens in both Hong Kong and Shenzhen/Mainland China without VPN.

This runbook does not prove the goal by itself. The goal is only proven after the real domain is bound and the checks below pass.

## Current Package

- Project: `C:\Users\Yang\Documents\New project\portfolio-site`
- Latest package at time of writing: see the newest `release\portfolio-site-china-*.zip`
- Upload root inside package: `dist\`
- Current deploy size: about 8.19 MB uncompressed, about 6.90 MB zipped.

## Provider Test Order

### 1. First Test: EdgeOne Pages, Global Excluding Mainland

Use this first because it is the closest free/low-cost path to the target.

Detailed Chinese setup checklist: `edgeone_pages_setup_zh.md`.

Configuration:

- Availability zone / acceleration region: global excluding Chinese mainland.
- Custom domain: required for the real test.
- HTTPS: required.
- Upload/build output: `dist`.

Why:

- Official EdgeOne Pages docs say Mainland or global including Mainland requires ICP for custom domains.
- Global excluding Mainland does not require ICP, but Mainland access is not guaranteed.
- EdgeOne docs also say project/deployment preview domains can return 401 in Mainland scenarios; the custom domain is the meaningful test.

Stop condition:

- If Hong Kong passes but Shenzhen is unstable, do not keep tuning preview URLs. Move to Hong Kong object storage or ICP/Mainland route.

### 2. Second Test: Hong Kong Object Storage

Use this if EdgeOne excluding Mainland fails from Shenzhen or if the domain flow is easier through object storage.

Candidates:

- Tencent COS Hong Kong bucket with static website hosting.
- Alibaba OSS Hong Kong bucket with static website hosting.

Configuration:

- Upload `dist\` contents.
- Set `index.html` as index.
- Set `404.html` as error page or SPA fallback where supported.
- Bind the same custom domain.
- Enable HTTPS for that custom domain.
- Do not enable Mainland CDN unless the domain has ICP.

Why:

- Hong Kong object storage does not need Mainland ICP when not using Mainland CDN/hosting.
- It is low-cost pay-as-you-go for a small static portfolio.
- Shenzhen performance still depends on cross-border routing and must be tested.

### 3. Final Stable Route: ICP + Mainland Static Hosting/CDN

Use this if Shenzhen stability must be guaranteed.

Configuration:

- Keep the same public domain.
- Complete ICP filing for the apex domain.
- Deploy the same static package to Mainland object storage/static hosting/CDN.
- Optionally keep Hong Kong/global route as backup.

Why:

- Mainland infrastructure is the only route that can be treated as the stable Shenzhen target.
- It costs more time and may not be free, but it is the real answer if no-VPN Shenzhen reliability is mandatory.

## Verification Commands

Before upload, verify the local release folder and manifest:

```powershell
cmd /c npm run verify:release -- --latest
```

Run these after the custom domain is bound.

```powershell
cmd /c npm run verify:domain -- https://your-domain.example --report release/domain-check.json --markdown release/domain-check.md
```

```powershell
cmd /c npm run verify:url -- https://your-domain.example --repeat 5 --interval 2000 --report release/live-domain-check.json --markdown release/live-domain-check.md
```

Then fill in `deployment_verification_log.md` with:

- Domain and provider details.
- Automated domain readiness report.
- Automated live URL report.
- Hong Kong no-VPN check.
- Shenzhen/Mainland no-VPN repeated check.

Finally, generate `deployment_evidence.json`, fill any remaining Hong Kong/Shenzhen evidence fields with real values, and run:

```powershell
cmd /c npm run generate:evidence -- --url https://your-domain.example --output deployment_evidence.json
```

```powershell
cmd /c npm run verify:launch-goal -- --evidence deployment_evidence.json
```

## Cost Guardrails

- Keep the site static; do not introduce a backend unless the portfolio needs it.
- Keep media assets compressed before every release.
- Avoid Mainland CDN before ICP.
- Avoid Vercel, Netlify, GitHub Pages, and Cloudflare Pages as the only official Shenzhen interview link.
- Keep Vercel only as a development preview or emergency backup, not as the main Mainland-facing URL.

## Completion Gate

The goal is complete only when all of these are true:

- One custom domain is bound.
- HTTPS works on that domain.
- `cmd /c npm run verify:release -- --latest` passes for the package that is uploaded.
- `npm run verify:domain` passes against the domain.
- `npm run verify:url -- https://your-domain.example --repeat 5` passes against the domain.
- Hong Kong no-VPN access is recorded.
- Shenzhen/Mainland no-VPN repeated access is recorded.
- The result does not rely on default preview domains such as `vercel.app`, `pages.dev`, or provider-generated temporary URLs.
- `npm run verify:launch-goal -- --evidence deployment_evidence.json` passes.
