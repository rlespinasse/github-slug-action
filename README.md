# GitHub Slug action

This action slug and expose some github variables.

`Slug` a variable will

- put the variable content in lower case,
- replace any character by `-` except `0-9`, `a-z`and `.`,
- remove leading and trailing `-` character,
- limit the string size to 63 characters.

Others `Slug`-ish commands are available:
- `Short SHA` a variable will limit the string size to 8 characters.

## Environment Variables

| GitHub environment variable | Slug variable |
| - | - |
| GITHUB_REF | GITHUB_REF_SLUG |
| GITHUB_HEAD_REF | GITHUB_HEAD_REF_SLUG |
| GITHUB_BASE_REF | GITHUB_BASE_REF_SLUG |

| GitHub environment variable | Short variable |
| - | - |
| GITHUB_SHA | GITHUB_SHA_SHORT |

## Example usage

```yaml
- uses: rlespinasse/github-slug-action@master
- name: Print slug variables
  run: |
    echo ${{ env.GITHUB_REF_SLUG }}
    echo ${{ env.GITHUB_HEAD_REF_SLUG }}
    echo ${{ env.GITHUB_BASE_REF_SLUG }}
    echo ${{ env.GITHUB_SHA_SHORT }}
```
