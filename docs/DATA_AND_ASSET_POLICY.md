# Data And Asset Policy

## Single Source Of Truth

GitHub `main` is the authoritative source for the current website.

All future website source, selected portfolio imagery, reusable motion source, scripts,
design decisions and AI handoff notes must be committed and pushed.

## Commit To Git

- source code and configuration
- package lockfiles
- website-used images and videos
- editable motion source and source frames
- durable design and implementation documentation
- reproducible verification scripts
- concise QA evidence needed to explain a regression

## Do Not Commit

- dependencies and package caches
- generated `dist/`
- temporary browser output and routine logs
- local platform metadata
- passwords, tokens, private keys and `.env.local`
- third-party assets without redistribution permission
- private conversation exports or personal documents

## Large Historical Files

Binary snapshots and QA evidence are stored under `archive/`. New large artifacts
should be added only when they are non-reproducible and genuinely useful.

Avoid repeatedly committing regenerated binaries because Git preserves every copy and
repository size grows permanently.

## Original Design Projects

The complete Miro, Pai Li Shi, semester and other design-project workspaces contain
many gigabytes of dependencies, caches and unrelated source material. They are not
required to run this portfolio.

Only the selected, portfolio-relevant exported assets are committed here. If complete
editable project sources must also become cloud-independent, archive them separately
after removing dependencies, caches, secrets and licensed third-party content.

