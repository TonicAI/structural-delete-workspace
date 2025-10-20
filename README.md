# Delete Workspace

This action deletes a Structural workspace.

## Inputs

- `structural-url` (optional): Structural API base URL, defaults to 'https://app.tonic.ai'
- `structural-api-key` (required): Structural API key for authentication
- `workspace-id` (required): The workspace ID (GUID) to delete

## Outputs

This action does not produce any outputs. It will log success or failure messages.

## Example Usage

```yaml
jobs:
  delete-workspace:
    runs-on: ubuntu-latest
    steps:
      - name: Delete Workspace
        uses: TonicAI/structural-delete-workspace@v1
        with:
          structural-api-key: ${{ secrets.STRUCTURAL_API_KEY }}
          workspace-id: ${{ secrets.STRUCTURAL_WORKSPACE_ID }}
```

### Delete with custom Structural URL

```yaml
- name: Delete Workspace
  uses: TonicAI/structural-delete-workspace@v1
  with:
    structural-url: 'https://custom.tonic.ai'
    structural-api-key: ${{ secrets.STRUCTURAL_API_KEY }}
    workspace-id: ${{ secrets.STRUCTURAL_WORKSPACE_ID }}
```

## Behavior

- If the workspace is successfully deleted, the action will complete successfully
- If the workspace is not found (404), the action will log that it's already deleted and complete successfully
- If any other error occurs (400+), the action will fail

## License

MIT
