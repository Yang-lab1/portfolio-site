# Portfolio Site Agent Guide

## Communication

- Default to Chinese when working with the owner.
- Do not claim a task is complete until the relevant build and browser behavior have been verified.

## Start Here

Before non-trivial work, read:

1. `agent_memory/context.md`
2. `agent_memory/progress.md`
3. `agent_memory/bugs.md`
4. `task_plan.md`
5. `findings.md`
6. `progress.md`

Update the memory and planning files after a completed phase, a direction change, or a failed attempt that future agents should not repeat.

## Product And Visual Constraints

- The homepage follows an Aircenter-inspired white, black and light-gray visual system.
- Match approved references closely. Do not add explanatory headings, controls or decorative elements that were not requested.
- The Hero collected wordmark must use the four original `YANG` letter nodes. Do not add a second wordmark layer.
- The desktop product showcase displays exactly three separated cards: the center card is largest and the two side cards use shallow perspective with partial viewport cropping.
- Preserve the black `YANG` footer wordmark in both Chinese and English modes.
- Chinese typography must not become oversized or wrap awkwardly.

## Image Editing

- Preserve the original product form exactly.
- Do not change product structure, color, material, proportions or visible design details.
- AI/image edits may only change background, scene, lighting, crop and presentation.
- If the source views are insufficient for a new angle, request more source images instead of inventing the product.

## Development

```bash
npm install
npm run dev
npm run build
```

The public production site is:

https://portfolio-site-three-rose.vercel.app

The Hero source frames are committed in `source-helix-frames/`. The Remotion source is in `remotion-hero/`.

## Known External Blocker

Supabase is scaffolded but not connected. Do not mark it connected until valid variables are configured and `npm run verify:supabase` reports success. See `supabase/README.md`.
