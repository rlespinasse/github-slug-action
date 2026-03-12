# Slug Transformation Rules

This page explains the transformation algorithms used by the GitHub Slug Action, why they exist, and how they differ from each other.

## What is a "slug"?

A slug is a human-readable identifier derived from a string, safe for use in URLs, file names, DNS labels, and other contexts where special characters are problematic. The term originates from publishing, where a "slug" is a short label used to identify a piece of content.

In CI/CD workflows, branch names, tag names, and repository names often contain characters (`/`, `@`, spaces) that break when used in URLs, Docker tags, Kubernetes labels, or file paths. Slugifying these values makes them safe for such contexts.

## SLUG transformation

The `SLUG` transformation applies the following steps in order:

1. **Lowercase** the entire string
2. **Replace** any character that is not `0-9`, `a-z`, `.`, or `_` with `-`
3. **Remove** leading `-` characters
4. **Truncate** to a maximum length (default: 63 characters)
5. **Remove** trailing `-` characters

### Example

| Input | Output |
| ----- | ------ |
| `refs/heads/feat/new_feature` | `feat-new-feature` |
| `refs/tags/v1.0.0` | `v1.0.0` |
| `refs/tags/product@1.0.0-rc.2` | `product-1.0.0-rc.2` |
| `octocat/Hello-World` | `octocat-hello-world` |

Note that `.` and `_` are preserved in SLUG output.

## SLUG_URL transformation

The `SLUG_URL` transformation is identical to `SLUG` except that `.` and `_` are also replaced with `-` in step 2. This makes the result safe for use as a URL path segment or subdomain label, where dots and underscores can cause issues.

### Example

| Input | SLUG | SLUG_URL |
| ----- | ---- | -------- |
| `refs/tags/v1.0.0` | `v1.0.0` | `v1-0-0` |
| `rlespinasse/Hello-World.go` | `rlespinasse-hello-world.go` | `rlespinasse-hello-world-go` |
| `refs/heads/feat/new_feature` | `feat-new-feature` | `feat-new-feature` |

### When to use which

- Use **SLUG** for Docker tags, file paths, and general identifiers (dots and underscores are allowed)
- Use **SLUG_URL** for subdomains, URL path segments, and any context where dots or underscores are problematic

## Why 63 characters?

The default maximum length of 63 comes from the [DNS label length limit](https://www.rfc-editor.org/rfc/rfc1035#section-2.3.4). This is also the maximum length for:

- Kubernetes resource labels
- Many cloud provider resource names
- DNS subdomain components

You can change this limit with the `slug-maxlength` input, or set it to `"nolimit"` to disable truncation entirely.

## SHORT transformation

The `SHORT` transformation truncates Git commit SHAs to a shorter, still-unique prefix. By default, Git determines the optimal length based on your repository size using [`git rev-parse --short`][git-revparse].

| Input | Output |
| ----- | ------ |
| `ffac537e6cbbf934b08745a378932722df287a53` | `ffac537e` |

The length varies by repository because larger repositories need longer prefixes to avoid collisions. You can set a fixed length with the `short-length` input (minimum: 4).

## Case-sensitive variants (_CS)

Every `SLUG` and `SLUG_URL` variable also has a `_CS` (case-sensitive) variant that skips the lowercase step. For example:

| Input | SLUG | SLUG_CS |
| ----- | ---- | ------- |
| `refs/heads/New_Awesome_Product` | `new-awesome-product` | `New-Awesome-Product` |

This is useful when the original casing carries meaning (e.g., product names).

## PART extraction

The `PART` transformation splits a composite value and extracts a portion. Currently used for `GITHUB_REPOSITORY`:

| Input | OWNER_PART | NAME_PART |
| ----- | ---------- | --------- |
| `octocat/Hello-World` | `octocat` | `Hello-World` |

PART variables preserve the original casing. They can be further transformed using SLUG or SLUG_URL suffixes (e.g., `GITHUB_REPOSITORY_OWNER_PART_SLUG`).

[git-revparse]: https://git-scm.com/docs/git-rev-parse#Documentation/git-rev-parse.txt---shortlength
