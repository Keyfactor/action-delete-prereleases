# action-delete-prereleases
Delete prereleases from a repository 
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

