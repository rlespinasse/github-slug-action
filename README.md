# GitHub Slug action

This GitHub Action will expose the slug/short values of [some GitHub environment variables][default-environment-variables] inside your GitHub workflow.

## Table of Contents

- [GitHub Slug action](#github-slug-action)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Use this action](#use-this-action)
    - [Migration from previous versions](#migration-from-previous-versions)
  - [Available Environment variables](#available-environment-variables)
    - [Enhanced variables](#enhanced-variables)
    - [Partial variables](#partial-variables)
    - [Slug variables](#slug-variables)
    - [Slug URL variables](#slug-url-variables)
    - [Short variables](#short-variables)
  - [Troubleshooting](#troubleshooting)
    - [The SHORT variables doesn't have the same lengths as before](#the-short-variables-doesnt-have-the-same-lengths-as-before)
    - [One of the environment variables doesn't work as intended](#one-of-the-environment-variables-doesnt-work-as-intended)
      - [Known environment variable conflicts](#known-environment-variable-conflicts)
        - [GITHUB_REF_NAME](#github_ref_name)
    - [An action could not be found at the URI](#an-action-could-not-be-found-at-the-uri)
  - [Thanks for talking about us](#thanks-for-talking-about-us)

## Overview

`SLUG` on a variable will

- put the variable content in lower case
- replace any character by `-` except `0-9`, `a-z`, `.`, and `_`
- remove leading `-` characters
- limit the string size to 63 characters
- remove trailing `-` characters

<details>
  <summary>Others <b>Slug-ish</b> commands are available</summary>
  <p>

- `SLUG_URL` on a variable to have a `slug` variable compliant to be used in an URL
  - Like `SLUG` but `.`, and `_` are also replaced by `-`
- `SHORT` on a variable will limit the string size to ~8 characters
  - Useful for _sha_ value
- `<KEY>_PART` on a variable will give a part of a variable defined by a key
  - Like `GITHUB_REPOSITORY_OWNER_PART` for the owner part of `GITHUB_REPOSITORY`
- `<VAR>_CS` on others variables to keep the value case-sensitive
  - Like `GITHUB_REF_SLUG_CS`

Additional enhanced environment variables can be compute to help you around GitHub environment variables.
  </p>
</details>

## Use this action

Add this in your workflow

```yaml
- name: Inject slug/short variables
  uses: rlespinasse/github-slug-action@v4
```

<details>
  <summary>Others configurations</summary>
  <p>

- With a prefix

  ```yaml
  - name: Inject slug/short variables
    uses: rlespinasse/github-slug-action@v4
    with:
      prefix: CI_
  ```

- With another max length for slug values

  ```yaml
  - name: Inject slug/short variables
    uses: rlespinasse/github-slug-action@v4
    with:
      slug-maxlength: 80 # Use 'nolimit' to remove use of a max length (Default to 63)
  ```

- With another length for short values

  ```yaml
  - name: Inject slug/short variables
    uses: rlespinasse/github-slug-action@v4
    with:
      short-length: 7 # By default it's up to git to decide, use 8 to have the v3.x behavior
  ```

  **Warning**: If you leave it empty, you need to checkout the source first in order to let git decide the size by itself.
  </p>
</details>

Check for more [examples][examples] (OS usage, URL use, ...)

**Tip:** Use [Dependabot][dependabot] to maintain your `github-slug-action` version updated in your GitHub workflows.

### Migration from previous versions

The short sha length is not the same as previous version.

- `v4` let git configuration decide of it (but you can override it),
- `v3` and before, it's always a length of 8 characters.

So to reproduce previous behavior, use

```yaml
- name: Inject slug/short variables
  uses: rlespinasse/github-slug-action@v4
  with:
    short-length: 8 # Same as v3 and before
```

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

### The SHORT variables doesn't have the same lengths as before

Since `v4`, it's git who manage the short variables by using [git rev-parse][git-revparse] behaviour.
The length of a short sha depends of the size of our repository and can differ over time.

To manage that moving length, you can use `short-length` input

- set `7` to reproduce `small repository` behavior
- set `8` to reproduce `v3` behavior

**Warning**: The minimum length is 4, the default is the effective value of the [core.abbrev][git-core-abbrev] configuration variable.

### One of the environment variables doesn't work as intended

[**Note**][naming-conventions]: When you set a custom environment variable, you cannot use any of the default environment variable names. For a complete list of these, see [Default environment variables][default-environment-variables]. **If you attempt to override the value of one of these default environment variables, the assignment is ignored.**

If a variable start to be used as default environment variable, the environment variable may have a different behavior than the expected one.

If this append, the `${{ env.GITHUB_AWESOME_VARIABLE }}` and `$GITHUB_AWESOME_VARIABLE` expression will not works in the same way.

- `${{ env.GITHUB_AWESOME_VARIABLE }}` will serve the behavior of this action,
- `$GITHUB_AWESOME_VARIABLE` will serve the behavior of GitHub Action.

Otherwise the two expression will serve the behavior of this action.
This will not occurs if you use the `prefix` input to avoid the issue.

**NOTE:** If detected, the maintainers of this action will choose the best course of action depending of the impact.

#### Known environment variable conflicts

##### GITHUB_REF_NAME

The behavior is the same as the GitHub one except on `pull_request*` workflows ([Ready the full story][issue-104]).

- `${{ env.GITHUB_REF_NAME }}` will serve the behavior of this action,
- `$GITHUB_REF_NAME` will serve the behavior of GitHub Action.

On `pull_request*` workflows, the content will be `<PR-number>/merge` instead of the branch name.

A possible workaround is to use `prefix` input

```yaml
- name: Inject slug/short variables
  uses: rlespinasse/github-slug-action@v4
  with:
    prefix: CI_
```

Then `${{ env.CI_GITHUB_REF_NAME }}`, and `$CI_GITHUB_REF_NAME` will serve the behavior of this action.
And `$GITHUB_REF_NAME` will serve the behavior of GitHub Action.

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
- [Action spotlight by Michael Heap][article-2]
- [Serverless Deploy Previews on GitHub Actions][article-3]
- [Let's Build a Continuous Delivery and Branching Process with Github Actions, Vercel and Heroku][article-4]
- [利用github-slug-action暴漏Github Action上下文中的关键变量][article-5](in chinese :cn:​)
- [Github Actions : enfin des pipelines accessibles aux développeurs][talk-1] (in french :fr:)
- The next one is you. _Don't hesitate to add youself to this list._

[examples]: https://github.com/rlespinasse/github-slug-action/tree/v4.x/examples
[custom-variable]: https://github.com/rlespinasse/github-slug-action/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=
[releases]: https://github.com/rlespinasse/github-slug-action/releases
[issue-15]: https://github.com/rlespinasse/github-slug-action/issues/15
[issue-104]: https://github.com/rlespinasse/github-slug-action/issues/104

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
