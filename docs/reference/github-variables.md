# Available GitHub Variables

All GitHub variables available in your workflow in addition to ones exposed by this action.

## Default Environment Variables

Read the official documentation about [Default environment variables][1].

### Action-managed Environment Variables

| Action-managed Variables | Can be suffixed by |
| ------------------------ | ------------------ |
| GITHUB_REPOSITORY | `_SLUG`, `_SLUG_URL` |
| GITHUB_REF | `_SLUG`, `_SLUG_URL` |
| GITHUB_REF_NAME | `_SLUG`, `_SLUG_URL` |
| GITHUB_HEAD_REF | `_SLUG`, `_SLUG_URL` |
| GITHUB_BASE_REF | `_SLUG`, `_SLUG_URL` |
| GITHUB_SHA | `_SHORT` |

## Variables from Events

Read the official documentation about [Events that trigger workflows][2].

### Action-managed Event Variables

#### create

Checkout [create][3] webhook payload content

| Action-managed Variables | Available as |
| ------------------------ | ------------ |
| github.event.ref | GITHUB_EVENT_REF_SLUG |
| github.event.ref | GITHUB_EVENT_REF_SLUG_URL |

#### delete

Checkout [delete][4] webhook payload content

| Action-managed Variables | Available as |
| ------------------------ | ------------ |
| github.event.ref | GITHUB_EVENT_REF_SLUG |
| github.event.ref | GITHUB_EVENT_REF_SLUG_URL |

#### pull_request

Checkout [pull_request][5] webhook payload content

| Action-managed Variables | Available as |
| ------------------------ | ------------ |
| github.event.pull_request.head.sha | GITHUB_EVENT_PULL_REQUEST_HEAD_SHA_SHORT |

#### pull_request_review

Checkout [pull_request_review][6] webhook payload content

| Action-managed Variables | Available as |
| ------------------------ | ------------ |
| github.event.pull_request.head.sha | GITHUB_EVENT_PULL_REQUEST_HEAD_SHA_SHORT |

#### pull_request_review_comment

Checkout [pull_request_review_comment][7] webhook payload content

| Action-managed Variables | Available as |
| ------------------------ | ------------ |
| github.event.pull_request.head.sha | GITHUB_EVENT_PULL_REQUEST_HEAD_SHA_SHORT |

#### pull_request_target

Checkout [pull_request][5] webhook payload content

| Action-managed Variables | Available as |
| ------------------------ | ------------ |
| github.event.pull_request.head.sha | GITHUB_EVENT_PULL_REQUEST_HEAD_SHA_SHORT |

## See also

- [Variable reference](variables.md) for transformation examples
- [Slug transformation rules](../explanation/slug-transformation-rules.md) for how transformations work

[1]: https://docs.github.com/en/actions/reference/environment-variables#default-environment-variables
[2]: https://docs.github.com/en/actions/reference/events-that-trigger-workflows
[3]: https://docs.github.com/en/developers/webhooks-and-events/webhook-events-and-payloads#create
[4]: https://docs.github.com/en/developers/webhooks-and-events/webhook-events-and-payloads#delete
[5]: https://docs.github.com/en/developers/webhooks-and-events/webhook-events-and-payloads#pull_request
[6]: https://docs.github.com/en/developers/webhooks-and-events/webhook-events-and-payloads#pull_request_review
[7]: https://docs.github.com/en/developers/webhooks-and-events/webhook-events-and-payloads#pull_request_review_comment
