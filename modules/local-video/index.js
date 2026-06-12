export default {
  extend: '@apostrophecms/piece-type',
  options: {
    label: 'Local Video',
    pluralLabel: 'Local Videos',
    // For consistency with images and files
    autopublish: true,
    // Each manager row mounts a <video> element that fetches metadata and a
    // first frame, so show fewer per page than the default of 50.
    perPage: 20
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
  },
  // Show a small, initially paused video preview in the manager list. Naming
  // the column `video` pulls the attachment into the manager's projection, and
  // AposCellVideoPreview (modules/local-video/ui/apos/components) renders it.
  columns: {
    add: {
      video: {
        name: 'video',
        label: 'Preview',
        component: 'AposCellVideoPreview'
      }
    }
  }
};
