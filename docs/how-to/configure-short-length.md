# Configure the length of short SHA values

Set a specific length for shortened commit SHA values instead of letting Git determine it automatically.

## Usage

```yaml
steps:
  - name: Inject enhanced GitHub environment variables
    uses: rlespinasse/github-slug-action@v5
    with:
      short-length: 7
```

## Common values

| Value | Use case |
| ----- | -------- |
| _(empty)_ | Let Git decide based on repository size (default) |
| `7` | Common "small repository" length |
| `8` | Reproduce `v3` action behaviour |
| `4` | Minimum allowed length |

## Letting Git decide (default)

When `short-length` is left empty, the action uses Git's [`git rev-parse --short`][git-revparse] behaviour. The length depends on the size of your repository and may change over time as the repository grows.

> [!WARNING]
> If you leave `short-length` empty, you need to checkout the source first so Git can determine the length:
>
> ```yaml
> steps:
>   - uses: actions/checkout@v4
>   - uses: rlespinasse/github-slug-action@v5
> ```
>
> Without a checkout step, the action falls back to the effective value of the [`core.abbrev`][git-core-abbrev] Git configuration variable, or `7` if unavailable.

## See also

- [Inputs reference](../reference/inputs.md) for the full specification
- [SHORT transformation](../explanation/slug-transformation-rules.md#short-transformation) for how short values are computed

[git-revparse]: https://git-scm.com/docs/git-rev-parse#Documentation/git-rev-parse.txt---shortlength
[git-core-abbrev]: https://git-scm.com/docs/git-config#Documentation/git-config.txt-coreabbrev
