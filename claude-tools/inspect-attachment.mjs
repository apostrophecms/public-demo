// Scratch verification utility (not part of the app).
//
// Boots a throwaway Apostrophe instance against the dev database to inspect
// runtime config — used to confirm the `video` attachment file group, the
// local-video piece type, and the hero-widget background video relationship.
//
// Run on a free port so it doesn't collide with the dev server:
//   PORT=3998 node claude-tools/inspect-attachment.mjs
//
// The modules list below mirrors app.js. Keep it in sync if app.js changes.

import 'dotenv/config';
import apostrophe from 'apostrophe';

const apos = await apostrophe({
  root: import.meta,
  shortName: 'public-demo',
  bundles: [ '@apostrophecms/blog' ],
  baseUrl: 'http://localhost:3000',
  modules: {
    '@apostrophecms/vite': {},
    '@apostrophecms/asset': {},
    '@apostrophecms/seo': {},
    asset: {},
    helper: {},
    '@apostrophecms/favicon': {},
    '@apostrophecms/open-graph': {},
    '@apostrophecms/rich-text-widget': {},
    '@apostrophecms/image-widget': {},
    '@apostrophecms/video-widget': {},
    'button-widget': {},
    'github-prs-widget': {},
    'hero-widget': {},
    'card-widget': {},
    'price-card-widget': {},
    'default-page': {},
    article: {},
    'article-page': {},
    'article-widget': {},
    'article-category': {},
    'local-video': {},
    '@apostrophecms/import-export': {},
    'custom-layout-widget': {}
  }
});

// The "video" file group (mp4) added in modules/@apostrophecms/attachment.
const groups = apos.attachment.fileGroups.map(g => ({ name: g.name, extensions: g.extensions }));
console.log('FILE_GROUPS =>', JSON.stringify(groups, null, 2));

// The local-video piece type's attachment field, scoped to the video group.
const lv = apos.modules['local-video'];
const videoField = lv && lv.schema.find(f => f.name === 'video');
console.log('LOCAL_VIDEO_FIELD =>', JSON.stringify({
  type: videoField && videoField.type,
  fileGroup: videoField && videoField.fileGroup,
  accept: videoField && videoField.accept
}, null, 2));

// The hero-widget background video relationship.
const hero = apos.modules['hero-widget'];
const rel = hero && hero.schema.find(f => f.name === '_backgroundVideo');
console.log('HERO_BACKGROUND_VIDEO =>', JSON.stringify({
  found: !!rel,
  type: rel && rel.type,
  withType: rel && rel.withType,
  withTypeResolves: !!apos.modules[rel && rel.withType],
  max: rel && rel.max
}, null, 2));

process.exit(0);
