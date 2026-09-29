// Delegates to the article module's `recent` async component, passing through
// the widget's limit and display options.

export default function ({ widget }, { Component }) {
  return (
    <Component
      module="article"
      name="recent"
      limit={widget.limit}
      display={widget.display}
    />
  );
}
