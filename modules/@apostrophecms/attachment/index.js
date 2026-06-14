export default {
  options: {
    // Add a "video" file group that accepts mp4 uploads. uploadfs stores the
    // file as-is (image: false) so no scaled versions are generated.
    addFileGroups: [
      {
        name: 'video',
        label: 'Video',
        extensions: [ 'mp4' ],
        extensionMaps: {},
        image: false
      }
    ]
  }
};
