import Dexie from "dexie";

// Instanciar una nueva BD
const db = new Dexie("Challenge-06");

// Agregar tabla fruits en la versión 1
db.version(1).stores({
  fruits: "++id, name, color",
});

export default db;
