# forge

Build .NET security tools with GitHub Actions. Browse and download builds from the web UI.

## Quick start

1. Go to the **Build** page, enter a repo URL, and run
2. Find your builds on the **Runs** page
3. Download releases from the **Packages** page

## One-off builds

Use the **Build** page at `/build`. Enter a GitHub repo URL and optionally set a specific branch/tag, project path, or configuration. The workflow clones, restores, builds, and publishes a release.

## Batch builds

[`forge-test-all.yml`](.github/workflows/forge-test-all.yml) builds every enabled tool in [`tools/catalog.yml`](tools/catalog.yml). Useful for bulk validation.

## UI deployment

The Astro-based UI needs these Cloudflare bindings:

| Variable | Purpose |
|----------|---------|
| `FORGE_GITHUB_TOKEN` | PAT with `repo` and `workflow` scopes |
| `FORGE_GITHUB_REPO` | Backend repo in `owner/name` form |
| `FORGE_GITHUB_REF` | Git ref for workflow dispatch (usually `main`) |

## Layout

| Path | Purpose |
|------|---------|
| `.github/workflows/forge-build.yml` | Build workflow for one target |
| `.github/workflows/forge-test-all.yml` | Batch build for all catalog entries |
| `tools/catalog.yml` | Curated tool list for batch builds |
| `tools/profiles/` | Per-tool build overrides |
| `scripts/catalog_tool.py` | Catalog/profile resolver for workflows |
| `src/` | Astro web UI |
