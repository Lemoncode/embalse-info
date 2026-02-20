import React from "react";
import { useCombobox } from "downshift";
import { SearchIcon } from "./search-icon";

interface Props {
  getInputProps: ReturnType<typeof useCombobox>["getInputProps"];
}

export const Input: React.FC<Props> = (props) => {
  const { getInputProps } = props;

  return (
    <label
      htmlFor="embalse-search"
      className="input input-bordered flex w-full items-center gap-2"
    >
      <input
        {...getInputProps({
          placeholder: "La tolba",
          className: "grow",
          id: "embalse-search",
          "aria-label": "Buscar embalse por nombre o provincia",
        })}
      />
      <SearchIcon />
    </label>
  );
};
