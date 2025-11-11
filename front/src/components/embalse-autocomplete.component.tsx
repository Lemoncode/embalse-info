"use client";

import React from "react";
import Select, { SingleValue } from "react-select";
import { useRouter } from "next/navigation";
import { embalsesData, formatEmbalseForUrl } from "../data/embalses";

interface OptionType {
  value: string;
  label: string;
  provincia: string;
  capacidad: number;
}

export default function EmbalseAutocomplete() {
  const router = useRouter();
  const [selectedEmbalse, setSelectedEmbalse] =
    React.useState<SingleValue<OptionType>>(null);

  const options: OptionType[] = embalsesData.map((embalse) => ({
    value: formatEmbalseForUrl(embalse.nombre),
    label: embalse.nombre,
    provincia: embalse.provincia,
    capacidad: embalse.capacidad,
  }));

  const handleChange = (selectedOption: SingleValue<OptionType>) => {
    setSelectedEmbalse(selectedOption);
    if (selectedOption) {
      router.push(`/embalse/${selectedOption.value}`);
    }
  };

  return (
    <>
      <Select
        value={selectedEmbalse}
        onChange={handleChange}
        options={options}
        placeholder="Buscar embalse por nombre..."
        isSearchable
        noOptionsMessage={() => "No se encontraron embalses"}
        loadingMessage={() => "Cargando..."}
      />
    </>
  );
}
