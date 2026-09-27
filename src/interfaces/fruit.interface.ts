export interface Fruit {
  name: string;
  color: string;
}

//? Al guardar las frutas en Dexie, el id lo genera la base de datos (auto-increment)
export type FruitDoc = Fruit & {
  id: number;
};

export type FruitFormData = Fruit;
