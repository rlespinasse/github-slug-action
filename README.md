# GitHub Slug action

[![Release][release-badge]][releases]
![Lint][lint-badge]
[![Licence][license-badge]][license]

This GitHub Action will expose the slug/short values of [some GitHub environment variables][github-env-vars] inside your GitHub workflow.

## Table of Contents

- [GitHub Slug action](#github-slug-action)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Use this action](#use-this-action)
  - [Available Environment variables](#available-environment-variables)
    - [Enhanced variables](#enhanced-variables)
    - [Partial variables](#partial-variables)
    - [Slug variables](#slug-variables)
    - [Slug URL variables](#slug-url-variables)
    - [Short variables](#short-variables)
  - [Troubleshooting](#troubleshooting)
    - [One of the environment variables doesn't work as intended](#one-of-the-environment-variables-doesnt-work-as-intended)
    - [An action could not be found at the URI](#an-action-could-not-be-found-at-the-uri)
  - [Thanks for talking about us](#thanks-for-talking-about-us)

## Overview

`SLUG` on a variable will

- put the variable content in lower case
- replace any character by `-` except `0-9`, `a-z`, `.`, and `_`
- remove leading and trailing `-` character
- limit the string size to 63 characters

<details>
  <summary>Others <b>Slug-ish</b> commands are available</summary>
  <p>

- `SLUG_URL` on a variable to have a `slug` variable compliant to be used in an URL
  - Like `SLUG` but `.` is also replaced by `-`
- `SHORT` on a variable will limit the string size to ~8 characters
  - Useful for _sha_ value
- `<KEY>_PART` on a variable will give a part of a variable defined by a key
  - Like `GITHUB_REPOSITORY_OWNER_PART` for the owner part of `GITHUB_REPOSITORY`
- `<VAR>_CS` on others variables to keep the value case-sensitive
  - Like `GITHUB_REF_SLUG_CS`

  </p>
</details>

Additional enhanced environment variables can be compute to help you around GitHub environment variables.

## Use this action

Add this in your workflow

```yaml
- name: Inject slug/short variables
  uses: rlespinasse/github-slug-action@v4
```

Or with a prefix

```yaml
- name: Inject slug/short variables
  uses: rlespinasse/github-slug-action@v4
  with:
    prefix: CI_
```

Or with another max length for slug values

```yaml
- name: Inject slug/short variables
  uses: rlespinasse/github-slug-action@v4
  with:
    slug-maxlength: 80 # use 'nolimit' to remove use of a max length
```

Check for more [examples][examples] (OS usage, URL use, ...)

**Tip:** Use [Dependabot][dependabot] to maintain your `github-slug-action` version updated in your GitHub workflows.

## Available Environment variables

**Note**: If you don't find what you search for, read more about [available `GitHub` variables](docs/github-variables.md), and propose a [new custom variable][custom-variable].

### Enhanced variables

- `GITHUB_REF_NAME` will contains the reference name (branch or tag)
  - based on `GITHUB_HEAD_REF` in a [`pull-request*`][webhooks-and-events] event context,
  - based on `GITHUB_REF` in others event context.

**NOTE:** All enhanced variables are available in all **slug** formats.

### Partial variables

| Variable                                                                               | Partial version of | Description                                            |
| -------------------------------------------------------------------------------------- | ------------------ | ------------------------------------------------------ |
| [GITHUB_REPOSITORY_OWNER_PART](docs/partial-variables.md#github_repository_owner_part) | GITHUB_REPOSITORY  | The Owner part of GITHUB_REPOSITORY variable           |
| [GITHUB_REPOSITORY_NAME_PART](docs/partial-variables.md#github_repository_name_part)   | GITHUB_REPOSITORY  | The Repository name part of GITHUB_REPOSITORY variable |

### Slug variables

**NOTE:** `_CS` suffix available

| Variable                                                                                          | Slug version of              | Description                                                                                                          |
| ------------------------------------------------------------------------------------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| [GITHUB_REPOSITORY_SLUG](docs/slug-variables.md#github_repository_slug)                           | GITHUB_REPOSITORY            | The owner and repository name.                                                                                       |
| [GITHUB_REPOSITORY<br>_OWNER_PART_SLUG](docs/slug-variables.md#github_repository_owner_part_slug) | GITHUB_REPOSITORY_OWNER_PART | The owner name.                                                                                                      |
| [GITHUB_REPOSITORY<br>_NAME_PART_SLUG](docs/slug-variables.md#github_repository_name_part_slug)   | GITHUB_REPOSITORY_NAME_PART  | The repository name.                                                                                                 |
| [GITHUB_REF_SLUG](docs/slug-variables.md#github_ref_slug)                                         | GITHUB_REF                   | The branch or tag ref that triggered the workflow.                                                                   |
| [GITHUB_HEAD_REF_SLUG](docs/slug-variables.md#github_head_ref_slug)                               | GITHUB_HEAD_REF              | The branch of the head repository.<br>Only set for [pull-request][event-pull-request] event and forked repositories. |
| [GITHUB_BASE_REF_SLUG](docs/slug-variables.md#github_base_ref_slug)                               | GITHUB_BASE_REF              | The branch of the base repository.<br>Only set for [pull-request][event-pull-request] event and forked repositories. |
| [GITHUB_EVENT_REF_SLUG](docs/slug-variables.md#github_event_ref_slug)                             | _github.event.ref_           | <br>Only set for [following webhook events][webhooks-and-events]<ul><li>`create`</li><li>`delete`</li></ul>          |

### Slug URL variables

**NOTE:** `_CS` suffix available

| Variable                                                                                                  | Slug URL version of          | Description                                                                                                           |
| --------------------------------------------------------------------------------------------------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| [GITHUB_REPOSITORY_SLUG_URL](docs/slug-url-variables.md#github_repository_slug_url)                       | GITHUB_REPOSITORY            | The owner and repository name.                                                                                        |
| [GITHUB_REPOSITORY<br>_OWNER_PART_SLUG_URL](docs/slug-variables.md#github_repository_owner_part_slug_url) | GITHUB_REPOSITORY_OWNER_PART | The owner name.                                                                                                       |
| [GITHUB_REPOSITORY<br>_NAME_PART_SLUG_URL](docs/slug-variables.md#github_repository_name_part_slug_url)   | GITHUB_REPOSITORY_NAME_PART  | The repository name.                                                                                                  |
| [GITHUB_REF_SLUG_URL](docs/slug-url-variables.md#github_ref_slug_url)                                     | GITHUB_REF                   | The branch or tag ref that triggered the workflow.                                                                    |
| [GITHUB_HEAD_REF_SLUG_URL](docs/slug-url-variables.md#github_head_ref_slug_url)                           | GITHUB_HEAD_REF              | The branch of the head repository.<br>Only set for [pull-request][webhooks-and-events] event and forked repositories. |
| [GITHUB_BASE_REF_SLUG_URL](docs/slug-url-variables.md#github_base_ref_slug_url)                           | GITHUB_BASE_REF              | The branch of the base repository.<br>Only set for [pull-request][webhooks-and-events] event and forked repositories. |
| [GITHUB_EVENT_REF_SLUG_URL](docs/slug-url-variables.md#github_event_ref_slug_url)                         | _github.event.ref_           | <br>Only set for [following webhook events][webhooks-and-events]<ul><li>`create`</li><li>`delete`</li></ul>           |

### Short variables

| Variable                                                                                                             | Short version of                             | Description                                                                                                                                                                                                                                             |
| -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [GITHUB_SHA_SHORT](docs/short-variables.md#github_sha_short)                                                         | GITHUB_SHA                                   | The commit SHA that triggered the workflow.                                                                                                                                                                                                             |
| [GITHUB_EVENT<br>_PULL_REQUEST<br>_HEAD_SHA_SHORT](docs/short-variables.md#github_event_pull_request_head_sha_short) | _github.event<br>.pull_request<br>.head.sha_ | The commit SHA on pull request that trigger workflow.<br>Only set for [following webhook events][webhooks-and-events]<ul><li>`pull_request`</li><li>`pull_request_review`</li><li>`pull_request_review_comment`</li><li>`pull_request_target`</li></ul> |

## Troubleshooting

### One of the environment variables doesn't work as intended

[**Note**][naming-conventions]: GitHub reserves the `GITHUB_` environment variable prefix for internal use by GitHub. Setting an environment variable or secret with the `GITHUB_` prefix will result in an error.

Currently, a GitHub workflow setting a `GITHUB_` variable will not cause an error, it will just fail silently.
And if a custom `GITHUB_` variable is in conflict with an official `GITHUB_` variable, the offical `GITHUB_` variable will override custom one.

<details>
  <summary>Test workflow</summary>
  <p>

```yaml
name: Test
on: push
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - run: echo ${GITHUB_REF}
      # print "refs/heads/v4.x"
      - run: echo "GITHUB_REF=one_value" >> "$GITHUB_ENV"
      - run: echo ${GITHUB_REF}
      # print "refs/heads/v4.x"
      - run: echo "GITHUB_REF_SLUG=another_value" >> "$GITHUB_ENV"
      - run: echo ${GITHUB_REF_SLUG}
      # print "another_value"
```

  </p>
</details>

### An action could not be found at the URI

If your workflow fail on the `Set up job` task with this kind of log

```text
Download action repository 'rlespinasse/github-slug-action@GIT_REFERENCE'
##[error]An action could not be found at the URI 'https://api.github.com/repos/rlespinasse/github-slug-action/tarball/GIT_REFERENCE'
```

If the `GIT_REFERENCE` value is

- `v4.x` or after, the branch don't exists anymore following the [end-of-life for a branch](SECURITY.md#end-of-life-of-a-branch) security process.
- `master`, the branch don't exists anymore, read more about it on the corresponding issue ([EOL issue][issue-15])

Please, use the current major tag `v4` or a version tag (see [releases pages][releases]) in order to fix your workflow.

## Thanks for talking about us

- [Mettre en place une CI/CD Angular avec GitHub Actions & Netlify][article-1] (in french :fr:)
- [Github Actions : enfin des pipelines accessibles aux développeurs][talk-1] (in french :fr:)
- [Action spotlight by Michael Heap][article-2]
- The next one is you. _Don't hesitate to add youself to this list._

[release-badge]: https://img.shields.io/github/workflow/status/rlespinasse/github-slug-action/Release?label=Build&logo=github&style=flat-square
[lint-badge]: https://img.shields.io/github/workflow/status/rlespinasse/github-slug-action/Lint?label=Lint&logo=github&style=flat-square
[license-badge]: https://img.shields.io/github/license/rlespinasse/github-slug-action?style=flat-square

[actions]: https://github.com/rlespinasse/github-slug-action/actions
[license]: https://github.com/rlespinasse/github-slug-action/blob/v4.x/LICENSE
[examples]: https://github.com/rlespinasse/github-slug-action/tree/v4.x/examples
[custom-variable]: https://github.com/rlespinasse/github-slug-action/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=
[releases]: https://github.com/rlespinasse/github-slug-action/releases
[issue-15]: https://github.com/rlespinasse/github-slug-action/issues/15

[github-env-vars]: https://docs.github.com/en/free-pro-team@latest/actions/reference/environment-variables#default-environment-variables
[dependabot]: https://docs.github.com/en/free-pro-team@latest/github/administering-a-repository/keeping-your-actions-up-to-date-with-github-dependabot
[webhooks-and-events]: https://docs.github.com/en/developers/webhooks-and-events/webhook-events-and-payloads
[naming-conventions]: https://docs.github.com/en/actions/reference/environment-variables#naming-conventions-for-environment-variables

[article-1]: https://esensconsulting.medium.com/mettre-en-place-une-ci-cd-angular-avec-github-actions-netlify-ca0b59b99ed8
[article-2]: https://michaelheap.com/github-slug-action/
[talk-1]: https://www.youtube.com/watch?v=RHnTJBwcE98
