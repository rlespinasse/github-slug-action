# Security Policy

## Supported Versions and Branches

| Version | Supported          | End of Support | Branch | Specific Tags |
| ------- | ------------------ | -------------- | ------ | ------------- |
| 4.x     | :white_check_mark: |                | v4.x   | v4            |
| 3.x     | :white_check_mark: | 2024-01-31     | v3.x   | v3            |
| 2.x     | :x:                | 2021-04-05     |        | v2.x, 2.2.0   |
| 1.x     | :x:                | 2021-04-05     |        | v1.1.x, 1.2.0 |
| 1.0.x   | :x:                | 2019-11-07     |        | 1.0.2         |

A GitHub repository can used one of the available branches as action inside its workflows.

### End of Life of a branch

Since `2023-10-20`, when a new major version is release,

- The previous one will continue to receive security patches during a 3-months periods,
- After the 3-month periods, the branch is deleted, only the tags remains.

## Reporting a Vulnerability

You can report a Vulnerability by creating a [draft security advisory](https://github.com/rlespinasse/github-slug-action/security/advisories) in this project.

If the vulnerability is confirm, a fix will be produce and the advisory will be publish.
