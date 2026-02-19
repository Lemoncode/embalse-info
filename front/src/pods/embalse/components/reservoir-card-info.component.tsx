import { ReservoirInfo } from "../embalse.vm";

interface Props {
  reservoirInfo: ReservoirInfo;
}

export const ReservoirCardInfo: React.FC<Props> = (props) => {
  const { reservoirInfo } = props;
  return (
    <div className="flex w-full flex-col items-start gap-4">
      <h2>Descubre el embalse</h2>
      <p>{reservoirInfo?.Description}</p>
      <img
        className="mt-4 w-full rounded-xl md:aspect-434/171"
        src="/images/embalse-generico.jpg"
        alt="Mapa de embalses"
      />
    </div>
  );
};
