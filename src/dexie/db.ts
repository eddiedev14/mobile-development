import Dexie from 'dexie';

// Instanciar una nueva BD
const db = new Dexie('Parcial-02');

db.version(1).stores({
  // items: "++id, name",
});

export default db;
