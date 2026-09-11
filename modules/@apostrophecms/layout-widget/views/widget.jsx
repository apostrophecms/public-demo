// Renders a single area as a CSS grid. Column count, gap, and cell alignment
// come from the widget's own options, falling back to the module defaults.

export default function (data, { Area }) {
  const opts = data.options || {};
  const managerOpts = (data.manager && data.manager.options) || {};
  const columns = opts.columns || managerOpts.columns;
  const gap = opts.gap || managerOpts.gap || '0';
  const justify = opts.defaultCellHorizontalAlignment ||
    managerOpts.defaultCellHorizontalAlignment || 'stretch';
  const align = opts.defaultCellVerticalAlignment ||
    managerOpts.defaultCellVerticalAlignment || 'stretch';

  const aposStyle =
    `--grid-columns: ${columns};` +
    ` --grid-gap: ${gap};` +
    ' --grid-rows: auto;' +
    ' --mobile-grid-rows: auto;' +
    ' --tablet-grid-rows: auto;' +
    ` --justify-items: ${justify};` +
    ` --align-items: ${align};`;

  return (
    <Area
      doc={data.widget}
      name="columns"
      with={{
        aposStyle,
        aposClassName: 'layout-widget widget',
        aposParentOptions: { ...opts, widgetId: data.widget._id },
        aposAttrs: {
          'tablet-auto': true,
          'mobile-auto': true
        }
      }}
    />
  );
}
