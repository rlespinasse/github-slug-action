# Slug URL Variables

## Table of Contents

- [Slug URL Variables](#slug-url-variables)
  - [Table of Contents](#table-of-contents)
  - [GITHUB\_REPOSITORY\_SLUG\_URL](#github_repository_slug_url)
  - [GITHUB\_REPOSITORY\_OWNER\_PART\_SLUG\_URL](#github_repository_owner_part_slug_url)
  - [GITHUB\_REPOSITORY\_NAME\_PART\_SLUG\_URL](#github_repository_name_part_slug_url)
  - [GITHUB\_REF\_SLUG\_URL](#github_ref_slug_url)
  - [GITHUB\_REF\_NAME\_SLUG\_URL](#github_ref_name_slug_url)
  - [GITHUB\_HEAD\_REF\_SLUG\_URL](#github_head_ref_slug_url)
  - [GITHUB\_BASE\_REF\_SLUG\_URL](#github_base_ref_slug_url)
  - [GITHUB\_EVENT\_REF\_SLUG\_URL](#github_event_ref_slug_url)

## GITHUB_REPOSITORY_SLUG_URL

Slug URL the environment variable **GITHUB_REPOSITORY**

The owner and repository name.

| GITHUB_REPOSITORY | GITHUB_REPOSITORY_SLUG_URL |
| ----------------- | ---------------------------- |
| octocat/Hello-World | octocat-hello-world |
| rlespinasse/Hello-World.go | rlespinasse-hello-world-go |
| AnotherPerson/SomeRepository | anotherperson-somerepository |

## GITHUB_REPOSITORY_OWNER_PART_SLUG_URL

Slug URL the environment variable [GITHUB_REPOSITORY_OWNER_PART](partial-variables.md#github_repository_owner_part)

The Owner part of **GITHUB_REPOSITORY** variable.

| GITHUB_REPOSITORY_OWNER_PART | GITHUB_REPOSITORY_OWNER_PART_SLUG_URL |
| ---------------------------- | ------------------------------------- |
| octocat | octocat |
| rlespinasse | rlespinasse |
| AnotherPerson | anotherperson |

## GITHUB_REPOSITORY_NAME_PART_SLUG_URL

Slug URL the environment variable [GITHUB_REPOSITORY_NAME_PART](partial-variables.md#github_repository_name_part)

The Repository name part of **GITHUB_REPOSITORY** variable.

| GITHUB_REPOSITORY_NAME_PART | GITHUB_REPOSITORY_NAME_PART_SLUG_URL |
| --------------------------- | ------------------------------------ |
| Hello-World | hello-world |
| Hello-World.go | hello-world-go |
| SomeRepository | somerepository |

## GITHUB_REF_SLUG_URL

Slug URL the environment variable **GITHUB_REF**

The branch or tag ref that triggered the workflow.
_If neither a branch or tag is available for the event type, the variable will not exist._

| GITHUB_REF | GITHUB_REF_SLUG_URL |
| ---------- | ------------------- |
| refs/heads/main | main |
| refs/heads/feat/new_feature | feat-new-feature |
| refs/tags/v1.0.0 | v1-0-0 |
| refs/pull/42/merge | 42-merge |
| refs/tags/product@1.0.0-rc.2 | product-1-0-0-rc-2 |
| refs/heads/New_Awesome_Product | new-awesome-product |

## GITHUB_REF_NAME_SLUG_URL

Slug URL the environment variable **GITHUB_REF_NAME**

The branch or tag ref that triggered the workflow.
_If neither a branch or tag is available for the event type, the variable will not exist._

| GITHUB_REF_NAME | GITHUB_REF_SLUG_URL |
| --------------- | ------------------- |
| refs/heads/main | main |
| refs/heads/feat/new_feature | feat-new-feature |
| refs/tags/v1.0.0 | v1-0-0 |
| refs/pull/42/merge | 42-merge |
| refs/tags/product@1.0.0-rc.2 | product-1-0-0-rc-2 |
| refs/heads/New_Awesome_Product | new-awesome-product |

## GITHUB_HEAD_REF_SLUG_URL

Slug URL the environment variable **GITHUB_HEAD_REF**

The branch of the head repository.
_Only set for forked repositories._

| GITHUB_REF | GITHUB_HEAD_REF_SLUG_URL |
| ---------- | ------------------------ |
| refs/heads/main | main |
| refs/heads/feat/new_feature | feat-new-feature |
| refs/heads/New_Awesome_Product | new-awesome-product |

## GITHUB_BASE_REF_SLUG_URL

Slug URL the environment variable **GITHUB_BASE_REF**

The branch of the base repository.
_Only set for forked repositories._

| GITHUB_REF | GITHUB_HEAD_REF_SLUG_URL |
| ---------- | ------------------------ |
| refs/heads/main | main |
| refs/heads/feat/new_feature | feat-new-feature |
| refs/heads/New_Awesome_Product | new-awesome-product |

## GITHUB_EVENT_REF_SLUG_URL

Slug URL the variable **github.event.ref**

The Git reference resource associated to triggered webhook.
_Only set for [`create`, and `delete`][1] events._

| GITHUB_REF | GITHUB_HEAD_REF_SLUG_URL |
| ---------- | ------------------------ |
| refs/heads/main | main |
| refs/heads/feat/new_feature | feat-new-feature |
| refs/heads/New_Awesome_Product | new-awesome-product |

[1]: https://docs.github.com/en/developers/webhooks-and-events/webhook-events-and-payloads
