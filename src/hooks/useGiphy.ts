import { useRef, useState } from "react";
import { Gif } from "../interfaces/gifs.interface";
import { getGifs } from "../actions/giphy.actions";

export const useGiphy = () => {
  const [query, setQuery] = useState("");
  const [gifs, setGifs] = useState<Gif[]>([]);

  const cache = useRef<Record<string, Gif[]>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const term = query.toLowerCase().trim();
    if (term.length === 0) return;

    // Antes de consultar la api se verifica si ya está en la caché
    if (cache.current[term]) {
      setGifs(cache.current[term]);
    }

    const gifs = await getGifs(term);
    cache.current[term] = gifs; // Guardar en cache
    setGifs(gifs);
  };

  return {
    query,
    gifs,
    handleQueryChange: (value: string) => setQuery(value),
    handleSubmit,
  };
};
