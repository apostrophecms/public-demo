import { MongoClient } from 'mongodb';
import { generate } from 'random-words';
const title = generate({
  minLength: 5,
  maxLength: 5,
  min: 3,
  max: 10
}).join(' ');
console.log(title);

const uri = 'mongodb://localhost:27017'; // update with your mongo uri
const dbName = 'public-demo-lnernekjb';
const collectionName = 'aposDocs';
const numberOfDocuments = 200; // change as needed

function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

async function insertDocuments() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const documents = Array.from({ length: numberOfDocuments }, (_, i) => {
      const title = generate({
        minLength: 5,
        maxLength: 5,
        min: 3,
        max: 10
      }).join(' ');
      const author = generate({
        minLength: 2,
        maxLength: 8,
        min: 2,
        max: 3
      }).join(' ');
      const id = generateRandomString(19);
      return [
        {
          _id: `${id}:en:draft`,
          title,
          author,
          desc: generate({
            minLength: 2,
            maxLength: 8,
            min: 20,
            max: 30
          }).join(' '),
          contentr: generate({
            minLength: 2,
            maxLength: 8,
            min: 300,
            max: 500
          }).join(' '),
          blurb: {
            _id: 'uupglcyfp2aapu48psxr4z03',
            items: [],
            metaType: 'area'
          },
          slug: generateRandomString(19),
          visibility: 'public',
          main: {
            _id: 'dsvab404oct4hca9ie65w0ln',
            items: [],
            metaType: 'area'
          },
          condition: [],
          conditionalField: '',
          seoTitle: '',
          seoDescription: '',
          seoRobots: [],
          archived: false,
          type: 'article',
          aposLocale: 'en:draft',
          aposMode: 'draft',
          aposDocId: id,
          metaType: 'doc',
          createdAt: new Date(),
          titleSortified: 'nice and good',
          updatedBy: {
            _id: 'kktbwho47b8z1bspuqxzuxec',
            title: 's',
            username: 's'
          },
          highSearchText: 'nice and good nice and good nice and good nice and good public',
          highSearchWords: [
            'nice',
            'and',
            'good',
            'public'
          ],
          lowSearchText: 'nice and good nice and good nice and good nice and good public',
          searchSummary: '',
          topicsIds: [],
          topicsFields: {},
          modified: false
        },
        {
          _id: `${id}:en:published`,
          title,
          author,
          desc: generate({
            minLength: 2,
            maxLength: 8,
            min: 20,
            max: 30
          }).join(' '),
          contentr: generate({
            minLength: 2,
            maxLength: 8,
            min: 300,
            max: 500
          }).join(' '),
          blurb: {
            _id: 'uupglcyfp2aapu48psxr4z03',
            items: [],
            metaType: 'area'
          },
          slug: generateRandomString(19),
          visibility: 'public',
          main: {
            _id: 'dsvab404oct4hca9ie65w0ln',
            items: [],
            metaType: 'area'
          },
          condition: [],
          conditionalField: '',
          seoTitle: '',
          seoDescription: '',
          seoRobots: [],
          archived: false,
          type: 'article',
          aposLocale: 'en:published',
          aposMode: 'published',
          aposDocId: id,
          metaType: 'doc',
          createdAt: new Date(),
          titleSortified: 'nice and good',
          updatedBy: {
            _id: 'kktbwho47b8z1bspuqxzuxec',
            title: 's',
            username: 's'
          },
          highSearchText: 'nice and good nice and good nice and good nice and good public',
          highSearchWords: [
            'nice',
            'and',
            'good',
            'public'
          ],
          lowSearchText: 'nice and good nice and good nice and good nice and good public',
          searchSummary: '',
          topicsIds: [],
          topicsFields: {},
          modified: false
        }
      ];
    }).flat();

    const result = await collection.insertMany(documents);
    console.log(`Inserted ${result.insertedCount} documents`);
  } catch (err) {
    console.error('Error inserting documents:', err);
  } finally {
    await client.close();
  }
}

insertDocuments();
