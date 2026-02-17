import { ReservoirInfo } from "../embalse.vm";

interface Props {
  reservoirInfo: ReservoirInfo;
}

export const ReservoirCardInfo: React.FC<Props> = (props) => {
  const { reservoirInfo } = props;
  return (
    <section
      className="flex w-full flex-col items-start gap-4"
      aria-labelledby="discover-title"
    >
      <h2 id="discover-title">Descubre el embalse</h2>
      <p>{reservoirInfo?.Description}</p>
      <img
        className="mt-4 w-full rounded-xl sm:w-1/2 lg:w-1/3"
        src="/images/embalse-generico.jpg"
        alt="Vista general del embalse"
      />
    </section>
  );
};
