# Migrate from v3 to v4

The main breaking change in v4 is that **short SHA length** is now determined by Git instead of being fixed at 8 characters.

## What changed

Since v4, Git manages the short variables using [`git rev-parse`][git-revparse] behaviour. The length of a short SHA depends on the size of your repository and can change over time as the repository grows.

## How to migrate

To reproduce the previous fixed-length behaviour, set `short-length` to `8`:

```yaml
steps:
  - name: Inject enhanced GitHub environment variables
    uses: rlespinasse/github-slug-action@v5
    with:
      short-length: 8 # Same as v3 and before
```

Other options:

- Set `7` to reproduce small repository behaviour
- Leave empty to let Git decide (recommended)

> [!WARNING]
> The minimum length is `4`. The default is the effective value of the [`core.abbrev`][git-core-abbrev] Git configuration variable.

[git-revparse]: https://git-scm.com/docs/git-rev-parse#Documentation/git-rev-parse.txt---shortlength
[git-core-abbrev]: https://git-scm.com/docs/git-config#Documentation/git-config.txt-coreabbrev
