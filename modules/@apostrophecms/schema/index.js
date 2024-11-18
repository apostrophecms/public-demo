
export default {
  // options: {
  //   name: 'color',
  //   alias: 'colorFields'
  // },
  init(self) {
    // self.name = self.options.name;
    // self.addFieldType();
    // self.enableBrowserData();
    self.addFieldType({
      name: 'theme',
      extend: 'select',
      vueComponent: 'ThemeField',
      // async convert(req, field, data, destination, {
      //   fetchRelationships = true, ancestors = {}, doc = {}
      // } = {}) {
      //   data = data[field.name];
      //   const schema = field.schema;
      //   const errors = [];
      //   const result = {
      //     ...(destination[field.name] || {}),
      //     _id: self.apos.launder.id(data && data._id) || self.apos.util.generateId()
      //   };
      //   const options = {
      //     fetchRelationships,
      //     ancestors: [ ...ancestors, destination ]
      //   };
      //   if (data == null || typeof data !== 'object' || Array.isArray(data)) {
      //     data = {};
      //   }
      //   try {
      //     await self.convert(req, schema, data, result, options);
      //   } catch (e) {
      //     if (Array.isArray(e)) {
      //       for (const error of e) {
      //         errors.push(error);
      //       }
      //     } else {
      //       throw e;
      //     }
      //   }
      //   result.metaType = 'objectItem';
      //   result.scopedObjectName = field.scopedObjectName;
      //   destination[field.name] = result;
      //   if (errors.length) {
      //     throw errors;
      //   }
      // },
      // register: function (metaType, type, field) {
      //   const localObjectName = field.objectName || field.name;
      //   field.scopedObjectName = `${metaType}.${type}.${localObjectName}`;
      //   self.objectManagers[field.scopedObjectName] = {
      //     schema: field.schema
      //   };
      //   self.register(metaType, type, field.schema);
      // },
      // validate: function (field, options, warn, fail) {
      //   for (const subField of field.schema) {
      //     self.validateField(subField, options, field);
      //   }
      // },
      // isEqual(req, field, one, two) {
      //   if (one && (!two)) {
      //     return false;
      //   }
      //   if (two && (!one)) {
      //     return false;
      //   }
      //   if (!(one || two)) {
      //     return true;
      //   }
      //   if (one[field.name] && (!two[field.name])) {
      //     return false;
      //   }
      //   if (two[field.name] && (!one[field.name])) {
      //     return false;
      //   }
      //   if (!(one[field.name] || two[field.name])) {
      //     return true;
      //   }
      //   return self.isEqual(req, field.schema, one[field.name], two[field.name]);
      // },
      // index: function (value, field, texts) {
      //   if (value) {
      //     self.apos.schema.indexFields(field.schema, value, texts);
      //   }
      // },
      def: {}
    });
  }
  // methods(self) {
  //   return {
  //     addFieldType() {

  //     }
  //     // getBrowserData(req) {
  //     //   return {
  //     //     name: self.name,
  //     //     action: self.action
  //     //   };
  //     // }
  //   };
  // }
};
