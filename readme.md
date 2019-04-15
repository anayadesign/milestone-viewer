# Milestone Viewer
_Created to test out the GitHub API._

Displays merged pull requests if they're associated with a GitHub Milestone in your repo.
Uses GitHub's [REST API v3](https://developer.github.com/v3/)

## Get Started
1. Add a `.env` file with:
    - `GITHUB_REPO=USERNAME/REPO_NAME`
    - `GITHUB_TOKEN=API_KEY`
2. `npm run build`
3. Open `dist/index.html` and view your content