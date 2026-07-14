# GitHub Slug Action

This GitHub Action exposes slug and short values of [GitHub environment variables][default-environment-variables] inside your workflow.

## Quick Start

```yaml
steps:
  - uses: actions/checkout@v6
  - name: Inject enhanced GitHub environment variables
    uses: rlespinasse/github-slug-action@v5
```

> [!CAUTION]
> Use [Dependabot][dependabot] to maintain your `github-slug-action` version updated in your GitHub workflows.

## What It Does

- **SLUG** -- Lowercase, replace special characters with `-`, limit to 63 characters. _Dots and underscores preserved._
- **SLUG_URL** -- Same as SLUG, but dots and underscores are also replaced. _Safe for URLs and subdomains._
- **SHORT** -- Shorten Git SHA values to a unique prefix.
- **PART** -- Extract portions of a variable (e.g., owner or repository name from `GITHUB_REPOSITORY`).
- **_CS** -- Case-sensitive variants of SLUG and SLUG_URL (original casing preserved).

> [!TIP]
> Read the [slug transformation rules](docs/explanation/slug-transformation-rules.md) for the full algorithm and rationale.

## Inputs

| Input | Default | Description |
| ----- | ------- | ----------- |
| `prefix` | `""` | Value prepended to each generated variable name |
| `slug-maxlength` | `63` | Max length of slugified values (`"nolimit"` to disable) |
| `short-length` | _(Git default)_ | Length of short SHA values (minimum `4`) |

See the [inputs reference](docs/reference/inputs.md) for details.

## Available Variables

| Variable | Type | Description |
| -------- | ---- | ----------- |
| [GITHUB_REF_POINT](docs/reference/variables.md#github_ref_point) | Enhanced | Branch or tag name (consistent across event types) |
| [GITHUB_REPOSITORY_OWNER_PART](docs/reference/variables.md#github_repository_owner_part) | Partial | Owner extracted from repository |
| [GITHUB_REPOSITORY_NAME_PART](docs/reference/variables.md#github_repository_name_part) | Partial | Repository name extracted from repository |
| [GITHUB_REPOSITORY_SLUG](docs/reference/variables.md#github_repository_slug) | Slug | The owner and repository name |
| [GITHUB_REF_SLUG](docs/reference/variables.md#github_ref_slug) | Slug | The branch or tag ref |
| [GITHUB_REF_NAME_SLUG](docs/reference/variables.md#github_ref_name_slug) | Slug | The branch or tag name shown on GitHub |
| [GITHUB_HEAD_REF_SLUG](docs/reference/variables.md#github_head_ref_slug) | Slug | PR head branch |
| [GITHUB_BASE_REF_SLUG](docs/reference/variables.md#github_base_ref_slug) | Slug | PR base branch |
| [GITHUB_EVENT_REF_SLUG](docs/reference/variables.md#github_event_ref_slug) | Slug | Webhook Git ref |
| [GITHUB_SHA_SHORT](docs/reference/variables.md#github_sha_short) | Short | Shortened commit SHA |
| [GITHUB_EVENT_PULL_REQUEST_HEAD_SHA_SHORT](docs/reference/variables.md#github_event_pull_request_head_sha_short) | Short | Shortened PR head commit SHA |

All slug variables also have `_SLUG_URL` and `_CS` variants. See the [full variable reference](docs/reference/variables.md).

> [!TIP]
> If you don't find what you need, read about [available GitHub variables](docs/reference/github-variables.md), [propose a new variable][custom-variable], or use [slugify-value][slugify-value] / [shortify-git-revision][shortify-git-revision] directly.

## Documentation

### Tutorial

- [Getting started](docs/getting-started.md) -- Step-by-step guide for first-time users

### How-To Guides

- [Use a prefix](docs/how-to/use-prefix.md)
- [Configure slug max length](docs/how-to/configure-slug-maxlength.md)
- [Configure short SHA length](docs/how-to/configure-short-length.md)
- [Use slug variables in URLs](docs/how-to/use-slugs-in-urls.md)
- More [workflow examples](https://github.com/rlespinasse/github-slug-action/tree/v5.x/examples) (OS-specific usage, URL patterns)

### Reference

- [Variable reference](docs/reference/variables.md) -- All variables with transformation examples
- [Inputs reference](docs/reference/inputs.md) -- Action inputs specification
- [GitHub variables by event](docs/reference/github-variables.md) -- Which variables are available per event type

### Explanation

- [Slug transformation rules](docs/explanation/slug-transformation-rules.md) -- How and why transformations work

## Migration

- [Migrate from v4 to v5](docs/how-to/migrate-v4-to-v5.md) -- `GITHUB_REF_NAME` behaviour changed on pull request events
- [Migrate from v3 to v4](docs/how-to/migrate-v3-to-v4.md) -- Short SHA length is now determined by Git

## Troubleshooting

See the [troubleshooting guide](docs/how-to/troubleshooting.md) for common issues and solutions.

## Thanks for talking about us

In English :gb:

- [Action spotlight by Michael Heap][article-2]
- [Serverless Deploy Previews on GitHub Actions][article-3]
- [Let's Build a Continuous Delivery and Branching Process with GitHub Actions, Vercel and Heroku][article-4]

In French :fr:

- [Mettre en place une CI/CD Angular avec GitHub Actions & Netlify][article-1]
- [GitHub Actions : enfin des pipelines accessibles aux développeurs][talk-1]
- [GitHub-slug-action : 5 ans d'open source pour cette GitHub Action essentielle au CI/CD][article-6]

In Chinese :cn:

- [利用github-slug-action暴漏GitHub Action上下文中的关键变量][article-5]

> The next one is you. _Don't hesitate to add yourself to one of these lists._

[custom-variable]: https://github.com/rlespinasse/github-slug-action/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=

[slugify-value]: https://github.com/rlespinasse/slugify-value
[shortify-git-revision]: https://github.com/rlespinasse/shortify-git-revision

[default-environment-variables]: https://docs.github.com/en/actions/reference/workflows-and-actions/variables#default-environment-variables
[dependabot]: https://docs.github.com/en/code-security/dependabot/working-with-dependabot/keeping-your-actions-up-to-date-with-dependabot

[article-1]: https://esensconsulting.medium.com/mettre-en-place-une-ci-cd-angular-avec-github-actions-netlify-ca0b59b99ed8
[article-2]: https://michaelheap.com/github-slug-action/
[article-3]: https://barstool.engineering/serverless-deploy-previews-on-github-actions/
[article-4]: https://javascript.plainenglish.io/lets-build-a-continuous-delivery-and-branching-process-c27dae09f0b6
[article-5]: https://eryajf.github.io/HowToStartOpenSource/views/03-github-tips/10-Use-github-slug-action-to-leak-key-variables-in-the-Github-Action-context.html
[article-6]: https://www.sfeir.dev/5-ans-de-github-slug-action-une-aventure-open-source/
[talk-1]: https://www.youtube.com/watch?v=F5mBDmOQcvE
