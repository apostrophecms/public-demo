export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'project:ghPrLabel',
    previewImage: 'svg',
    icon: 'github',
    description: 'project:ghPrDescription'
  },
  components(self) {
    return {
      async prs(req, data) {
        const w = data.widget;
        // Unauthenticated GitHub API requests are rate limited to 60 an hour.
        // Set GITHUB_TOKEN in .env to raise that limit.
        const token = self.options.token || process.env.GITHUB_TOKEN;
        const options = token
          ? {
            headers: {
              Authorization: `token ${token}`
            }
          }
          : {};
        try {
          const pulls = await self.apos.http.get(
            `https://api.github.com/repos/${w.repo}/pulls?state=${w.state}&per_page=${w.limit}`,
            options
          );
          return {
            pulls,
            locale: req.locale
          };
        } catch (error) {
          return {
            error: (error.status === 403 && !token) ? 'rateLimited' : 'unavailable'
          };
        }
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
        def: 'open',
        choices: [
          {
            label: 'project:open',
            value: 'open'
          },
          {
            label: 'project:closed',
            value: 'closed'
          }
        ]
      }
    }
  },
  styles: {
    add: {
      backgroundColor: {
        type: 'color',
        label: 'project:backgroundColor',
        property: 'background-color',
        def: '--surface-color',
        options: {
          presetColors: [
            '--surface-color',
            '--accent-color',
            '--default-color',
            '--heading-color'
          ]
        }
      },
      border: 'border',
      padding: 'padding',
      boxShadow: 'boxShadow'
    }
  },
  icons: {
    github: 'Github'
  }
};
