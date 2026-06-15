# Restore And Handoff

## Restore On A New Machine

```bash
git clone https://github.com/Yang-lab1/portfolio-site.git
cd portfolio-site
npm install
npm run build
npm run dev
```

No files from the original workstation are required to build the current website.

## Continue Development With Another AI

Give the agent:

- Repository: `https://github.com/Yang-lab1/portfolio-site`
- Production site: `https://portfolio-site-three-rose.vercel.app`

Ask it to read:

1. `AGENTS.md`
2. `README.md`
3. `agent_memory/context.md`
4. `agent_memory/progress.md`
5. `agent_memory/bugs.md`
6. `task_plan.md`
7. `findings.md`
8. `progress.md`
9. `CHANGELOG.md`

The agent should work from `main`, create commits for each coherent change and push
the resulting history to GitHub.

## Environment And Platform State

Git does not store account sessions or secrets.

The following must remain configured in their platforms:

- GitHub write permission for pushing commits
- Vercel project access and Git integration
- Supabase URL and publishable key, if Supabase is enabled

Never commit passwords, personal access tokens, service-role keys or `.env.local`.

## Historical Material

Pre-Git build snapshots and QA evidence are in `archive/`.

The first source-level Git history starts at `v1.0-handoff`. Earlier artifacts can show
what a build looked like, but they cannot provide line-by-line source history.

See `docs/PRIVATE_ARCHIVE_MANIFEST.md` before deleting the original workstation folders.
