# Archive

This directory preserves non-reproducible project history without relying on the
original workstation.

## Contents

- `legacy-builds/`: ten generated China/Hong Kong deployment snapshots.
- `qa-evidence/`: historical screenshots, contact sheets and JSON verification output.
- `source-assets/hero-video-candidates/`: user-generated Hero motion candidates.

## What Is Not Archived Here

The following are intentionally excluded:

- `node_modules`, browser binaries and package caches
- Vite build output that can be regenerated with `npm run build`
- Remotion output that can be regenerated from committed source frames
- local Vercel metadata and environment variables
- logs without historical value
- third-party reference recordings that should not be publicly redistributed
- conversation exports or personal documents containing phone numbers or other private data

Sensitive recovery material must be stored in a separate private repository or secure
cloud storage, never in this public repository.

## Verification

Run:

```powershell
Get-FileHash -Algorithm SHA256 archive\**\*
```

Compare the output with `archive/SHA256SUMS.txt`.

