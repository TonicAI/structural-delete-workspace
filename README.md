# Delete workspace

This action deletes a Structural workspace.

## Inputs

| Input | Description | Required | Default |
|-------|-------------|----------|---------|
| `structural-url` | Base URL for the Structural API | No | `https://app.tonic.ai` |
| `structural-api-key` | Structural API key for authentication | Yes | |
| `workspace-id` | The identifier (GUID) of the workspace to delete | Yes | |

## Example usage

```yaml
jobs:
  delete-workspace:
    runs-on: ubuntu-latest
    steps:
      - name: Delete workspace
        uses: TonicAI/structural-delete-workspace@v1
        with:
          structural-api-key: ${{ secrets.STRUCTURAL_API_KEY }}
          workspace-id: ${{ secrets.STRUCTURAL_WORKSPACE_ID }}
```

## Develop

### Setup
```bash
npm install
```

### Build
```bash
npm run package
```

This uses `@vercel/ncc` to compile the action into a single file in the `dist` folder.

## Publish

Before you publish, make sure to:
1. Build the action: `npm run package`
2. Commit the `dist` folder to the repository
3. Tag your release: `git tag -a v1 -m "Release v1"`
4. Push the tag: `git push origin v1`
