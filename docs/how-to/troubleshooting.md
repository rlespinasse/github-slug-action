# Troubleshooting

## One of the environment variables doesn't work as intended

> [!WARNING]
> When you set a custom environment variable, you [cannot use any of the default environment variable names][naming-conventions]. For a complete list of these, see [Default environment variables][default-environment-variables]. **If you attempt to override the value of one of these default environment variables, the assignment is ignored.**

If a variable starts to be used as a default environment variable by GitHub, the behaviour may differ depending on how you reference it:

- `${{ env.GITHUB_AWESOME_VARIABLE }}` serves the behaviour of this action
- `$GITHUB_AWESOME_VARIABLE` serves the behaviour of GitHub Actions

If both expressions return the same value, the variable is not affected. Use the [`prefix` input](use-prefix.md) to avoid this issue entirely.

> [!IMPORTANT]
> If detected, the maintainers of this action will choose the best course of action depending on the impact.

## An action could not be found at the URI

If your workflow fails on the `Set up job` task with this kind of log:

```text
Download action repository 'rlespinasse/github-slug-action@GIT_REFERENCE'
##[error]An action could not be found at the URI 'https://api.github.com/repos/rlespinasse/github-slug-action/tarball/GIT_REFERENCE'
```

If the `GIT_REFERENCE` value is:

- `v4.x` or after: following the [end-of-life for a branch](../../SECURITY.md#end-of-life-of-a-branch) security process, this branch may have been deleted.
- `master`: this branch no longer exists. Read more on the corresponding issue ([EOL issue][issue-15]).

Use the current **major tag** `v5` or a specific version tag (see [releases][releases]) to fix your workflow.

## Short variables are empty or have unexpected length

If `GITHUB_SHA_SHORT` is empty or shorter than expected, ensure you have checked out your repository before the action runs:

```yaml
steps:
  - uses: actions/checkout@v6
  - uses: rlespinasse/github-slug-action@v5
```

Without a checkout, Git cannot determine the optimal short length for your repository. Alternatively, set a fixed `short-length` to avoid depending on the checkout:

```yaml
steps:
  - uses: rlespinasse/github-slug-action@v5
    with:
      short-length: 7
```

[naming-conventions]: https://docs.github.com/en/actions/reference/workflows-and-actions/variables#naming-conventions-for-configuration-variables
[default-environment-variables]: https://docs.github.com/en/actions/reference/workflows-and-actions/variables#default-environment-variables
[issue-15]: https://github.com/rlespinasse/github-slug-action/issues/15
[releases]: https://github.com/rlespinasse/github-slug-action/releases
