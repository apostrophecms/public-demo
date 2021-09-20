const path = require('path');
const configs = require('require-all')({
  dirname: path.join(
    __dirname, 'lib/configs'
  )
});

module.exports = {
  fields: {
    add: generateFields(configs),
    group: generateGroups(configs)
  }
};

function generateFields (configs) {
  let fields = {};
  for (const config of Object.keys(configs)) {
    fields = {
      ...fields,
      ...configs[config].add
    };
  };

  return fields;
}

function generateGroups (configs) {
  let groups = {};

  for (const config of Object.keys(configs)) {
    groups = {
      ...groups,
      ...configs[config].group
    };
  };

  return groups;
}
