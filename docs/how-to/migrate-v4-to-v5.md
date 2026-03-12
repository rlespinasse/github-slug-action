# Migrate from v4 to v5

The main breaking change in v5 is that **GITHUB_REF_NAME** slug variables now match GitHub's native behaviour on `pull_request*` events.

## What changed

Before v5, the action overrode `GITHUB_REF_NAME` to always contain the branch name, even on pull request events. Starting with v5, `GITHUB_REF_NAME` on pull request events contains `<PR-number>/merge` (matching GitHub's native behaviour). Read the [full story][issue-104].

## How to migrate

If you used `GITHUB_REF_NAME_SLUG` to get the branch name on pull request events, switch to `GITHUB_REF_POINT_SLUG`:

```yaml
steps:
  - name: Inject enhanced GitHub environment variables
    uses: rlespinasse/github-slug-action@v5
  - run: |
      echo "Branch Name: ${GITHUB_REF_POINT}"
    shell: bash
```

`GITHUB_REF_POINT` provides the branch name on pull request events (via `GITHUB_HEAD_REF`) and the ref name on all other events (via `GITHUB_REF_NAME`). All slug suffixes are available: `GITHUB_REF_POINT_SLUG`, `GITHUB_REF_POINT_SLUG_URL`, etc.

## Expression syntax

- `${{ env.GITHUB_REF_POINT }}` and `$GITHUB_REF_POINT` both serve the action's behaviour
- `${{ env.GITHUB_REF_NAME }}` serves the action's behaviour
- `$GITHUB_REF_NAME` serves GitHub Action's native behaviour

[issue-104]: https://github.com/rlespinasse/github-slug-action/issues/104
