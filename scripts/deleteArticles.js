import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017'; // change if needed
const dbName = 'public-demo-lnernekjb';
const collectionName = 'aposDocs';
const query = { type: 'article' }; // modify query

async function deleteDocuments() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const result = await collection.deleteMany(query);
    console.log(`${result.deletedCount} documents deleted.`);
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.close();
  }
}

deleteDocuments();
