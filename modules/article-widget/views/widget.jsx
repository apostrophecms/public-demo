// Delegates to the article module's `recent` async component, passing through
// the widget's limit and display options.

export default function ({ widget: { limit, display } }, { Component }) {
  return (
    <Component
      module="article"
      name="recent"
      limit={limit}
      display={display}
    />
  );
}
