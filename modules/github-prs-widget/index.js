export default {
  extend: '@apostrophecms/widget-type',
  options: {
    name: 'githubPrs',
    label: 'project:ghPrLabel',
    previewImage: 'svg',
    icon: 'github',
    description: 'project:ghPrDescription'
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
        label: 'project:repo',
        def: 'apostrophecms/apostrophe',
        help: 'project:formattedLike',
        required: true
      },
      limit: {
        type: 'integer',
        label: 'project:limit',
        def: 5,
        required: true,
        max: 100,
        min: 1
      },
      state: {
        type: 'select',
        label: 'project:state',
        required: true,
        choices: [
          {
            label: 'project:open',
            value: 'open',
            def: true
          },
          {
            label: 'project:closed',
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
