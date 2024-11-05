# GitHub Slug action

This GitHub Action will expose the slug/short values of [some GitHub environment variables][default-environment-variables] inside your GitHub workflow.

## Overview

`SLUG` on a variable will

- put the variable content in lower case
- replace any character by `-` except `0-9`, `a-z`, `.`, and `_`
- remove leading `-` characters
- limit the string size to 63 characters
- remove trailing `-` characters

### Others Slug-ish variables are available

- `SLUG_URL` on a variable to have a `slug` variable compliant to be used in a URL
  - Like `SLUG` but `.`, and `_` are also replaced by `-`
- `SHORT` on a variable will limit the string size to ~8 characters
  - Useful for _sha_ value
- `<KEY>_PART` on a variable will give a part of a variable defined by a key
  - Like `GITHUB_REPOSITORY_OWNER_PART` for the owner part of `GITHUB_REPOSITORY`
- `<VAR>_CS` on others variables to keep the value case-sensitive
  - Like `GITHUB_REF_SLUG_CS`

## Installation

Add this step to your workflow

```yaml
steps:
  - name: Inject enhanced GitHub environment variables
    uses: rlespinasse/github-slug-action@v5
```

> [!CAUTION]
> Use [Dependabot][dependabot] to maintain your `github-slug-action` version updated in your GitHub workflows.

## Configuration Options

> [!TIP]
> Check for more [examples][examples] (OS usage, URL use, ...)

### With a prefix

```yaml
steps:
  - name: Inject enhanced GitHub environment variables
    uses: rlespinasse/github-slug-action@v5
    with:
      prefix: CI_
```

### With another max length for slug values

```yaml
steps:
  - name: Inject enhanced GitHub environment variables
    uses: rlespinasse/github-slug-action@v5
    with:
      slug-maxlength: 80 # Use 'nolimit' to remove use of a max length (Default to 63)
```

### With another length for short values

```yaml
steps:
  - name: Inject enhanced GitHub environment variables
    uses: rlespinasse/github-slug-action@v5
    with:
      short-length: 7 # By default it's up to Git to decide, use 8 to have the v3.x behavior
```

> [!WARNING]
> If you leave it empty, you need to checkout the source first in order to let Git decide the size by itself.

## Available Environment variables

> [!TIP]
> If you don't find what you search for
>
> - Read more about [available `GitHub` variables](docs/github-variables.md), and propose a [new custom variable][custom-variable].
> - Use your own variable with [slugify-value][slugify-value], or [shortify-git-revision][shortify-git-revision] for git reference.

### Enhanced variables

- `GITHUB_REF_POINT` will contains the reference name (branch or tag)
  - based on `GITHUB_HEAD_REF` in a [`pull-request*`][webhooks-and-events] event context,
  - based on `GITHUB_REF_NAME` in others event context.

> [!NOTE]
> All enhanced variables are available in all **slug** formats.

### Partial variables

| Variable | Description |
| -------- | ----------- |
| [GITHUB_REPOSITORY_OWNER_PART](docs/partial-variables.md#github_repository_owner_part) | The Owner part of GITHUB_REPOSITORY variable |
| [GITHUB_REPOSITORY_NAME_PART](docs/partial-variables.md#github_repository_name_part) | The Repository name part of GITHUB_REPOSITORY variable |

### Slug variables

> [!TIP]
> Available in standard and case-sensitive (`_CS`) versions.

| Variable | Description |
| -------- | ----------- |
| [GITHUB_REPOSITORY_SLUG](docs/slug-variables.md#github_repository_slug) | The owner and repository name. |
| [GITHUB_REPOSITORY_OWNER_PART_SLUG](docs/slug-variables.md#github_repository_owner_part_slug) | The owner name. |
| [GITHUB_REPOSITORY_NAME_PART_SLUG](docs/slug-variables.md#github_repository_name_part_slug) | The repository name. |
| [GITHUB_REF_SLUG](docs/slug-variables.md#github_ref_slug) | The branch or tag ref that triggered the workflow. |
| [GITHUB_REF_NAME_SLUG](docs/slug-variables.md#github_ref_name_slug) | This value matches the branch or tag name shown on GitHub. |
| [GITHUB_HEAD_REF_SLUG](docs/slug-variables.md#github_head_ref_slug) | The branch of the head repository. |
| [GITHUB_BASE_REF_SLUG](docs/slug-variables.md#github_base_ref_slug) | The branch of the base repository. |
| [GITHUB_EVENT_REF_SLUG](docs/slug-variables.md#github_event_ref_slug) | The Git reference resource associated to triggered webhook. |

### URL-Safe Slug variables

Same as slug variables but URL-compliant

> [!TIP]
> Available in standard and case-sensitive (`_CS`) versions.

| Variable | Description |
| -------- | ----------- |
| [GITHUB_REPOSITORY_SLUG_URL](docs/slug-url-variables.md#github_repository_slug_url) | The owner and repository name. |
| [GITHUB_REPOSITORY_OWNER_PART_SLUG_URL](docs/slug-variables.md#github_repository_owner_part_slug_url) | The owner name. |
| [GITHUB_REPOSITORY_NAME_PART_SLUG_URL](docs/slug-variables.md#github_repository_name_part_slug_url) | The repository name. |
| [GITHUB_REF_SLUG_URL](docs/slug-url-variables.md#github_ref_slug_url) | The branch or tag ref that triggered the workflow. |
| [GITHUB_REF_NAME_SLUG_URL](docs/slug-url-variables.md#github_ref_slug_url) | This value matches the branch or tag name shown on GitHub. |
| [GITHUB_HEAD_REF_SLUG_URL](docs/slug-url-variables.md#github_head_ref_slug_url) | The branch of the head repository. |
| [GITHUB_BASE_REF_SLUG_URL](docs/slug-url-variables.md#github_base_ref_slug_url) | The branch of the base repository. |
| [GITHUB_EVENT_REF_SLUG_URL](docs/slug-url-variables.md#github_event_ref_slug_url) | The Git reference resource associated to triggered webhook. |

### Short variables

| Variable | Description |
| -------- | ----------- |
| [GITHUB_SHA_SHORT](docs/short-variables.md#github_sha_short) | The commit SHA that triggered the workflow. |
| [GITHUB_EVENT_PULL_REQUEST_HEAD_SHA_SHORT](docs/short-variables.md#github_event_pull_request_head_sha_short) |  The commit SHA on pull request that trigger workflow. |

## Migration from previous versions

### v4 to v5

The **GITHUB_REF_NAME SLUG/SLUG_URL** variables doesn't work the same way as before

> [!TIP]
> If you use `v5` or related versions, you need to use `GITHUB_REF_POINT` instead of `GITHUB_REF_NAME` to get the behavior of the `v4` action.

Before `v5`, the behavior was the same as the GitHub one except on `pull_request*` workflows ([Ready the full story][issue-104]).

- `${{ env.GITHUB_REF_NAME }}` will serve the behavior of this action,
- `$GITHUB_REF_NAME` will serve the behavior of GitHub Action.

On `pull_request*` workflows, the content will be `<PR-number>/merge` instead of the branch name.
So you need to use `GITHUB_REF_POINT` instead

```yaml
steps:
  - name: Inject enhanced GitHub environment variables
    uses: rlespinasse/github-slug-action@v5
  - run: |
      echo "Branch Name: ${GITHUB_REF_POINT}"
    shell: bash

```

Then `${{ env.GITHUB_REF_POINT }}`, and `$GITHUB_REF_POINT` will serve the behavior of this action.
And `${{ env.GITHUB_REF_NAME }}`, and `$GITHUB_REF_NAME` will serve the behavior of GitHub Action.

### v3 to v4

Since `v4`, it's Git who manage the short variables by using [`git rev-parse`][git-revparse] behaviour.
The length of a short sha depends of the size of our repository and can differ over time.

To manage that moving length, you can use `short-length` input

- set `7` to reproduce `small repository` behavior
- set `8` to reproduce `v3` behavior

> [!WARNING]
> The minimum length is 4, the default is the effective value of the [core.abbrev][git-core-abbrev] configuration variable.

So to reproduce previous behavior, use

```yaml
steps:
  - name: Inject enhanced GitHub environment variables
    uses: rlespinasse/github-slug-action@v5
    with:
      short-length: 8 # Same as v3 and before
```

## Troubleshooting

### One of the environment variables doesn't work as intended

> [!WARNING]
> When you set a custom environment variable, you [cannot use any of the default environment variable names][naming-conventions]. For a complete list of these, see [Default environment variables][default-environment-variables]. **If you attempt to override the value of one of these default environment variables, the assignment is ignored.**

If a variable start to be used as default environment variable, the environment variable may have a different behavior than the expected one.

If this append, the `${{ env.GITHUB_AWESOME_VARIABLE }}` and `$GITHUB_AWESOME_VARIABLE` expression will not works in the same way.

- `${{ env.GITHUB_AWESOME_VARIABLE }}` will serve the behavior of this action,
- `$GITHUB_AWESOME_VARIABLE` will serve the behavior of GitHub Action.

Otherwise the two expression will serve the behavior of this action.
This will not occurs if you use the `prefix` input to avoid the issue.

> [!IMPORTANT]
> If detected, the maintainers of this action will choose the best course of action depending of the impact.

### An action could not be found at the URI

If your workflow fail on the `Set up job` task with this kind of log

```text
Download action repository 'rlespinasse/github-slug-action@GIT_REFERENCE'
##[error]An action could not be found at the URI 'https://api.github.com/repos/rlespinasse/github-slug-action/tarball/GIT_REFERENCE'
```

If the `GIT_REFERENCE` value is

- `v4.x` or after, the branch don't exists anymore following the [end-of-life for a branch](SECURITY.md#end-of-life-of-a-branch) security process.
- `master`, the branch don't exists anymore, read more about it on the corresponding issue ([EOL issue][issue-15])

Please, use the current major tag `v5` or a version tag (see [releases pages][releases]) in order to fix your workflow.

## Thanks for talking about us

In English :gb:

- [Action spotlight by Michael Heap][article-2]
- [Serverless Deploy Previews on GitHub Actions][article-3]
- [Let's Build a Continuous Delivery and Branching Process with GitHub Actions, Vercel and Heroku][article-4]

In French :fr:

- [Mettre en place une CI/CD Angular avec GitHub Actions & Netlify][article-1]
- [GitHub Actions : enfin des pipelines accessibles aux développeurs][talk-1]

In Chinese :cn:

- [利用github-slug-action暴漏GitHub Action上下文中的关键变量][article-5]

> The next one is you. _Don't hesitate to add youself to one of these lists._

[examples]: https://github.com/rlespinasse/github-slug-action/tree/v5.x/examples
[custom-variable]: https://github.com/rlespinasse/github-slug-action/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=
[releases]: https://github.com/rlespinasse/github-slug-action/releases
[issue-15]: https://github.com/rlespinasse/github-slug-action/issues/15
[issue-104]: https://github.com/rlespinasse/github-slug-action/issues/104

[slugify-value]: https://github.com/rlespinasse/slugify-value
[shortify-git-revision]: https://github.com/rlespinasse/shortify-git-revision

[git-revparse]: https://git-scm.com/docs/git-rev-parse#Documentation/git-rev-parse.txt---shortlength
[git-core-abbrev]: https://git-scm.com/docs/git-config#Documentation/git-config.txt-coreabbrev

[default-environment-variables]: https://docs.github.com/en/actions/learn-github-actions/environment-variables#default-environment-variables
[dependabot]: https://docs.github.com/en/code-security/dependabot/working-with-dependabot/keeping-your-actions-up-to-date-with-dependabot
[webhooks-and-events]: https://docs.github.com/en/developers/webhooks-and-events/webhook-events-and-payloads
[naming-conventions]: https://docs.github.com/en/actions/reference/environment-variables#naming-conventions-for-environment-variables

[article-1]: https://esensconsulting.medium.com/mettre-en-place-une-ci-cd-angular-avec-github-actions-netlify-ca0b59b99ed8
[article-2]: https://michaelheap.com/github-slug-action/
[article-3]: https://barstool.engineering/serverless-deploy-previews-on-github-actions/
[article-4]: https://javascript.plainenglish.io/lets-build-a-continuous-delivery-and-branching-process-c27dae09f0b6
[article-5]: https://eryajf.github.io/HowToStartOpenSource/views/03-github-tips/10-Use-github-slug-action-to-leak-key-variables-in-the-Github-Action-context.html
[talk-1]: https://www.youtube.com/watch?v=F5mBDmOQcvE
