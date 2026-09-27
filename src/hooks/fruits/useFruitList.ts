import { toast } from "react-toastify";
import { FruitDoc } from "../../interfaces/fruit.interface";
import { useAlert } from "../alert/useAlert";
import { useFruits } from "./useFruits";

export const useFruitList = () => {
  const { openAlert, closeAlert } = useAlert();
  const { removeFruit } = useFruits();

  const openDeleteAlert = (fruit: FruitDoc) => {
    openAlert({
      header: "Eliminar fruta",
      message: `¿Seguro que deseas eliminar la fruta "${fruit.name}"?`,
      onConfirm: async () => {
        const error = await removeFruit(fruit.id);
        if (error) {
          toast.error(error);
          return;
        }
        closeAlert();
        toast.success("Fruta eliminada correctamente.");
      },
    });
  };

  return {
    openDeleteAlert,
  };
};
