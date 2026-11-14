import { toast } from "react-toastify";
import { Gif } from "../interfaces/gifs.interface";
import { giphyApi } from "../api/giphy.api";
import { GifsResponse } from "../interfaces/giphy.response.interface";

const getGifs = async (query: string): Promise<Gif[]> => {
  const params = {
    q: query,
    limit: "18",
  };

  try {
    const res = await giphyApi.get("/search", { params });
    const data: GifsResponse[] = res.data.data;
    const gifs: Gif[] = data.map((gif) => ({
      id: gif.id,
      title: gif.title,
      imageUrl: gif.images.original.url,
    }));

    return gifs;
  } catch (error) {
    toast.error(("Ocurrió un error obteniendo los gifs" + error) as string);
    return [];
  }
};

export { getGifs };
