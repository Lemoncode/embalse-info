import { getDeveloperListCached } from "./api";
import { EquipoComponent } from "./equipo.component";

export const EquipoPod: React.FC = async () => {
  const developers = await getDeveloperListCached();
  return <EquipoComponent developers={developers} />;
};
