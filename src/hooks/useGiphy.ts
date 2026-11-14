import { useEffect, useRef, useState } from "react";
import { Gif } from "../interfaces/gifs.interface";
import { getGifs } from "../actions/giphy.actions";
import { normalizeQuery } from "../utils/gif.utils";

export const useGiphy = () => {
  const [query, setQuery] = useState("");
  const [gifs, setGifs] = useState<Gif[]>([]);

  const cache = useRef<Record<string, Gif[]>>({});

  // * Función generica para buscar gifs usando el action
  const searchGifs = async (term: string) => {
    // Antes de consultar la api se verifica si ya está en la caché
    if (cache.current[term]) {
      setGifs(cache.current[term]);
    }

    const gifs = await getGifs(term);
    cache.current[term] = gifs; // Guardar en cache
    setGifs(gifs);
  };

  // * useEffect para debouncer
  useEffect(() => {
    const term = normalizeQuery(query);
    if (term.length === 0) return;

    const timer = setTimeout(() => {
      searchGifs(query);
    }, 800);

    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  //* Handlers
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const term = normalizeQuery(query);
    if (term.length === 0) return;
    searchGifs(term);
  };

  return {
    query,
    gifs,
    handleQueryChange: (value: string) => setQuery(value),
    handleSubmit,
  };
};
