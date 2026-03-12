# Use a prefix for generated variables

Add a prefix to all generated environment variables to avoid naming conflicts with [GitHub's default environment variables](https://docs.github.com/en/actions/reference/workflows-and-actions/variables#default-environment-variables).

## Usage

```yaml
steps:
  - name: Inject enhanced GitHub environment variables
    uses: rlespinasse/github-slug-action@v5
    with:
      prefix: CI_
```

With this configuration, variables are named `CI_GITHUB_REPOSITORY_SLUG`, `CI_GITHUB_REF_SLUG`, `CI_GITHUB_SHA_SHORT`, etc.

## When to use a prefix

- When a variable name collides with a GitHub default environment variable (the assignment would be silently ignored without a prefix)
- When you want to distinguish slug variables from other environment variables in your workflow
- As a preventive measure against future GitHub environment variable additions

## See also

- [Inputs reference](../reference/inputs.md) for the full `prefix` input specification
- [Troubleshooting](troubleshooting.md#one-of-the-environment-variables-doesnt-work-as-intended) for details on variable name collisions
