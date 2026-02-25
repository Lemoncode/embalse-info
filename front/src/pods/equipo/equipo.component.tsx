import type { Developer } from "./api";

interface Props {
  developers: Developer[];
}

export const EquipoComponent: React.FC<Props> = ({ developers }) => {
  return (
    <div className="flex flex-wrap justify-center gap-8">
      {developers.map((dev) => (
        <a
          key={dev.id}
          href={dev.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-2"
        >
          <img
            src={dev.picture.url}
            alt={dev.fullname}
            className="h-24 w-24 rounded-full border-2 border-accent object-cover"
          />
          <span className="text-sm font-medium">{dev.fullname}</span>
        </a>
      ))}
    </div>
  );
};
