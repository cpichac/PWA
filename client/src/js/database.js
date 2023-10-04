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

// Initialize the database

// Method to add content to the database
export const putDb = async (content) => {
  try {
    const db = await openDB('jate', 1);
    const tx = db.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    const id = await store.put({id:1, content});
    await tx.done;
    console.log(`Added content with ID: ${id}`);
  } catch (error) {
    console.error('Error adding content to the database:', error);
  }
};

// Method to get all content from the database
export const getDb = async () => {
  try {
    console.log('Post to the database');
    const db = await openDB('jate', 1);
    const tx = db.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const allContent = await store.getAll();
    await tx.done;
    return result?.value
  } catch (error) {
    console.error('Error getting content from the database:', error);
    return [];
  }
};
