# GitHub Slug action

[![Actions Status][1]][2]

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
    echo "Slug variables"
    echo "   ref        : ${{ env.GITHUB_REF_SLUG }}"
    echo "   head ref   : ${{ env.GITHUB_HEAD_REF_SLUG }}"
    echo "   base ref   : ${{ env.GITHUB_BASE_REF_SLUG }}"
    echo "   event ref  : ${{ env.GITHUB_EVENT_REF_SLUG }}"
    echo "   repository : ${{ env.GITHUB_REPOSITORY_SLUG }}"
    echo "Slug URL variables"
    echo "   ref        : ${{ env.GITHUB_REF_SLUG_URL }}"
    echo "   head ref   : ${{ env.GITHUB_HEAD_REF_SLUG_URL }}"
    echo "   base ref   : ${{ env.GITHUB_BASE_REF_SLUG_URL }}"
    echo "   event ref  : ${{ env.GITHUB_EVENT_REF_SLUG_URL }}"
    echo "   repository : ${{ env.GITHUB_REPOSITORY_SLUG_URL }}"
    echo "Short SHA variables"
    echo "   sha        : ${{ env.GITHUB_SHA_SHORT }}"
```

Read [default environment variables][3] page for more information.

### GITHUB_REF_SLUG / GITHUB_REF_SLUG_URL

Slug the environment variable **GITHUB_REF**

The branch or tag ref that triggered the workflow.
_If neither a branch or tag is available for the event type, the variable will not exist._

| GITHUB_REF                     | GITHUB_REF_SLUG     | GITHUB_REF_SLUG_URL |
| ------------------------------ | ------------------- | ------------------- |
| refs/heads/master              | master              | master              |
| refs/heads/feat/new_feature    | feat-new-feature    | feat-new-feature    |
| refs/tags/v1.0.0               | v1.0.0              | v1-0-0              |
| refs/tags/product@1.0.0-rc.2   | product-1.0.0-rc.2  | product-1-0-0-rc-2  |
| refs/heads/New_Awesome_Product | new-awesome-product | new-awesome-product |

> **NOTE :**
> GITHUB_REF_SLUG_URL is design to be used as subdomain in an URL.

_Additional variables (only set for forked repositories) :_

- `GITHUB_HEAD_REF_SLUG`/`GITHUB_HEAD_REF_SLUG_URL`, The branch of the head repository **GITHUB_HEAD_REF**
- `GITHUB_BASE_REF_SLUG`/`GITHUB_BASE_REF_SLUG_URL`, The branch of the base repository **GITHUB_BASE_REF**

_Additional variables (only set for [create][4], and [delete][5] webhook events with `ref` data) :_

- `GITHUB_EVENT_REF_SLUG`/`GITHUB_EVENT_REF_SLUG_URL`, The git reference resource associated to the webhook.

### GITHUB_REPOSITORY_SLUG / GITHUB_REPOSITORY_SLUG_URL

Slug the environment variable **GITHUB_REPOSITORY**

The owner and repository name.

| GITHUB_REPOSITORY          | GITHUB_REPOSITORY_SLUG     | GITHUB_REPOSITORY_SLUG_URL |
| -------------------------- | -------------------------- | -------------------------- |
| octocat/Hello-World        | octocat-hello-world        | octocat-hello-world        |
| rlespinasse/Hello-World.go | rlespinasse-hello-world.go | rlespinasse-hello-world-go |

> **NOTE :**
> GITHUB_REPOSITORY_SLUG_URL is design to be used as subdomain in an URL.

### GITHUB_SHA_SHORT

Short the environment variable **GITHUB_SHA**

The commit SHA that triggered the workflow

| GITHUB_SHA                               | GITHUB_SHA_SHORT |
| ---------------------------------------- | ---------------- |
| ffac537e6cbbf934b08745a378932722df287a53 | ffac537e         |

### Use slug variable in an URL

In an URL, use `<GITHUB_VARIABLE>_SLUG_URL` instead of **<GITHUB_VARIABLE>\_SLUG** as subdomain to be compliant.

> **NOTE :**
> <GITHUB*VARIABLE>\_SLUG can be used in an URL only as part of the \_resource path*.

```yaml
- name: Inject slug/short variables
  uses: rlespinasse/github-slug-action@v2.x

- name: Deploy dummy application using slug in the 'subdomain' part
  run: |
    ./deploy-application.sh --url "https://${{ env.<GITHUB_VARIABLE>_SLUG_URL }}.staging.app.mycompagny.com"

- name: Deploy dummy application using slug in the 'resource path' part
  run: |
    ./deploy-application.sh --url "https://staging.app.mycompagny.com/${{ env.<GITHUB_VARIABLE>_SLUG }}"
```

## Troubleshooting

When using this action on Windows or Macos, this error is display `##[error]Container action is only supported on Linux`.
Currently, this action don't support a system other than Linux due to Github Action Limitation.

[1]: https://github.com/rlespinasse/github-slug-action/workflows/Build/badge.svg
[2]: https://github.com/rlespinasse/github-slug-action/actions
[3]: https://help.github.com/en/actions/configuring-and-managing-workflows/using-environment-variables#default-environment-variables
[4]: https://docs.github.com/en/developers/webhooks-and-events/webhook-events-and-payloads#create
[5]: https://docs.github.com/en/developers/webhooks-and-events/webhook-events-and-payloads#delete
