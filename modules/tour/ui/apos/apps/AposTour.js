import createApp from 'Modules/@apostrophecms/ui/lib/vue';

export default function() {
  const component = apos.vueComponents.TheAposTour;
  const el = document.querySelector('#apos-tour');
  const app = createApp(component);
  app.mount(el);
}
