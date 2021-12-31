type TTitles = {
  texto?: string;
  classe: string;
};
const Titles = ({ texto, classe }: TTitles) => {
  return <div className={classe}>{texto}</div>;
};

export default Titles;
