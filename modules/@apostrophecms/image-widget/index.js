const cuid = require('cuid');
const path = require('path');
const fetch = require('node-fetch');

module.exports = {
  init(self) {
    self.addOpenaiImageFieldType();
  },
  fields: {
    add: {
      subtype: {
        type: 'select',
        choices: [
          {
            label: 'Apostrophe Image',
            value: '_image'
          },
          {
            label: 'OpenAI Image',
            value: 'openaiImage'
          }
        ],
        def: '_image',
        required: true
      },
      openaiImage: {
        type: 'openaiImage',
        label: 'OpenAI Image',
        required: true,
        if: {
          subtype: 'openaiImage'
        }
      },
      _image: {
        type: 'relationship',
        label: 'apostrophe:image',
        max: 1,
        required: true,
        withType: '@apostrophecms/image',
        if: {
          subtype: '_image'
        }
      }
    }
  },
  methods(self) {
    return {
      addOpenaiImageFieldType() {
        self.apos.schema.addFieldType({
          name: 'openaiImage',
          convert: self.convertOpenaiImageInput,
          vueComponent: 'InputOpenaiImage'
        });
      },
      async convertOpenaiImageInput(req, field, data, object) {
        const input = data[field.name];
        console.log('>>', input);
        const id = self.apos.launder.id(input && input._id);
        if (!id) {
          if (field.required) {
            throw self.apos.error('notfound');
          }
          object[field.name] = null;
          return;
        }
        const image = await self.apos.image.find(req, { _id: id.replace(':published', ':draft') }).toObject();
        if (!image) {
          if (field.required) {
            throw self.apos.error('notfound');
          }
          object[field.name] = null;
          return;
        }
        console.log('I did find an image in there');
        object[field.name] = image;
      }
    };
  },
  extendMethods(self) {
    return {
      async sanitize(_super, req, input, options) {
        if ((input.subtype === 'openaiImage') && input.openaiImage) {
          input._image = [ input.openaiImage ];
          input.subtype = '_image';
          input.openAiImage = null;
          console.log('>>>> Saving it as:', input);
        }
        return _super(req, input, options);
      }
    };
  },
  apiRoutes(self) {
    return {
      post: {
        // TODO we gotta at least attempt to limit this
        // or we will blow our budget once people know about it
        async generateImage(req) {
          const prompt = self.apos.launder.string(req.body.prompt);
          console.log(req.body);
          if (!prompt.length) {
            throw self.apos.error('notfound');
          }
          const result = await self.apos.http.post('https://api.openai.com/v1/images/generations', {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${process.env.OPENAI_KEY}`
            },
            body: {
              prompt,
              n: 1,
              size: '1024x1024'
            }
          });
          if (!(result && result.data && result.data[0] && result.data[0].url)) {
            self.apos.util.debug('OpenAI image generation failed', prompt, result);
            throw self.apos.error('notfound');
          }
          // apos.http has a bug with binary data, use node-fetch
          const response = await fetch(result.data[0].url);
          const buffer = await response.buffer();
          const writeFile = require('util').promisify(require('fs').writeFile);
          const id = cuid();
          const temp = path.join(self.apos.rootDir, `data/temp/${id}.png`);
          try {
            await writeFile(temp, buffer);
            const attachment = await self.apos.attachment.insert(req, {
              name: 'openai-image.png',
              path: temp
            });
            const image = await self.apos.image.insert(req, {
              title: prompt,
              attachment
            });
            self.apos.attachment.all(image, { annotate: true });
            return image;
          } finally {
            const unlink = require('util').promisify(require('fs').unlink);
            try {
              await unlink(temp);
            } catch (e) {
              // Don't care if it never got there
            }
          }
        }
      }
    };
  }
};
