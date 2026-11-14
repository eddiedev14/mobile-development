interface GifItemProps {
  title: string;
  url: string;
}

const GifItem = ({ title, url }: GifItemProps) => {
  return (
    <figure className="border rounded-md overflow-hidden">
      <img src={url} alt={title} className="w-full h-64 object-cover" />
      <figcaption className="p-2 text-sm truncate">{title}</figcaption>
    </figure>
  );
};

export default GifItem;
