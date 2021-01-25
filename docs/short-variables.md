# Short Variables

## Table of Contents

- [Short Variables](#short-variables)
  - [Table of Contents](#table-of-contents)
  - [GITHUB_SHA_SHORT](#github_sha_short)
  - [GITHUB_EVENT_PULL_REQUEST_HEAD_SHA_SHORT](#github_event_pull_request_head_sha_short)

## GITHUB_SHA_SHORT

Short the environment variable **GITHUB_SHA**

The commit SHA that triggered the workflow

| GITHUB_SHA                               | GITHUB_SHA_SHORT |
| ---------------------------------------- | ---------------- |
| ffac537e6cbbf934b08745a378932722df287a53 | ffac537e         |

## GITHUB_EVENT_PULL_REQUEST_HEAD_SHA_SHORT

Short the value of `github.event.pull_request.head.sha` that represents the last commit
used for triggering an action for a pull request.

| github.event.pull_request.head.sha       | GITHUB_EVENT_PULL_REQUEST_HEAD_SHA_SHORT |
| ---------------------------------------- | ---------------------------------------- |
| ffac537e6cbbf934b08745a378932722df287a53 | ffac537e                                 |
