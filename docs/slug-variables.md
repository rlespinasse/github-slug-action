# Slug Variables

## Table of Contents

- [Slug Variables](#slug-variables)
  - [Table of Contents](#table-of-contents)
  - [GITHUB_REPOSITORY_SLUG](#github_repository_slug)
  - [GITHUB_REPOSITORY_OWNER_PART_SLUG](#github_repository_owner_part_slug)
  - [GITHUB_REPOSITORY_NAME_PART_SLUG](#github_repository_name_part_slug)
  - [GITHUB_REF_SLUG](#github_ref_slug)
  - [GITHUB_HEAD_REF_SLUG](#github_head_ref_slug)
  - [GITHUB_BASE_REF_SLUG](#github_base_ref_slug)
  - [GITHUB_EVENT_REF_SLUG](#github_event_ref_slug)

## GITHUB_REPOSITORY_SLUG

Slug the environment variable **GITHUB_REPOSITORY**

The owner and repository name.

| GITHUB_REPOSITORY            | GITHUB_REPOSITORY_SLUG       |
| ---------------------------- | ---------------------------- |
| octocat/Hello-World          | octocat-hello-world          |
| rlespinasse/Hello-World.go   | rlespinasse-hello-world.go   |
| AnotherPerson/SomeRepository | anotherperson-somerepository |

## GITHUB_REPOSITORY_OWNER_PART_SLUG

Slug the environment variable [GITHUB_REPOSITORY_OWNER_PART](partial-variables.md#github_repository_owner_part)

The Owner part of **GITHUB_REPOSITORY** variable.

| GITHUB_REPOSITORY_OWNER_PART | GITHUB_REPOSITORY_OWNER_PART_SLUG |
| ---------------------------- | --------------------------------- |
| octocat                      | octocat                           |
| rlespinasse                  | rlespinasse                       |
| AnotherPerson                | anotherperson                     |

## GITHUB_REPOSITORY_NAME_PART_SLUG

Slug the environment variable [GITHUB_REPOSITORY_NAME_PART](partial-variables.md#github_repository_name_part)

The Repository name part of **GITHUB_REPOSITORY** variable.

| GITHUB_REPOSITORY_NAME_PART | GITHUB_REPOSITORY_NAME_PART_SLUG |
| --------------------------- | -------------------------------- |
| Hello-World                 | hello-world                      |
| Hello-World.go              | hello-world.go                   |
| SomeRepository              | somerepository                   |

## GITHUB_REF_SLUG

Slug the environment variable **GITHUB_REF**

The branch or tag ref that triggered the workflow.
_If neither a branch or tag is available for the event type, the variable will not exist._

| GITHUB_REF                     | GITHUB_REF_SLUG     |
| ------------------------------ | ------------------- |
| refs/heads/main                | main                |
| refs/heads/feat/new_feature    | feat-new-feature    |
| refs/tags/v1.0.0               | v1.0.0              |
| refs/tags/product@1.0.0-rc.2   | product-1.0.0-rc.2  |
| refs/heads/New_Awesome_Product | new-awesome-product |

## GITHUB_HEAD_REF_SLUG

Slug the environment variable **GITHUB_HEAD_REF**

The branch of the head repository.
_Only set for [`pull-request`][1] event and forked repositories._

| GITHUB_REF                     | GITHUB_HEAD_REF_SLUG |
| ------------------------------ | -------------------- |
| refs/heads/main                | main                 |
| refs/heads/feat/new_feature    | feat-new-feature     |
| refs/heads/New_Awesome_Product | new-awesome-product  |

## GITHUB_BASE_REF_SLUG

Slug the environment variable **GITHUB_BASE_REF**

The branch of the base repository.
_Only set for [`pull-request`][1] event and forked repositories._

| GITHUB_REF                     | GITHUB_HEAD_REF_SLUG |
| ------------------------------ | -------------------- |
| refs/heads/main                | main                 |
| refs/heads/feat/new_feature    | feat-new-feature     |
| refs/heads/New_Awesome_Product | new-awesome-product  |

## GITHUB_EVENT_REF_SLUG

Slug the variable **github.event.ref**

The git reference resource associated to triggered webhook.
_Only set for [`create`, and `delete`][1] events._

| GITHUB_REF                     | GITHUB_HEAD_REF_SLUG |
| ------------------------------ | -------------------- |
| refs/heads/main                | main                 |
| refs/heads/feat/new_feature    | feat-new-feature     |
| refs/heads/New_Awesome_Product | new-awesome-product  |

[1]: https://docs.github.com/en/developers/webhooks-and-events/webhook-events-and-payloads
