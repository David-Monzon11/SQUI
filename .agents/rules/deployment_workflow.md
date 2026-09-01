# Mandated Git Push & EAS Deployment Workflow

All AI agents and developers working on SQUI must strictly follow this two-step deployment rule whenever code, UI, asset, or configuration changes are made:

## Step 1: ALWAYS Push to GitHub `main` First
Immediately after code changes are verified, stage, commit, and push directly to `origin main`:
```bash
git add .
git commit -m "Descriptive summary of changes"
git push origin main
```

## Step 2: Publish EAS Updates to BOTH `preview` and `production` Channels
Right after pushing to `origin main`, publish EAS updates to **BOTH** channels so all mobile devices (preview APKs and production builds) receive updates instantly without channel mismatch issues:
```bash
npx eas-cli update --branch preview --message "Descriptive summary of changes"
npx eas-cli update --branch production --message "Descriptive summary of changes"
```
