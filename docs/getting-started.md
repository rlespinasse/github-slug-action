# Getting Started with GitHub Slug Action

This tutorial walks you through adding the GitHub Slug Action to a workflow and using slug variables for the first time.

## Prerequisites

- A GitHub repository with [GitHub Actions enabled](https://docs.github.com/en/actions/using-workflows)

## Step 1: Add the action to your workflow

Create or edit a workflow file (e.g., `.github/workflows/deploy.yml`) and add the action after checking out your code:

```yaml
name: Deploy

on: push

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Inject enhanced GitHub environment variables
        uses: rlespinasse/github-slug-action@v5
```

> [!TIP]
> The `actions/checkout` step is recommended so that Git can determine the optimal short SHA length for your repository. It is not strictly required for slug variables.

## Step 2: Use slug variables in subsequent steps

After the action runs, all slug variables are available as environment variables. Add a step to use them:

```yaml
      - name: Print slug variables
        run: |
          echo "Repository slug: $GITHUB_REPOSITORY_SLUG"
          echo "Branch slug:     $GITHUB_REF_SLUG"
          echo "Short SHA:       $GITHUB_SHA_SHORT"
        shell: bash
```

For a branch named `feat/new_feature` on repository `octocat/Hello-World`, this outputs:

```
Repository slug: octocat-hello-world
Branch slug:     feat-new-feature
Short SHA:       ffac537e
```

## Step 3: Use a slug variable for a practical purpose

A common use case is naming deployment previews with a URL-safe branch identifier:

```yaml
      - name: Deploy preview
        run: |
          echo "Deploying to https://${GITHUB_REF_SLUG_URL}.preview.example.com"
        shell: bash
```

The `SLUG_URL` variant replaces dots and underscores too, making it safe for subdomains.

## Complete workflow

Here is the full workflow file:

```yaml
name: Deploy

on: push

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Inject enhanced GitHub environment variables
        uses: rlespinasse/github-slug-action@v5

      - name: Deploy preview
        run: |
          echo "Deploying to https://${GITHUB_REF_SLUG_URL}.preview.example.com"
          echo "Commit: ${GITHUB_SHA_SHORT}"
        shell: bash
```

## What you learned

- **SLUG** variables convert values to lowercase and replace special characters with `-`
- **SLUG_URL** variables also replace `.` and `_`, making values safe for URLs and subdomains
- **SHORT** variables shorten SHA commit hashes
- All variables are exposed as environment variables for use in subsequent steps

## Next steps

- [How-to guides](how-to/) for specific configuration tasks (prefixes, custom lengths, URL usage)
- [Variable reference](reference/variables.md) for the complete list of available variables
- [Slug transformation rules](explanation/slug-transformation-rules.md) to understand how transformations work
