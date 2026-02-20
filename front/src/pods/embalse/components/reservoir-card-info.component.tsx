import { ReservoirInfo } from "../embalse.vm";
import React from "react";
import Image from "next/image";

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
      <h2 id="discover-title">Descubre el embalse {reservoirInfo?.name}</h2>
      <p>{reservoirInfo?.description}</p>
      <img
        className="mt-4 w-full rounded-xl md:aspect-434/171"
        src={reservoirInfo?.mainPicture?.url}
        alt={reservoirInfo?.mainPicture?.name || "Imagen del embalse"}
        width={200}
        height={100}
      />
      {reservoirInfo?.author && (
        <p className="text-xs text-gray-500">
          Foto:{" "}
          {reservoirInfo.authorUrl ? (
            <a
              href={reservoirInfo.authorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              {reservoirInfo.author}
            </a>
          ) : (
            reservoirInfo.author
          )}
        </p>
      )}
    </section>
  );
};
