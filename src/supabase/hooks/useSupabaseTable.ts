import { useCallback, useEffect, useState } from "react";
import { supabase } from "../config";
import type { SupabaseRow } from "../types/supabase.types";
import { getDbErrorMessage } from "../utils/helper";

//* Opciones del hook
interface Options {
  //? Escucha cambios de la tabla en tiempo real (default: true).
  realtime?: boolean;

  //? Trae sólo las filas donde `column = value` (ej. { column: "user_id", value: id }).
  //? Con RLS no es obligatorio: las policies ya filtran por usuario
  filter?: { column: string; value: string | number | boolean };

  //? Orden de la lista (default: el que devuelva la base de datos)
  orderBy?: { column: string; ascending?: boolean };

  //? Si es false el hook no consulta ni se suscribe (ej. mientras no hay sesión)
  enabled?: boolean;
}

//? Ordena las filas en el cliente con el mismo criterio que `.order()`.
//? Es necesario porque las filas que llegan por realtime se agregan al final
const sortRows = <T extends object>(
  rows: SupabaseRow<T>[],
  orderBy: Options["orderBy"],
): SupabaseRow<T>[] => {
  if (!orderBy) return rows;

  const { column, ascending = true } = orderBy;
  return [...rows].sort((a, b) => {
    const valueA = (a as Record<string, unknown>)[column] as string | number;
    const valueB = (b as Record<string, unknown>)[column] as string | number;

    if (valueA === valueB) return 0;
    return (valueA > valueB ? 1 : -1) * (ascending ? 1 : -1);
  });
};

//? CRUD genérico para una tabla de Supabase, con lista en vivo.
//? `T` es la forma de la fila SIN el id (ej. Task); el hook devuelve filas con id.
//?
//? Uso: const { results, add, update, remove } = useSupabaseTable<Task>("tasks");
export const useSupabaseTable = <T extends object>(
  table: string,
  { realtime = true, filter, orderBy, enabled = true }: Options = {},
) => {
  //* States
  const [results, setResults] = useState<SupabaseRow<T>[]>([]);
  const [isPending, setIsPending] = useState(enabled);
  const [error, setError] = useState<string | null>(null);

  const filterColumn = filter?.column;
  const filterValue = filter?.value;
  const orderColumn = orderBy?.column;
  const orderAscending = orderBy?.ascending ?? true;

  //* Helpers de estado local
  //? Inserta la fila o la reemplaza si ya existe (idempotente).
  const upsertRow = useCallback(
    (row: SupabaseRow<T>) => {
      setResults((prev) => {
        const exists = prev.some((item) => item.id === row.id);
        const next = exists
          ? prev.map((item) => (item.id === row.id ? row : item))
          : [...prev, row];

        return orderColumn
          ? sortRows(next, { column: orderColumn, ascending: orderAscending })
          : next;
      });
    },
    [orderColumn, orderAscending],
  );

  const removeRow = useCallback((id: string) => {
    setResults((prev) => prev.filter((item) => item.id !== id));
  }, []);

  //* Effects
  //? 1) Carga inicial de la tabla
  useEffect(() => {
    if (!enabled) {
      setResults([]);
      setIsPending(false);
      return;
    }

    //? Evita actualizar el estado si el efecto se limpió antes de terminar la
    //? consulta (cambio de filtro, desmontaje o doble montaje de StrictMode)
    let cancelled = false;

    const fetchRows = async () => {
      setIsPending(true);

      let query = supabase.from(table).select("*");
      if (filterColumn !== undefined) {
        query = query.eq(
          filterColumn,
          filterValue as string | number | boolean,
        );
      }
      if (orderColumn) {
        query = query.order(orderColumn, { ascending: orderAscending });
      }

      const { data, error: fetchError } = await query;
      if (cancelled) return;

      if (fetchError) {
        setError(getDbErrorMessage(fetchError));
        setResults([]);
      } else {
        setError(null);
        setResults(data as SupabaseRow<T>[]);
      }
      setIsPending(false);
    };

    fetchRows();

    return () => {
      cancelled = true;
    };
  }, [table, enabled, filterColumn, filterValue, orderColumn, orderAscending]);

  //? 2) Suscripción a los cambios en tiempo real (INSERT, UPDATE y DELETE)
  useEffect(() => {
    if (!enabled || !realtime) return;

    //? El nombre del canal es único para que dos componentes que usen la misma
    //? tabla no compartan (ni cierren) el canal del otro
    const channel = supabase
      .channel(`${table}:${crypto.randomUUID()}`)
      .on<SupabaseRow<T>>(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table,
          //? El filtro de realtime usa la sintaxis de PostgREST: "columna=eq.valor"
          ...(filterColumn !== undefined && {
            filter: `${filterColumn}=eq.${filterValue}`,
          }),
        },
        (payload) => {
          switch (payload.eventType) {
            case "INSERT":
            case "UPDATE":
              //? `payload.new` es la fila completa tras el cambio
              upsertRow(payload.new);
              break;

            case "DELETE":
              //? En DELETE sólo viene la llave primaria en `payload.old`
              if (payload.old.id) removeRow(payload.old.id);
              break;
          }
        },
      )
      .subscribe();

    //? Al desmontar (o cambiar de tabla/filtro) se cierra el canal
    return () => {
      supabase.removeChannel(channel);
    };
  }, [
    table,
    enabled,
    realtime,
    filterColumn,
    filterValue,
    upsertRow,
    removeRow,
  ]);

  //* Functions
  // Crear una fila (campos como `id` o `user_id` los puede completar la DB con defaults)
  const add = async (values: T): Promise<string | null> => {
    const { data, error: insertError } = await supabase
      .from(table)
      .insert(values)
      .select()
      .single();

    if (insertError) return getDbErrorMessage(insertError);

    upsertRow(data as SupabaseRow<T>);
    return null;
  };

  // Actualizar parcialmente una fila por su id
  const update = async (
    id: string,
    values: Partial<T>,
  ): Promise<string | null> => {
    const { data, error: updateError } = await supabase
      .from(table)
      .update(values as T)
      .eq("id", id)
      .select()
      .single();

    if (updateError) return getDbErrorMessage(updateError);

    upsertRow(data as SupabaseRow<T>);
    return null;
  };

  // Eliminar una fila por su id
  const remove = async (id: string): Promise<string | null> => {
    //? Con RLS, un delete no permitido NO da error: simplemente borra 0 filas.
    //? Por eso se pide `.select()` y se valida que realmente se borró algo
    const { data, error: deleteError } = await supabase
      .from(table)
      .delete()
      .eq("id", id)
      .select("id");

    if (deleteError) return getDbErrorMessage(deleteError);
    if (!data?.length) return "Registro no encontrado";

    removeRow(id);
    return null;
  };

  return {
    results,
    isPending,
    error,
    add,
    update,
    remove,
  };
};
