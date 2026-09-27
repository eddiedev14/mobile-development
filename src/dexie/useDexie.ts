import { useCallback, useMemo, useRef, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import type { IndexableType, UpdateSpec } from "dexie";
import db from "./db";

interface Props<T> {
  //? Nombre de la tabla declarada en el esquema de Dexie (por ejemplo "fruits")
  table: string;
  //? Filtro opcional para liveResults.
  filterFn?: (item: T) => boolean;
}

/*
 * Hook genérico sobre Dexie.
 *
 * - T           -> tipo del documento que devuelve la tabla  (FruitDoc)
 * - TKey        -> tipo de la clave primaria                (number en autoincrement)
 * - TInsertType -> tipo de lo que se puede insertar (permite omitir la clave autoincremental)
 *
 * Ejemplo con la tabla "fruits" (id autoincremental):
 * const { liveResults, add, update, delete: deleteFruit } = useDexie<FruitDoc, number, Fruit>({ table: "fruits" });
 */

export const useDexie = <
  T,
  TKey extends IndexableType = number,
  TInsertType = T,
>({
  table,
  filterFn,
}: Props<T>) => {
  //* States
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //? Dexie permite obtener una tabla por nombre de forma tipada.
  const tableRef = useMemo(
    () => db.table<T, TKey, TInsertType>(table),
    [table],
  );

  //? El filtro se guarda en un ref para que un arrow function inline no dispare la consulta en cada render
  const filterRef = useRef(filterFn);
  filterRef.current = filterFn;

  //* 1. R -> READ (reactivo: se re-ejecuta solo cuando la tabla cambia)
  const liveResults = useLiveQuery<T[], T[]>(
    () => {
      const filter = filterRef.current;
      return filter ? tableRef.filter(filter).toArray() : tableRef.toArray();
    },
    [tableRef],
    [], //? Valor por defecto para que nunca sea undefined
  );

  //* 2. C -> CREATE
  const add = useCallback(
    async (data: TInsertType): Promise<TKey | null> => {
      setIsPending(true);
      setError(null);

      try {
        //? Con clave autoincremental Dexie genera la clave y la retorna
        return await tableRef.add(data);
      } catch {
        setError(`Error al agregar un nuevo registro en ${table}`);
        return null;
      } finally {
        setIsPending(false);
      }
    },
    [tableRef, table],
  );

  //* 3. U -> UPDATE
  const update = useCallback(
    async (id: TKey, data: UpdateSpec<TInsertType>): Promise<boolean> => {
      setIsPending(true);
      setError(null);

      try {
        //? Dexie retorna cuántos registros se actualizaron (1 si existe, 0 si no)
        const updated = await tableRef.update(id, data);

        if (updated === 0) {
          setError(
            `No se encontró el registro con id ${String(id)} en ${table}`,
          );
          return false;
        }

        return true;
      } catch {
        setError(
          `Error al actualizar el registro con id ${String(id)} en ${table}`,
        );
        return false;
      } finally {
        setIsPending(false);
      }
    },
    [tableRef, table],
  );

  //* 4. D -> DELETE
  const deleteItem = useCallback(
    async (id: TKey): Promise<boolean> => {
      setIsPending(true);
      setError(null);

      try {
        await tableRef.delete(id);
        return true;
      } catch {
        setError(
          `Error al eliminar el registro con id ${String(id)} de ${table}`,
        );
        return false;
      } finally {
        setIsPending(false);
      }
    },
    [tableRef, table],
  );

  return {
    liveResults,
    isPending,
    error,
    add,
    update,
    deleteItem,
  };
};
