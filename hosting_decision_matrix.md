# One-Domain Hosting Decision Matrix

## Goal

Use one public domain for the portfolio, keep cost low or free where possible, and make the site open reliably in Hong Kong and Shenzhen/Mainland China without VPN.

Current state:

- The static package is ready.
- `npm run predeploy:china` passes.
- Latest deploy package is about 8.19 MB uncompressed and about 6.90 MB zipped.
- Actual goal completion still requires a real domain, real hosting, and Hong Kong/Shenzhen no-VPN testing.

## Recommendation

Start with this order:

1. **Tencent EdgeOne Pages, global availability zone excluding Chinese mainland, custom domain.**
2. **Hong Kong object storage static hosting, preferably Tencent COS HK or Alibaba OSS HK, custom domain.**
3. **If Shenzhen is unstable, keep the same domain but move to ICP plus Mainland static hosting/CDN.**

Do not use Vercel, Netlify, GitHub Pages, or Cloudflare Pages as the only official interview link for Shenzhen.

## Candidate Matrix

| Candidate | Cost Direction | One Domain | Hong Kong | Shenzhen/Mainland | ICP | Verdict |
|---|---:|---|---|---|---|---|
| EdgeOne Pages, global excluding Mainland | Free/low | Yes | Likely good | Must test with custom domain | Not required for global excluding Mainland | Best first test |
| EdgeOne Pages, Mainland or global including Mainland | Free/low if available | Yes | Good | Better target | Required | Good only after ICP |
| Tencent COS Hong Kong static website | Low pay-as-you-go | Yes | Good | Cross-border, must test | Not required if not Mainland/CDN Mainland | Good second test |
| Alibaba OSS Hong Kong static website | Low pay-as-you-go | Yes | Good | Cross-border, must test | Not required if bucket is Hong Kong and no Mainland CDN | Good second test |
| Cloudflare Pages | Free | Yes | Usually good | Not reliable enough | China Network requires ICP/enterprise path | Not main link |
| Vercel | Free/low | Yes | Usually good | Not reliable enough | No Mainland hosting support | Not main link |
| Mainland static hosting/CDN | Low/medium | Yes | Usually OK | Best stability | Required | Final stable route |

## First Test Path: EdgeOne Pages

Use this if the priority is free or almost free.

Steps:

1. Run `npm run package:china`.
2. Use the generated `release/<package>/dist/` as the static output.
3. Create an EdgeOne Pages project.
4. Select a region that does not require ICP if no ICP filing exists yet: global availability zone excluding Chinese mainland.
5. Bind one custom domain.
6. Enable HTTPS.
7. Run `npm run verify:domain -- https://your-domain.example --report release/domain-check.json --markdown release/domain-check.md`.
8. Run `npm run verify:url -- https://your-domain.example --repeat 5 --interval 2000 --report release/live-domain-check.json --markdown release/live-domain-check.md`.
9. Test the same domain from Hong Kong without VPN.
10. Test the same domain from Shenzhen/Mainland China without VPN.

Decision gate:

- If Hong Kong and Shenzhen both open quickly and repeatedly, keep this path.
- If Shenzhen returns 401, fails, or is unstable, do not keep tuning blindly; move to Hong Kong object storage or ICP/Mainland route.

## Second Test Path: Hong Kong Object Storage

Use this if EdgeOne excluding Mainland is unstable from Shenzhen, or if a simple object-storage origin is preferred.

Options:

- Tencent COS Hong Kong static website hosting.
- Alibaba OSS Hong Kong static website hosting.

Steps:

1. Run `npm run package:china`.
2. Upload the contents of `release/<package>/dist/` to the bucket.
3. Enable static website hosting.
4. Set `index.html` as the index document.
5. Set `404.html` as the error document if supported.
6. Bind one custom domain.
7. Enable HTTPS certificate for that domain.
8. Run `npm run verify:domain -- https://your-domain.example --report release/domain-check.json --markdown release/domain-check.md`.
9. Run `npm run verify:url -- https://your-domain.example --repeat 5 --interval 2000 --report release/live-domain-check.json --markdown release/live-domain-check.md`.
10. Test from Hong Kong and Shenzhen without VPN.

Decision gate:

- If Shenzhen is stable enough for interviews, keep it.
- If Shenzhen remains slow or unreliable, use ICP plus Mainland static hosting/CDN.

## Final Stable Route: ICP + Mainland Static Hosting/CDN

Use this when Shenzhen stability is mandatory.

Steps:

1. Keep the same public domain.
2. Complete ICP filing for the domain.
3. Deploy the same static `dist/` package to Mainland static hosting, object storage, or CDN.
4. Keep the Hong Kong/global endpoint as a backup or regional route if needed.
5. Run `npm run verify:domain -- https://your-domain.example --report release/domain-check.json --markdown release/domain-check.md`.
6. Run `npm run verify:url -- https://your-domain.example --repeat 5 --interval 2000 --report release/live-domain-check.json --markdown release/live-domain-check.md`.
7. Verify from Hong Kong and Shenzhen without VPN.

This is the most reliable route, but it is not the fastest or lowest-friction path.

## Completion Evidence Required

The goal is not complete until all of the following are true:

- One public domain is bound.
- The domain uses HTTPS.
- `cmd /c npm run verify:release -- --latest` passes for the uploaded release package.
- `cmd /c npm run verify:domain -- https://your-domain.example --report release/domain-check.json --markdown release/domain-check.md` passes.
- `cmd /c npm run verify:url -- https://your-domain.example --repeat 5 --interval 2000 --report release/live-domain-check.json --markdown release/live-domain-check.md` passes.
- Hong Kong no-VPN test passes.
- Shenzhen/Mainland no-VPN test passes repeatedly.
- The public URL does not rely on Vercel/Cloudflare/GitHub default preview domains.
- The automated and manual results are recorded in `deployment_verification_log.md`.
- `cmd /c npm run generate:evidence -- --url https://your-domain.example --output deployment_evidence.json` has created the evidence scaffold.
- `cmd /c npm run verify:launch-goal -- --evidence deployment_evidence.json` passes after the scaffold is filled with the real launch evidence.

## Sources Checked

- EdgeOne Pages custom domain ICP requirement: https://pages.edgeone.ai/document/custom-domain
- EdgeOne Pages domain overview: https://pages.edgeone.ai/document/domain-overview
- EdgeOne Pages error codes: https://pages.edgeone.ai/document/error-codes
- Cloudflare China Network FAQ: https://developers.cloudflare.com/china-network/faq/
- Cloudflare China Network ICP: https://developers.cloudflare.com/china-network/concepts/icp/
- Alibaba Cloud OSS static website hosting: https://www.alibabacloud.com/help/en/oss/user-guide/hosting-static-websites
- Alibaba Cloud OSS custom domain: https://www.alibabacloud.com/help/en/oss/user-guide/access-buckets-via-custom-domain-names
- Tencent COS static website hosting: https://intl.cloud.tencent.com/document/product/436/30958
- Tencent COS custom origin domain: https://www.tencentcloud.com/document/product/436/40699
