export default {
  extend: '@apostrophecms/piece-type',
  options: {
    label: 'Local Video',
    pluralLabel: 'Local Videos',
    // For consistency with images and files
    autopublish: true
  },
  fields: {
    add: {
      video: {
        type: 'attachment',
        label: 'Video',
        // Restrict uploads to the "video" file group (mp4) defined in
        // modules/@apostrophecms/attachment/index.js
        fileGroup: 'video',
        required: true
      }
    },
    group: {
      basics: {
        label: 'Basics',
        fields: [ 'title', 'video' ]
      }
    }
  }
};
