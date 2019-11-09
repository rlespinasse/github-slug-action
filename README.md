# GitHub Slug action

This action slug and expose some github variables.

`Slug` a variable will

- put the variable content in lower case,
- replace any caracter by `-` except `0-9` and `a-z`,
- remove leading and trailing `-` caracter,
- limit the string size to 63 caracters.

Slug will also provide a shortened version of GITHUB_SHA reduced to `8` characters.

## Environement Variables

| GitHub environment variable | Slug variable |
| - | - |
| GITHUB_REF | GITHUB_REF_SLUG |
| GITHUB_HEAD_REF | GITHUB_HEAD_REF_SLUG |
| GITHUB_BASE_REF | GITHUB_BASE_REF_SLUG |

| GitHub environment variable | Short variable |
| - | - |
| GITHUB_SHA | GITHUB_SHORT_SHA |

## Example usage

```yaml
- uses: rlespinasse/github-slug-action@master
- name: Print slug variables
  run: |
    echo ${{ env.GITHUB_REF_SLUG }}
    echo ${{ env.GITHUB_HEAD_REF_SLUG }}
    echo ${{ env.GITHUB_BASE_REF_SLUG }}
    echo ${{ env.GITHUB_SHORT_SHA }}
```
