import { Gif } from "../interfaces/gifs.interface";
import GifItem from "./GifItem";

interface Props {
  gifs: Gif[];
}

const GifList = ({ gifs }: Props) => {
  return (
    <section className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {gifs.map((gif) => (
        <GifItem key={gif.id} title={gif.title} url={gif.imageUrl} />
      ))}
    </section>
  );
};

export default GifList;
