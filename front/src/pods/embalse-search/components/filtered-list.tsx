import React from "react";
import { useCombobox } from "downshift";
import { EmbalseSearchModel } from "../embalse-search.vm";

interface Props {
  isOpen: boolean;
  filteredEmbalses: EmbalseSearchModel[];
  getMenuProps: ReturnType<typeof useCombobox>["getMenuProps"];
  getItemProps: ReturnType<typeof useCombobox>["getItemProps"];
  highlightedIndex: number | null;
}

export const FilteredList: React.FC<Props> = (props) => {
  const {
    isOpen,
    filteredEmbalses,
    getMenuProps,
    getItemProps,
    highlightedIndex,
  } = props;

  return (
    <ul
      {...getMenuProps()}
      className={`menu bg-base-100 absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-lg shadow-lg ${
        isOpen && filteredEmbalses.length > 0 ? "" : "hidden"
      }`}
    >
      {isOpen &&
        filteredEmbalses.map((item, index) => (
          <li
            key={item.slug}
            {...getItemProps({ item, index })}
            className={`cursor-pointer px-4 py-2 ${
              highlightedIndex === index ? "bg-primary text-white" : ""
            }`}
          >
            {item.name}
          </li>
        ))}
    </ul>
  );
};
