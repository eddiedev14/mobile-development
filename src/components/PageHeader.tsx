interface Props {
  title: string;
  paragraph?: string;
}

export const PageHeader = ({ title, paragraph }: Props) => {
  return (
    <header className="flex flex-col gap-1 text-center">
      <h1 className="text-4xl font-bold">{title}</h1>
      {paragraph && <p className="text-lg font-light">{paragraph}</p>}
    </header>
  );
};
