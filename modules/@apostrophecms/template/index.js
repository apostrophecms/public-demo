// Render Apostrophe's own templates from their JSX versions, and never load
// Nunjucks. Any attempt to render a Nunjucks template throws an error naming
// it. This project has no Nunjucks templates, and needs none.
export default {
  options: {
    nunjucks: false
  }
};
