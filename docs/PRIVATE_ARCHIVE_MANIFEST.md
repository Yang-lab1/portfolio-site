# Private Archive Manifest

The public repository is sufficient to build and continue the current website.

The following historical or private material remains outside the public repository and
must not be deleted until it is copied to a private repository or other secure cloud
storage.

## Sensitive Recovery Records

- original thread conversation export
- tool-event inventory
- recovery planning notes that contain personal contact information
- CV originals and account-specific documents

These records are not required for normal website development because their durable
decisions have already been summarized in `agent_memory/`, `task_plan.md`,
`findings.md` and `progress.md`.

## Third-Party Reference Material

- Aircenter reference recording
- downloaded reference-site captures that may not permit public redistribution

These may be retained privately for visual comparison but should not be published as
project assets.

## Full Editable Design Workspaces

The complete Miro, Pai Li Shi, semester and other design workspaces are much larger than
the portfolio repository and may contain package dependencies, caches, licensed assets,
personal files and individual files over GitHub's normal size limit.

The portfolio already contains the selected exported images needed by the website.
Archive complete editable workspaces separately only if future case-study editing needs
their original source files.

## Recommended Private Repository

Create a private repository named:

`portfolio-site-private-archive`

Before uploading:

1. remove `node_modules`, build caches and temporary output
2. remove passwords, tokens, cookies and `.env` files
3. keep original source documents, approved reference captures and sensitive recovery notes
4. use Git LFS or secure cloud object storage for files larger than 100MB
5. add a manifest with source paths, dates, sizes and SHA-256 hashes

