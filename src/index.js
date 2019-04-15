import _ from "lodash";
require("./sass/main.scss");

const endpointGithubRepo = `https://api.github.com/repos/${process.env.GITHUB_REPO}`;
const accessTokenValue = process.env.GITHUB_TOKEN;
const accessToken = `&access_token=${accessTokenValue}`;
const endpointMilestones = `${endpointGithubRepo}/milestones?state=all${accessToken}`;
const endpointPulls = `${endpointGithubRepo}/issues?state=all&milestone=*${accessToken}`;

const mapComponents = (data, componentName) => {
  data.map(item => componentName(item));
}

const buildHeading = data => {
  let boxHeader = `
    <div class="Box-header">
      <h1 class="Box-title">
        <a href="${data.url}">${data.title}</a>
      </h1>
    </div>
  `;
  let boxWrapper = document.createElement('div');
  boxWrapper.classList.add('Box','Box--spacious','f4');
  boxWrapper.innerHTML = boxHeader;
  
  document.body.appendChild(boxWrapper);
}

const buildContent = data => {
  let content = `
  ${data.pull_request ? `<li class="Box-row container clearfix">
    <div class="col-1 float-left">
      <img class="avatar" alt="${data.user.login}" src="https://github.com/${data.user.login}.png?v=3&amp;s=144" width="72" height="72">
    </div>
    <div class="float-left col-11 lh-condensed p-2">
      <a id="issue_4581_link" class="link-gray-dark v-align-middle no-underline h4" href="${data.html_url}">${data.title} (#${data.number})</a>

      <div class="mt-1 text-small text-gray">
        <span class="opened-by">
          #${data.number} opened by
          <a class="muted-link" title="Open pull requests created by ${data.user.login}" href="https://github.com/${process.env.GITHUB_REPO}/issues?q=is%3Apr+is%3Aopen+author%3A${data.user.login}">${data.user.login}</a>
        </span>
      </div>
      ${data.milestone ? `<div class="mt-1 text-small text-gray"><span>Milestone name: ${data.milestone.title}</span></div>`: ``}
    </div>
  </li>`: ``}
  `;
  let ul = document.createElement('ul');
  ul.innerHTML = content;
  
  document.body.appendChild(ul);
}

const buildComponents = (endpoint, componentName) => {
  fetch(endpoint)
    .then(function(response) {
      return response.json();
    })
    .then(function(responseJSON) {
      mapComponents(responseJSON, componentName)
    });
}

buildComponents(endpointMilestones,buildHeading);
buildComponents(endpointPulls,buildContent);