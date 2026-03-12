# Configure the maximum length for slug values

Change the maximum length of slugified values. The default is 63 characters (the DNS label length limit).

## Usage

```yaml
steps:
  - name: Inject enhanced GitHub environment variables
    uses: rlespinasse/github-slug-action@v5
    with:
      slug-maxlength: 80
```

## Disable the length limit

Set `slug-maxlength` to `"nolimit"` to disable truncation entirely:

```yaml
steps:
  - name: Inject enhanced GitHub environment variables
    uses: rlespinasse/github-slug-action@v5
    with:
      slug-maxlength: nolimit
```

> [!WARNING]
> The `slug-maxlength` input must not be empty. If left empty, the action will fail during preflight validation.

## See also

- [Inputs reference](../reference/inputs.md) for the full specification
- [Why 63 characters?](../explanation/slug-transformation-rules.md#why-63-characters) for the rationale behind the default
