import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Fruit } from "../../interfaces/fruit.interface";
import { useFruits } from "./useFruits";

export const useFruitForm = (isEdit = false) => {
  const { id } = useParams<{ id: string }>();
  const { fruits, isPending, addFruit, updateFruit } = useFruits();
  const navigate = useNavigate();

  const fruit = isEdit
    ? fruits.find((fruit) => fruit.id === Number(id))
    : undefined;
  const isLoading = isEdit && !fruit && isPending;

  //* States
  const [name, setName] = useState("");
  const [color, setColor] = useState("");

  //? Precarga los datos de la fruta cuando se está editando
  useEffect(() => {
    if (!fruit) return;
    setName(fruit.name);
    setColor(fruit.color);
  }, [fruit]);

  //* Handlers
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validar datos vacíos
    if (name.trim() === "" || color.trim() === "") {
      toast.error("Todos los campos son obligatorios.");
      return;
    }

    if (isEdit && fruit) {
      const error = await updateFruit(fruit.id, {
        name: name.trim(),
        color: color.trim(),
      });
      if (error) {
        toast.error(error);
        return;
      }

      toast.success("Fruta actualizada correctamente.");
      navigate("/fruits/list");
      return;
    }

    const fruitToAdd: Fruit = {
      name: name.trim(),
      color: color.trim(),
    };

    const error = await addFruit(fruitToAdd);
    if (error) {
      toast.error(error);
      return;
    }

    toast.success("Fruta agregada correctamente.");
    setName("");
    setColor("");
    navigate("/fruits/list");
  };

  return {
    isLoading,
    isEdit,
    name,
    color,
    fruit,
    setName,
    setColor,
    handleSubmit,
  };
};
