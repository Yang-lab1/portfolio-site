# China / Hong Kong Live Verification Log

Use this file after a real custom domain is bound. Do not mark the deployment goal complete until the automated URL check and the two no-VPN regional checks are recorded.

## Domain

- Public domain:
- Hosting provider:
- Hosting region / availability zone:
- HTTPS enabled:
- Package used:
- Verification date:

## Automated Check

Release package command:

```powershell
cmd /c npm run verify:release -- --latest
```

Result:

- Pass / fail:
- Release folder:
- Zip package:
- Notes:

Domain readiness command:

```powershell
cmd /c npm run verify:domain -- https://your-domain.example --report release/domain-check.json --markdown release/domain-check.md
```

Result:

- Pass / fail:
- JSON report:
- Markdown report:
- Notes:

Live URL command:

```powershell
cmd /c npm run verify:url -- https://your-domain.example --repeat 5 --interval 2000 --report release/live-domain-check.json --markdown release/live-domain-check.md
```

Result:

- Pass / fail:
- JSON report:
- Markdown report:
- Notes:

## Machine-Readable Completion Gate

After the checks above pass, generate `deployment_evidence.json`, fill in the real Hong Kong/Shenzhen evidence values, then run:

```powershell
cmd /c npm run generate:evidence -- --url https://your-domain.example --output deployment_evidence.json
```

```powershell
cmd /c npm run verify:launch-goal -- --evidence deployment_evidence.json
```

This command must pass before the deployment goal can be treated as complete.

## Hong Kong No-VPN Check

- Tester / device:
- Network / ISP:
- VPN disabled: yes / no
- Time tested:
- Result: pass / fail
- Approximate first load time:
- Screenshots or screen recording:
- Notes:

## Shenzhen / Mainland No-VPN Check

- Tester / city:
- Network / ISP:
- VPN disabled: yes / no
- Time tested:
- Result: pass / fail
- Approximate first load time:
- Repeated opens passed: yes / no
- Screenshots or screen recording:
- Notes:

## Decision

- Keep current hosting:
- Move to Hong Kong object storage:
- Move to ICP + Mainland static hosting/CDN:
- Reason:
