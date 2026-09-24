export default {
  options: {
    // Filter and pagination URLs become paths (`/articles/categories/news/page/2`)
    // rather than query strings, so every listing is a distinct, enumerable
    // URL. Build those URLs with `apos.url.getChoiceFilter()` and
    // `getPageFilter()`, or use the `_url` of a `data.filters` choice, never by
    // hand: both helpers honor this option.
    static: true
  }
};
