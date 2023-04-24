import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Put method to accept content and add to database.
export const putDb = async (content) => {
  console.log('PUT to the database');
  // connect to database and desired schema version
  const jateDb = await openDB('jate', 1);
   // new db transaction and db privliges
  const tx = jateDb.transaction('jate', 'readwrite');
  // Open  object store
  const store = tx.objectStore('jate');
  //Add content to db
  const request = store.put({ id: id, jate: content });
  //confirmation request
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};



// method to get all content from DB
export const getDb = async () => {
  console.log('Get from jate');

    // connect to database and desired schema version
    const jateDb = await openDB('jate', 1);

    // new db transaction and db privliges
    const tx = jateDb    
    .transaction('jate', 'readonly');
  
    // Open  object store
    const store = tx.objectStore('jate');
  
    // retrieve all data from db
    const request = store.getAll();
  
    // request  confirmation
    const result = await request;
    console.log('result.value', result);
    return result;
}



initdb();
