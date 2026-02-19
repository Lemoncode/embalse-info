import { ReservoirInfo } from "../embalse.vm";

interface Props {
  reservoirInfo: ReservoirInfo;
}

export const ReservoirCardInfo: React.FC<Props> = (props) => {
  const { reservoirInfo } = props;
  return (
    <div className="flex w-full flex-col items-start gap-4">
      <h2>Descubre el embalse {reservoirInfo?.name}</h2>
      <p>{reservoirInfo?.description}</p>
      <img
        className="mt-4 w-full rounded-xl"
        src={reservoirInfo?.mainPicture?.url}
        alt={reservoirInfo?.mainPicture?.name || "Imagen del embalse"}
      />
    </div>
  );
};
