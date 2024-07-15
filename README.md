# action-delete-prereleases
Delete prereleases from a repository 

You must pass the repo-token with repo:full scope PAT with necessary permissions.
Pass release_version from an input or event payload. This property will act as a filter on the prerelease names.
```
release_version=1.0 will remove prereleases matching 1.0.*-rc.* but will not match 1.1.*-rc.0
```

```
name: Delete Prereleases
on: [workflow_dispatch]

jobs:
  delete_prereleases:
    runs-on: ubuntu-latest
    name: Delete the prereleases from this repository
    steps:
      - name: Update topic from integration_type
        id: update
        uses: keyfactor/action-delete-prereleases@main
        with:
          repo-token: ${{ secrets.GH_REPO_CONFIG}}
          release_version: ${{ env.release_version }}

