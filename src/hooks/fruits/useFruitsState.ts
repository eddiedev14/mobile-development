import { Fruit, FruitDoc } from "../../interfaces/fruit.interface";
import { useDexie } from "../../dexie/useDexie";

export const useFruitsState = () => {
  //* Dexie custom hook
  const {
    liveResults: fruits,
    isPending,
    error,
    add,
    update,
    deleteItem,
  } = useDexie<FruitDoc, number, Fruit>({
    table: "fruits",
  });

  //* Functions
  const addFruit = async (fruit: Fruit): Promise<string | null> => {
    const generatedId = await add(fruit);
    return generatedId ? null : error;
  };

  const updateFruit = async (
    id: number,
    data: Partial<Fruit>,
  ): Promise<string | null> => {
    const updated = await update(id, data);
    return updated ? null : error;
  };

  const removeFruit = async (id: number): Promise<string | null> => {
    const removed = await deleteItem(id);
    return removed ? null : error;
  };

  return {
    fruits,
    isPending,
    totalFruits: fruits.length,
    addFruit,
    updateFruit,
    removeFruit,
  };
};
