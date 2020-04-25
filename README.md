# GitHub Slug action

[![Actions Status](https://github.com/rlespinasse/github-slug-action/workflows/Build/badge.svg)](https://github.com/rlespinasse/github-slug-action/actions)

This action slug and expose some github variables.

`Slug` a variable will

- put the variable content in lower case,
- replace any character by `-` except `0-9` and `a-z`,
- remove leading and trailing `-` character,
- limit the string size to 63 characters.

Others `Slug`-ish commands are available:

- `Short SHA` a variable will limit the string size to 8 characters.

## Exposed environment variables

```yaml
- uses: rlespinasse/github-slug-action@v1.1.x
- name: Print slug variables
  run: |
    echo ${{ env.GITHUB_REF_SLUG }}
    echo ${{ env.GITHUB_HEAD_REF_SLUG }}
    echo ${{ env.GITHUB_BASE_REF_SLUG }}
    echo ${{ env.GITHUB_SHA_SHORT }}
```

Read [default environment variables](https://help.github.com/en/actions/configuring-and-managing-workflows/using-environment-variables#default-environment-variables) page for more information.

### GITHUB_REF_SLUG

Slug the environment variable **GITHUB_REF**

The branch or tag ref that triggered the workflow.
_If neither a branch or tag is available for the event type, the variable will not exist._

| Environment variable (GITHUB_REF) | Slug variable (GITHUB_REF_SLUG) |
|-----------------------------------|---------------------------------|
| refs/heads/master                 | master                          |
| refs/heads/feat/new_feature       | feat-new-feature                |
| refs/tags/v1.0.0                  | v1-0-0                          |
| refs/tags/product@1.0.0-rc.2      | product-1-0-0-rc-2              |
| refs/heads/New_Awesome_Product    | new-awesome-product             |

_Additional variables (only set for forked repositories) :_

- `GITHUB_HEAD_REF_SLUG` : The branch of the head repository **GITHUB_HEAD_REF**,
- `GITHUB_BASE_REF_SLUG` : The branch of the base repository **GITHUB_BASE_REF**.

### GITHUB_SHA_SHORT

Short the environment variable **GITHUB_SHA**

The commit SHA that triggered the workflow

| Environment variable (GITHUB_SHA)        | Short variable (GITHUB_SHA_SHORT) |
|------------------------------------------|-----------------------------------|
| ffac537e6cbbf934b08745a378932722df287a53 | ffac537e                          |
