# Slug URL Variables

## Table of Contents

- [Slug URL Variables](#slug-url-variables)
  - [Table of Contents](#table-of-contents)
  - [GITHUB_REPOSITORY_SLUG_URL](#github_repository_slug_url)
  - [GITHUB_REPOSITORY_OWNER_PART_SLUG_URL](#github_repository_owner_part_slug_url)
  - [GITHUB_REPOSITORY_NAME_PART_SLUG_URL](#github_repository_name_part_slug_url)
  - [GITHUB_REF_SLUG_URL](#github_ref_slug_url)
  - [GITHUB_HEAD_REF_SLUG_URL](#github_head_ref_slug_url)
  - [GITHUB_BASE_REF_SLUG_URL](#github_base_ref_slug_url)
  - [GITHUB_EVENT_REF_SLUG_URL](#github_event_ref_slug_url)

## GITHUB_REPOSITORY_SLUG_URL

Slug URL the environment variable **GITHUB_REPOSITORY**

The owner and repository name.

| GITHUB_REPOSITORY            | GITHUB_REPOSITORY_SLUG_URL   |
| ---------------------------- | ---------------------------- |
| octocat/Hello-World          | octocat-hello-world          |
| rlespinasse/Hello-World.go   | rlespinasse-hello-world-go   |
| AnotherPerson/SomeRepository | anotherperson-somerepository |

## GITHUB_REPOSITORY_OWNER_PART_SLUG_URL

Slug URL the environment variable [GITHUB_REPOSITORY_OWNER_PART](partial-variables.md#github_repository_owner_part)

The Owner part of **GITHUB_REPOSITORY** variable.

| GITHUB_REPOSITORY_OWNER_PART | GITHUB_REPOSITORY_OWNER_PART_SLUG_URL |
| ---------------------------- | ------------------------------------- |
| octocat                      | octocat                               |
| rlespinasse                  | rlespinasse                           |
| AnotherPerson                | anotherperson                         |

## GITHUB_REPOSITORY_NAME_PART_SLUG_URL

Slug URL the environment variable [GITHUB_REPOSITORY_NAME_PART](partial-variables.md#github_repository_name_part)

The Repository name part of **GITHUB_REPOSITORY** variable.

| GITHUB_REPOSITORY_NAME_PART | GITHUB_REPOSITORY_NAME_PART_SLUG_URL |
| --------------------------- | ------------------------------------ |
| Hello-World                 | hello-world                          |
| Hello-World.go              | hello-world-go                       |
| SomeRepository              | somerepository                       |

## GITHUB_REF_SLUG_URL

Slug URL the environment variable **GITHUB_REF**

The branch or tag ref that triggered the workflow.
_If neither a branch or tag is available for the event type, the variable will not exist._

| GITHUB_REF                     | GITHUB_REF_SLUG_URL |
| ------------------------------ | ------------------- |
| refs/heads/main                | main                |
| refs/heads/feat/new_feature    | feat-new-feature    |
| refs/tags/v1.0.0               | v1-0-0              |
| refs/pull/42-merge             | 42-merge            |
| refs/tags/product@1.0.0-rc.2   | product-1-0-0-rc-2  |
| refs/heads/New_Awesome_Product | new-awesome-product |

**Caution**: From v3.0.0 to v3.2.0 included, `GITHUB_REF_SLUG` have the wrong value on `pull_request` event.
`refs/pull/42-merge` become `refs-pull-42-merge` instead of `42-merge`. The bug have been fixed in v3.3.0

## GITHUB_HEAD_REF_SLUG_URL

Slug URL the environment variable **GITHUB_HEAD_REF**

The branch of the head repository.
_Only set for forked repositories._

| GITHUB_REF                     | GITHUB_HEAD_REF_SLUG_URL |
| ------------------------------ | ------------------------ |
| refs/heads/main                | main                     |
| refs/heads/feat/new_feature    | feat-new-feature         |
| refs/heads/New_Awesome_Product | new-awesome-product      |

## GITHUB_BASE_REF_SLUG_URL

Slug URL the environment variable **GITHUB_BASE_REF**

The branch of the base repository.
_Only set for forked repositories._

| GITHUB_REF                     | GITHUB_HEAD_REF_SLUG_URL |
| ------------------------------ | ------------------------ |
| refs/heads/main                | main                     |
| refs/heads/feat/new_feature    | feat-new-feature         |
| refs/heads/New_Awesome_Product | new-awesome-product      |

## GITHUB_EVENT_REF_SLUG_URL

Slug URL the variable **github.event.ref**

The git reference resource associated to triggered webhook.
_Only set for [`create`, and `delete`][1] events._

| GITHUB_REF                     | GITHUB_HEAD_REF_SLUG_URL |
| ------------------------------ | ------------------------ |
| refs/heads/main                | main                     |
| refs/heads/feat/new_feature    | feat-new-feature         |
| refs/heads/New_Awesome_Product | new-awesome-product      |

[1]: https://docs.github.com/en/developers/webhooks-and-events/webhook-events-and-payloads
