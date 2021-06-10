export default async () => {
  console.log('look at me, I am project level js!');
  const page = await apos.http.get('/', {});
  console.log(`The home page is ${page.length} bytes long`);
};
