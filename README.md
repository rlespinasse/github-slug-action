# GitHub Slug action

[![Actions Status][1]][2]
![GitHub Super-Linter][13]
[![Public workflows that use this action.][8]][9]
[![Licence][11]][12]

This GitHub Action will expose the slug/short values of [some GitHub environment variables][10] inside your GitHub workflow.

## Table of Contents

- [GitHub Slug action](#github-slug-action)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Use this action](#use-this-action)
  - [Available Environment variables](#available-environment-variables)
    - [Slug variables](#slug-variables)
    - [Slug URL variables](#slug-url-variables)
    - [Short variables](#short-variables)
  - [Contribute](#contribute)
  - [Troubleshooting](#troubleshooting)
    - [One of environement variable don't work as intended](#one-of-environement-variable-dont-work-as-intended)
    - [An action could not be found at the URI](#an-action-could-not-be-found-at-the-uri)
  - [Thanks for talking about us](#thanks-for-talking-about-us)

## Overview

`SLUG` a variable will

- put the variable content in lower case
- replace any character by `-` except `0-9`, `a-z`, and `.`
- remove leading and trailing `-` character
- limit the string size to 63 characters

<details>
  <summary>Others <b>Slug-ish</b> commands are available</summary>
  <p>

- `SLUG_URL` a variable to have a `slug` variable compliant to be used in an URL (Like `SLUG` but `.` is also replaced by `-`)
- `SHORT` a variable will limit the string size to 8 characters (useful for _sha_ value)

  </p>
</details>

## Use this action

Add this in your workflow

```yaml
- name: Inject slug/short variables
  uses: rlespinasse/github-slug-action@v3.x
```

Check for more [examples][3] (OS usage, URL use, ...)

**Tip:** Use [Dependabot][14] to maintain your `github-slug-action` version updated in your GitHub workflows.

## Available Environment variables

**Note**: If you don't find what you search for, read more about [available `GitHub` variables](docs/github-variables.md), and propose a [new custom variable][5].

### Slug variables

| Variable                                                                | Slug version of    | Description                                                                               |
| ----------------------------------------------------------------------- | ------------------ | ----------------------------------------------------------------------------------------- |
| [GITHUB_REPOSITORY_SLUG](docs/slug-variables.md#github_repository_slug) | GITHUB_REPOSITORY  | The owner and repository name.                                                            |
| [GITHUB_REF_SLUG](docs/slug-variables.md#github_ref_slug)               | GITHUB_REF         | The branch or tag ref that triggered the workflow.                                        |
| [GITHUB_HEAD_REF_SLUG](docs/slug-variables.md#github_head_ref_slug)     | GITHUB_HEAD_REF    | The branch of the head repository.<br>Only set for forked repositories.                   |
| [GITHUB_BASE_REF_SLUG](docs/slug-variables.md#github_base_ref_slug)     | GITHUB_BASE_REF    | The branch of the base repository.<br>Only set for forked repositories.                   |
| [GITHUB_EVENT_REF_SLUG](docs/slug-variables.md#github_event_ref_slug)   | _github.event.ref_ | <br>Only set for [following webhook events][4]<ul><li>`create`</li><li>`delete`</li></ul> |

### Slug URL variables

| Variable                                                                            | Slug version of    | Description                                                                               |
| ----------------------------------------------------------------------------------- | ------------------ | ----------------------------------------------------------------------------------------- |
| [GITHUB_REPOSITORY_SLUG_URL](docs/slug-url-variables.md#github_repository_slug_url) | GITHUB_REPOSITORY  | The owner and repository name.                                                            |
| [GITHUB_REF_SLUG_URL](docs/slug-url-variables.md#github_ref_slug_url)               | GITHUB_REF         | The branch or tag ref that triggered the workflow.                                        |
| [GITHUB_HEAD_REF_SLUG_URL](docs/slug-url-variables.md#github_head_ref_slug_url)     | GITHUB_HEAD_REF    | The branch of the head repository.<br>Only set for forked repositories.                   |
| [GITHUB_BASE_REF_SLUG_URL](docs/slug-url-variables.md#github_base_ref_slug_url)     | GITHUB_BASE_REF    | The branch of the base repository.<br>Only set for forked repositories.                   |
| [GITHUB_EVENT_REF_SLUG_URL](docs/slug-url-variables.md#github_event_ref_slug_url)   | _github.event.ref_ | <br>Only set for [following webhook events][4]<ul><li>`create`</li><li>`delete`</li></ul> |

### Short variables

| Variable                                                                                                             | Short version of                             | Description                                                                                                                                                                                                                           |
| -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [GITHUB_SHA_SHORT](docs/short-variables.md#github_sha_short)                                                         | GITHUB_SHA                                   | The commit SHA that triggered the workflow.                                                                                                                                                                                           |
| [GITHUB_EVENT<br>_PULL_REQUEST<br>_HEAD_SHA_SHORT](docs/short-variables.md#github_event_pull_request_head_sha_short) | _github.event<br>.pull_request<br>.head.sha_ | The commit SHA on pull request that trigger workflow.<br>Only set for [following webhook events][4]<ul><li>`pull_request`</li><li>`pull_request_review`</li><li>`pull_request_review_comment`</li><li>`pull_request_target`</li></ul> |

## Contribute

Follow [Developers guide](DEVELOPERS.md)

## Troubleshooting

### One of environement variable don't work as intended

[**Note**][17]: GitHub reserves the `GITHUB_` environment variable prefix for internal use by GitHub. Setting an environment variable or secret with the `GITHUB_` prefix will result in an error.

Currently, a GitHub workflow setting a `GITHUB_` variable don't ended up in error.
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
      # print "refs/heads/v3.x"
      - run: echo "GITHUB_REF=one_value" >> "$GITHUB_ENV"
      - run: echo ${GITHUB_REF}
      # print "refs/heads/v3.x"
      - run: echo "GITHUB_REF_SLUG=another_value" >> "$GITHUB_ENV"
      - run: echo ${GITHUB_REF_SLUG}
      # print "another_value"
```

  </p>
</details>

### An action could not be found at the URI

If your workflow fail on the `Set up job` task with this kind of log :

```text
Download action repository 'rlespinasse/github-slug-action@master'
##[error]An action could not be found at the URI 'https://api.github.com/repos/rlespinasse/github-slug-action/tarball/master'
```

> The master branch don't exists anymore.
>
> The master branch EOL have been set to **2020-10-25** after a 6-month deprecation period (more information on the [EOL issue][7])

Please, use the current branch `v3.x` or a version tag (see [releases pages][6]) in order to fix your workflow.

## Thanks for talking about us

- [Mettre en place une CI/CD Angular avec GitHub Actions & Netlify][15] (in french :fr:)
- [Github Actions : enfin des pipelines accessibles aux développeurs][16] (in french :fr:)
- The next one is you. _Don't hesitate to add you to this list._

[1]: https://github.com/rlespinasse/github-slug-action/workflows/Build/badge.svg
[2]: https://github.com/rlespinasse/github-slug-action/actions
[3]: https://github.com/rlespinasse/github-slug-action/tree/v3.x/examples
[4]: https://docs.github.com/en/developers/webhooks-and-events/webhook-events-and-payloads
[5]: https://github.com/rlespinasse/github-slug-action/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=
[6]: https://github.com/rlespinasse/github-slug-action/releases
[7]: https://github.com/rlespinasse/github-slug-action/issues/15
[8]: https://img.shields.io/endpoint?url=https%3A%2F%2Fapi-git-master.endbug.vercel.app%2Fapi%2Fgithub-actions%2Fused-by%3Faction%3Drlespinasse%2Fgithub-slug-action%26badge%3Dtrue
[9]: https://github.com/search?o=desc&q=rlespinasse/github-slug-action+path%3A.github%2Fworkflows+language%3AYAML&s=&type=Code
[10]: https://docs.github.com/en/free-pro-team@latest/actions/reference/environment-variables#default-environment-variables
[11]: https://img.shields.io/github/license/rlespinasse/github-slug-action
[12]: https://github.com/rlespinasse/github-slug-action/blob/v3.x/LICENSE
[13]: https://github.com/rlespinasse/github-slug-action/workflows/Lint/badge.svg
[14]: https://docs.github.com/en/free-pro-team@latest/github/administering-a-repository/keeping-your-actions-up-to-date-with-github-dependabot
[15]: https://esensconsulting.medium.com/mettre-en-place-une-ci-cd-angular-avec-github-actions-netlify-ca0b59b99ed8
[16]: https://www.youtube.com/watch?v=RHnTJBwcE98
[17]:
https://docs.github.com/en/actions/reference/environment-variables#naming-conventions-for-environment-variables
