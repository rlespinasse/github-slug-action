# GitHub Slug action

[![Actions Status](https://github.com/rlespinasse/github-slug-action/workflows/Build/badge.svg)](https://github.com/rlespinasse/github-slug-action/actions)

This action slug and expose some github variables.

`Slug` a variable will

- put the variable content in lower case
- replace any character by `-` except `0-9`, `a-z`, and `.`
- remove leading and trailing `-` character
- limit the string size to 63 characters

Others `Slug`-ish commands are available:

- `Slug URL` a variable will be like the `slug` variable but the `.` character will also be replaced by `-`
- `Short SHA` a variable will limit the string size to 8 characters

## Exposed environment variables

```yaml
- name: Inject slug/short variables
  uses: rlespinasse/github-slug-action@v2.x

- name: Print slug/short variables
  run: |
    echo "Slug reference variables"
    echo " - ${{ env.GITHUB_REF_SLUG }}"
    echo " - ${{ env.GITHUB_HEAD_REF_SLUG }}"
    echo " - ${{ env.GITHUB_BASE_REF_SLUG }}"
    echo "Slug URL reference variables"
    echo " - ${{ env.GITHUB_REF_SLUG_URL }}"
    echo " - ${{ env.GITHUB_HEAD_REF_SLUG_URL }}"
    echo " - ${{ env.GITHUB_BASE_REF_SLUG_URL }}"
    echo "Short SHA variables"
    echo " - ${{ env.GITHUB_SHA_SHORT }}"
```

Read [default environment variables](https://help.github.com/en/actions/configuring-and-managing-workflows/using-environment-variables#default-environment-variables) page for more information.

### GITHUB_REF_SLUG(_URL)

Slug the environment variable **GITHUB_REF**

The branch or tag ref that triggered the workflow.
_If neither a branch or tag is available for the event type, the variable will not exist._

| GITHUB_REF                     | GITHUB_REF_SLUG     | GITHUB_REF_SLUG_URL |
|--------------------------------|---------------------|---------------------|
| refs/heads/master              | master              | master              |
| refs/heads/feat/new_feature    | feat-new-feature    | feat-new-feature    |
| refs/tags/v1.0.0               | v1.0.0              | v1-0-0              |
| refs/tags/product@1.0.0-rc.2   | product-1.0.0-rc.2  | product-1-0-0-rc-2  |
| refs/heads/New_Awesome_Product | new-awesome-product | new-awesome-product |

_Additional variables (only set for forked repositories) :_

- `GITHUB_HEAD_REF_SLUG`/`GITHUB_HEAD_REF_SLUG_URL`, The branch of the head repository **GITHUB_HEAD_REF**
- `GITHUB_BASE_REF_SLUG`/`GITHUB_BASE_REF_SLUG_URL`, The branch of the base repository **GITHUB_BASE_REF**

#### Use in an URL

In an URL, use `GITHUB_REF_SLUG_URL` instead of **GITHUB_REF_SLUG** as subdomain to be compliant.

> **NOTE :**
> GITHUB_REF_SLUG can be used in an URL only as part of the _resource path_.

```yaml
- name: Inject slug/short variables
  uses: rlespinasse/github-slug-action@v2.x

- name: Deploy dummy application using slug in the 'subdomain' part
  run: |
    ./deploy-application.sh --url "https://${{ env.GITHUB_REF_SLUG_URL }}.staging.app.mycompagny.com"

- name: Deploy dummy application using slug in the 'resource path' part
  run: |
    ./deploy-application.sh --url "https://staging.app.mycompagny.com/${{ env.GITHUB_REF_SLUG }}"
```

### GITHUB_SHA_SHORT

Short the environment variable **GITHUB_SHA**

The commit SHA that triggered the workflow

| GITHUB_SHA                               | GITHUB_SHA_SHORT |
|------------------------------------------|------------------|
| ffac537e6cbbf934b08745a378932722df287a53 | ffac537e         |
