#!/usr/bin/env bash
# Create github.com/<you>/clarixeducationnew, set origin, and push main.
# Requires either: GITHUB_TOKEN (PAT with "repo" scope) OR logged-in `gh` (brew install gh; gh auth login).
set -euo pipefail

REPO_NAME="${1:-clarixeducationnew}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if ! git rev-parse --git-dir >/dev/null 2>&1; then
  echo "No git repository at $ROOT" >&2
  exit 1
fi

have_gh() { command -v gh >/dev/null 2>&1 && gh auth status >/dev/null 2>&1; }

if have_gh; then
  echo "Using authenticated GitHub CLI..."
  OWNER="$(gh api user -q .login)"
  FULL="${OWNER}/${REPO_NAME}"
  git remote remove origin 2>/dev/null || true
  if gh repo view "$FULL" >/dev/null 2>&1; then
    echo "Repo $FULL already exists on GitHub; pushing..."
    git remote add origin "https://github.com/${FULL}.git"
  else
    gh repo create "$REPO_NAME" --public --source="$ROOT" --remote=origin
  fi
  git push -u origin main
  echo "https://github.com/${FULL}"
  exit 0
fi

if [[ -z "${GITHUB_TOKEN:-}" ]]; then
  echo "No GitHub authentication found." >&2
  echo "Option A: Install and log in:  brew install gh && gh auth login" >&2
  echo "Option B: Create a PAT (repo scope), then run:" >&2
  echo "  export GITHUB_TOKEN=ghp_xxxxxxxx" >&2
  echo "  $0 $REPO_NAME" >&2
  exit 1
fi

USER_JSON="$(curl -sS -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer ${GITHUB_TOKEN}" \
  https://api.github.com/user)"
OWNER="$(node -e "const j=JSON.parse(process.argv[1]); if(!j.login) throw new Error(j.message||JSON.stringify(j)); console.log(j.login)" "$USER_JSON")"

CREATE_RES="$(curl -sS -o /tmp/gh_create_body.json -w "%{http_code}" -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer ${GITHUB_TOKEN}" \
  https://api.github.com/user/repos \
  -d "{\"name\":\"${REPO_NAME}\",\"private\":false,\"description\":\"Clarix education platform\"}")"

if [[ "$CREATE_RES" == "201" ]]; then
  echo "Created https://github.com/${OWNER}/${REPO_NAME}"
elif [[ "$CREATE_RES" == "422" ]]; then
  if grep -q "already exists" /tmp/gh_create_body.json 2>/dev/null; then
    echo "Repo already exists; pushing..."
  else
    cat /tmp/gh_create_body.json >&2
    exit 1
  fi
else
  echo "GitHub API HTTP $CREATE_RES" >&2
  cat /tmp/gh_create_body.json >&2
  exit 1
fi

git remote remove origin 2>/dev/null || true
git remote add origin "https://${GITHUB_TOKEN}@github.com/${OWNER}/${REPO_NAME}.git"
git push -u origin main
git remote set-url origin "https://github.com/${OWNER}/${REPO_NAME}.git"
echo "https://github.com/${OWNER}/${REPO_NAME}"
