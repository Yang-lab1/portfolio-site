# One-Domain DNS / Hosting Template

Use this after selecting the real custom domain. Keep one public domain for the user-facing portfolio URL.

## Domain

- Public URL:
- Apex domain:
- Portfolio subdomain, if any:
- Registrar:
- DNS provider:
- Hosting provider:
- Hosting region / availability zone:
- ICP filing: none / pending / complete

## Preferred First Test: EdgeOne Pages

- Project name:
- Availability zone: global excluding Chinese mainland
- Custom domain added:
- Ownership verification record:
  - Type:
  - Name / Host:
  - Value:
  - TTL:
- Production CNAME record:
  - Type: CNAME
  - Name / Host:
  - Value:
  - TTL:
- HTTPS status:
- Notes:

## Fallback: Hong Kong Object Storage

- Provider: Tencent COS HK / Alibaba OSS HK
- Bucket region:
- Bucket name:
- Static website endpoint:
- Custom domain target:
- Index document: `index.html`
- Error document: `404.html`
- HTTPS certificate status:
- CDN enabled: no, unless ICP is complete
- Notes:

## Verification

Run after DNS and HTTPS are active:

```powershell
npm run verify:domain -- https://your-domain.example --report release/domain-check.json --markdown release/domain-check.md
```

```powershell
npm run verify:url -- https://your-domain.example --repeat 5 --interval 2000 --report release/live-domain-check.json --markdown release/live-domain-check.md
```

Then complete `deployment_verification_log.md`.
