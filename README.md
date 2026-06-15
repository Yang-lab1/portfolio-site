# YANG Portfolio

杨林的工业设计、AI 交互、数字系统与 CMF 作品集。

## Online

- Production: https://portfolio-site-three-rose.vercel.app
- Repository: https://github.com/Yang-lab1/portfolio-site

## Development

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

## Project Structure

- `src/`: React/Vite website source
- `public/`: portfolio images and production Hero video
- `source-helix-frames/`: 25 source frames for the Hero helix
- `remotion-hero/`: Remotion source used to render Hero motion assets
- `supabase/`: optional Supabase health-check scaffold and setup notes
- `tools/`: build, deployment and verification scripts
- `archive/`: historical builds, QA evidence and non-reproducible source assets
- `docs/`: restoration, handoff and repository data policies
- `task_plan.md`, `findings.md`, `progress.md`: implementation history and current decisions
- `agent_memory/`: compact project context, progress and known risks for AI handoff

## Hero Video

Render the Hero video from the committed source frames:

```bash
npm run render:helix
```

To render from another frame directory:

```bash
npm run render:helix -- --input "C:\path\to\frames"
```

## Current Status

- The public Vercel deployment is live.
- The Aircenter-inspired homepage, project showcases, detail pages, language switch and Agent entry are implemented.
- Supabase code is scaffolded but not connected because production environment variables are not configured.
- Required Supabase variables are documented in `supabase/README.md`.

## AI Handoff

Before changing visual behavior, read:

1. `AGENTS.md` from the workspace if available
2. `agent_memory/context.md`
3. `agent_memory/progress.md`
4. `agent_memory/bugs.md`
5. `task_plan.md`
6. `findings.md`

Preserve the original product form in any image edit. Product structure, color, material and proportions must not be changed.

For a clean-machine restore and AI handoff, read `docs/RESTORE_AND_HANDOFF.md`.
For storage boundaries and local-dependency rules, read `docs/DATA_AND_ASSET_POLICY.md`.
