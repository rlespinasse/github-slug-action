# Inputs Reference

The GitHub Slug Action accepts the following inputs in the `with:` block.

| Input | Required | Default | Description |
| ----- | -------- | ------- | ----------- |
| `prefix` | No | `""` | Value prepended to each generated variable name. For example, `prefix: CI_` produces `CI_GITHUB_REPOSITORY_SLUG` instead of `GITHUB_REPOSITORY_SLUG`. |
| `slug-maxlength` | Yes | `63` | Maximum length of slugified values. Accepts a number or `"nolimit"` to disable truncation. Must not be empty. |
| `short-length` | No | _(Git default)_ | Length of shortened SHA values. Minimum `4`. When empty, Git determines the length based on your repository size using [`git rev-parse`][git-revparse]. |

## Notes

- When `short-length` is left empty, the action uses the effective value of the [`core.abbrev`][git-core-abbrev] Git configuration variable. This requires your repository to be checked out first (via `actions/checkout`).
- The `slug-maxlength` default of `63` matches the DNS label length limit, which is also the maximum length for Kubernetes labels.

## See also

- [How to use a prefix](../how-to/use-prefix.md)
- [How to configure slug max length](../how-to/configure-slug-maxlength.md)
- [How to configure short length](../how-to/configure-short-length.md)

[git-revparse]: https://git-scm.com/docs/git-rev-parse#Documentation/git-rev-parse.txt---shortlength
[git-core-abbrev]: https://git-scm.com/docs/git-config#Documentation/git-config.txt-coreabbrev
