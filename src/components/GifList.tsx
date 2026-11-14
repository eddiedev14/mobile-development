import GifItem from "./GifItem";

const GifList = () => {
  // TODO: reemplazar por los gifs que vienen de la API de Giphy
  const gifs: { id: string; title: string; url: string }[] = [];

  return (
    <section className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {gifs.map((gif) => (
        <GifItem key={gif.id} title={gif.title} url={gif.url} />
      ))}
    </section>
  );
};

export default GifList;
