# Available GitHub Variables

All `GitHub` variables availables in your workflow in addition of ones exposed by this Action

## Table of Contents

- [Available GitHub Variables](#available-github-variables)
  - [Table of Contents](#table-of-contents)
  - [Default environment variables](#default-environment-variables)
    - [Action-managed Environment Variables](#action-managed-environment-variables)
  - [Variables from events](#variables-from-events)
    - [Action-managed Event Variables](#action-managed-event-variables)
      - [create](#create)
      - [delete](#delete)
      - [pull_request](#pull_request)
      - [pull_request_review](#pull_request_review)
      - [pull_request_review_comment](#pull_request_review_comment)
      - [pull_request_target](#pull_request_target)

## Default environment variables

Read the official documentation about [Default environment variables][1].

### Action-managed Environment Variables

| Action-managed Variables | Can be suffix by     |
| ------------------------ | -------------------- |
| GITHUB_REPOSITORY        | `_SLUG`, `_SLUG_URL` |
| GITHUB_REF               | `_SLUG`, `_SLUG_URL` |
| GITHUB_HEAD_REF          | `_SLUG`, `_SLUG_URL` |
| GITHUB_BASE_REF          | `_SLUG`, `_SLUG_URL` |
| GITHUB_SHA               | `_SHORT`             |

## Variables from events

Read the official documentation about [Events that trigger workflows][2].

### Action-managed Event Variables

#### create

Checkout [create][3] webhook payload content

| Action-managed Variables | Available as              |
| ------------------------ | ------------------------- |
| github.event.ref         | GITHUB_EVENT_REF_SLUG     |
| github.event.ref         | GITHUB_EVENT_REF_SLUG_URL |

#### delete

Checkout [delete][4] webhook payload content

| Action-managed Variables | Available as              |
| ------------------------ | ------------------------- |
| github.event.ref         | GITHUB_EVENT_REF_SLUG     |
| github.event.ref         | GITHUB_EVENT_REF_SLUG_URL |

#### pull_request

Checkout [pull_request][5] webhook payload content

| Action-managed Variables           | Available as                             |
| ---------------------------------- | ---------------------------------------- |
| github.event.pull_request.head.sha | GITHUB_EVENT_PULL_REQUEST_HEAD_SHA_SHORT |

#### pull_request_review

Checkout [pull_request_review][6] webhook payload content

| Action-managed Variables           | Available as                             |
| ---------------------------------- | ---------------------------------------- |
| github.event.pull_request.head.sha | GITHUB_EVENT_PULL_REQUEST_HEAD_SHA_SHORT |

#### pull_request_review_comment

Checkout [pull_request_review_comment][7] webhook payload content

| Action-managed Variables           | Available as                             |
| ---------------------------------- | ---------------------------------------- |
| github.event.pull_request.head.sha | GITHUB_EVENT_PULL_REQUEST_HEAD_SHA_SHORT |

#### pull_request_target

Checkout [pull_request][5] webhook payload content

| Action-managed Variables           | Available as                             |
| ---------------------------------- | ---------------------------------------- |
| github.event.pull_request.head.sha | GITHUB_EVENT_PULL_REQUEST_HEAD_SHA_SHORT |

[1]: https://docs.github.com/en/actions/reference/environment-variables#default-environment-variables
[2]: https://docs.github.com/en/actions/reference/events-that-trigger-workflows
[3]: https://docs.github.com/en/developers/webhooks-and-events/webhook-events-and-payloads#create
[4]: https://docs.github.com/en/developers/webhooks-and-events/webhook-events-and-payloads#delete
[5]: https://docs.github.com/en/developers/webhooks-and-events/webhook-events-and-payloads#pull_request
[6]: https://docs.github.com/en/developers/webhooks-and-events/webhook-events-and-payloads#pull_request_review
[7]: https://docs.github.com/en/developers/webhooks-and-events/webhook-events-and-payloads#pull_request_review_comment
