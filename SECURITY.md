# Security Policy

## Supported Versions and Branches

We only support 2 major versions for security patches

| Version | Branch | Supported          | Specific Tags |
| ------- | ------ | ------------------ | ------------- |
| 4.x     | v4.x   | :white_check_mark: | v4            |
| 3.x     | v3.x   | :white_check_mark: |               |
| < 2.x   |        | :x:                | v2.x, v1.1.x  |

A GitHub repository can used one of the available branches as action inside its workflows.

### End of Life of a branch

When a branch is not supported anymore, the following process occurs

- Since `v4.x` branch, the branch will be deleted 2 major versions after
  - So `v4.x` branch will be deleted when `v7.x` branch will have its first release
  - prefer the `v4` tag to `v4.x` branch as reference in our workflow, 
- Before `v4.x` branch, the branch will be converted into a tag when the support is dropped
  - So `v3.x` branch will be converted as tag when `v5.x` branch will have its first release

## Reporting a Vulnerability

You can report a Vulnerability by creating a (https://github.com/rlespinasse/github-slug-action/security/advisories)[draft security advisory] in this project.

If the vulnerability is confirm, a fix will be produce and the advisory will be publish.
