import Link from "next/link";
import EmbalseAutocomplete from "../components/embalse-autocomplete.component";

const RootPage = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Información de Embalses de España</h1>
        <p className="hero-subtitle">
          Encuentra información actualizada sobre los embalses españoles
        </p>
      </div>

      <div className="search-section">
        <h2>Buscar Embalse</h2>
        <p className="search-description">
          Escribe el nombre de un embalse para acceder a su información
          detallada
        </p>
        <EmbalseAutocomplete />
      </div>

      <div className="navigation-section">
        <h2>Explorar por Provincia</h2>
        <p className="nav-description">
          También puedes navegar por provincias para descubrir todos los
          embalses disponibles
        </p>
        <Link href="/embalse-provincia" className="province-link">
          Ver Embalses por Provincia →
        </Link>
      </div>
    </div>
  );
};

export default RootPage;
