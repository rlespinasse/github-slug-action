# GitHub Slug action

This action slug and expose some github variables.

`Slug` a variable will

- put the variable content in lower case,
- replace any caracter by `-` except `0-9` and `a-z`,
- limit the string size to 63 caracter

## Environement Variables

### `GITHUB_REF_SLUG`

Slug from `GITHUB_REF` env variables

## Example usage

```yaml
uses: rlespinasse/github-slug-action@master
```
