const fs = require('fs');
const core = require('@actions/core');
const { context } = require('@actions/github');
const { Octokit } = require('@octokit/rest');

const jsonPath = core.getInput('input-file');
const token = core.getInput('repo-token');

const github = new Octokit({ auth: token });
const { owner, repo } = context.repo;

var deletedReleases = '';
async function deletePrereleases() {
  var deletedReleases = '';
  console.log(`Checking for prereleases in repo: ${owner}/${repo}`)
  try {
    const { data: releases } = await github.repos.listReleases({
      owner,
      repo
    });

    for (const release of releases) {
      if (release.prerelease) {
        await github.repos.deleteRelease({
          owner,
          repo,
          release_id: release.id
        });
        console.log(`Deleted release: ${release.tag_name}`);
        deletedReleases += `${release.tag_name}\n`
      }
    }

    if (deletedReleases.length > 0) {
      console.log(`The following prereleases were deleted:\n${deletedReleases}`);
    } else {
      console.log(`No prereleases found`);
    }
  } catch (error) {
    console.error('Error occurred:', error);
  }
}

deletePrereleases();
