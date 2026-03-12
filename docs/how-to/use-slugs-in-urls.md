# Use slug variables in URLs

Use `SLUG_URL` variables (not `SLUG`) when building URLs, because `SLUG_URL` also replaces dots and underscores with hyphens, making values safe for subdomains and URL paths.

## As a subdomain

```yaml
steps:
  - uses: actions/checkout@v6
  - uses: rlespinasse/github-slug-action@v5
  - run: |
      ./deploy-application.sh --url "https://${{ env.GITHUB_REF_SLUG_URL }}.staging.app.example.com"
```

For a branch `feat/new_feature`, this produces `https://feat-new-feature.staging.app.example.com`.

## As a URL path segment

```yaml
steps:
  - uses: actions/checkout@v6
  - uses: rlespinasse/github-slug-action@v5
  - run: |
      ./deploy-application.sh --url "https://staging.app.example.com/${{ env.GITHUB_REF_SLUG_URL }}"
```

## Why SLUG_URL instead of SLUG?

The `SLUG` transformation preserves `.` and `_` characters. In a subdomain like `v1.0.0.staging.example.com`, the dots from the version tag would create invalid DNS resolution. `SLUG_URL` replaces them: `v1-0-0.staging.example.com`.

See [Slug transformation rules](../explanation/slug-transformation-rules.md#slug_url-transformation) for the full comparison.

## See also

- [Full example workflow](../../examples/url-use.yml)
- [Variable reference](../reference/variables.md) for all available `SLUG_URL` variables
