module.exports = {
  extend: '@apostrophecms/widget-type',
  options: {
    name: 'githubPrs',
    label: 'GitHub Pull Requests',
    icon: 'github'
  },
  components(self) {
    return {
      async prs(req, data) {
        const w = data.widget;
        const token = self.options.token;
        const options = token
          ? {
            headers: {
              Authorization: `token ${token}`
            }
          }
          : {};
        let body = {};
        try {
          body = await self.apos.http.get(
            `https://api.github.com/repos/${w.repo}/pulls?state=${w.state}&per_page=${w.limit}`,
            options
          );
        } catch (error) {
          if (error.status === 403 && !token) {
            body.message = 'Rate limit exceeded, see README for providing a GitHub API token';
          } else {
            body.message = 'Something went wrong :(';
          }
        }
        return {
          response: body,
          widget: w
        };
      }
    };
  },
  fields: {
    add: {
      repo: {
        type: 'string',
        label: 'Repo',
        def: 'apostrophecms/apostrophe',
        help: 'Formatted like {ORG_NAME}/{REPO_NAME}',
        required: true
      },
      limit: {
        type: 'integer',
        label: 'Limit',
        def: 5,
        required: true,
        max: 100,
        min: 1
      },
      state: {
        type: 'select',
        label: 'State',
        required: true,
        choices: [
          {
            label: 'Open',
            value: 'open',
            def: true
          },
          {
            label: 'Closed',
            value: 'closed'
          }
        ]
      }
    }
  },
  icons: {
    github: 'Github'
  }
};
