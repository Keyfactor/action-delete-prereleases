const fs = require('fs');
const core = require('@actions/core');
const { context } = require('@actions/github');
const { Octokit } = require('@octokit/rest');

const jsonPath = core.getInput('input-file');
const token = core.getInput('repo-token');

const github = new Octokit({ auth: token });
const { owner, repo } = context.repo;

async function deletePrereleases() {
  try {
    const { data: releases } = await github.repos.listReleases({
      owner,
      repo
    });

    for (const release of releases) {
      if (release.prerelease) {
        await github.repos.deleteRelease({
          owner: orgName,
          repo: repoName,
          release_id: release.id
        });
        console.log(`Deleted release: ${release.tag_name}`);
      }
    }

    console.log('Deletion complete.');
  } catch (error) {
    console.error('Error occurred:', error);
  }
}

deletePrereleases();
