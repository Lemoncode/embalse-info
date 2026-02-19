"use client";

import { useState } from "react";
import { useCombobox } from "downshift";
import { useRouter } from "next/navigation";
import { NoResult } from "./components/no-result";
import { Embalse } from "./api";
import { EmbalseSearchModel } from "./embalse-search.vm";
import { mapEmbalseToSearch } from "./embalse-search.mapper";
import { FilteredList } from "./components/filtered-list";
import { Input } from "./components/input";

interface Props {
  embalses: Embalse[];
}

export const EmbalseSearch: React.FC<Props> = (props) => {
  const { embalses } = props;
  const router = useRouter();
  const [filteredEmbalses, setFilteredEmbalses] = useState<
    EmbalseSearchModel[]
  >([]);
  const [isNavigating, setIsNavigating] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  const getFilteredEmbalses = (inputValue: string): EmbalseSearchModel[] => {
    const lower = inputValue.toLowerCase();

    return embalses
      .filter(
        (e) =>
          e.nombre.toLowerCase().includes(lower) ||
          e.provincia.toLowerCase().includes(lower),
      )
      .map(mapEmbalseToSearch);
  };

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getItemProps,
    highlightedIndex,
  } = useCombobox<EmbalseSearchModel>({
    items: filteredEmbalses,
    itemToString: (item) => (item ? item.name : ""),
    onInputValueChange: ({ inputValue: newValue }) => {
      setInputValue(newValue || "");
      setFilteredEmbalses(newValue ? getFilteredEmbalses(newValue) : []);
    },
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) {
        setIsNavigating(true);
        router.push(`/embalse/${selectedItem.slug}`);
      }
    },
  });

  const showNoResults = inputValue.length > 0 && filteredEmbalses.length === 0 && !isNavigating;

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden p-8">
      <div
        className="absolute inset-0 bg-[url('/images/embalse-generico.jpg')] bg-cover bg-center p-8 opacity-40"
        aria-hidden="true"
      ></div>
      <div className="flex grow flex-col items-center justify-center">
        <section
          className="bg-base-100 absolute flex max-w-10/12 flex-col gap-8 rounded-xl p-8 shadow-lg"
          aria-labelledby="search-title"
        >
          <div className="text-center">
            <h2 id="search-title" className="font-bold">
              Embalses
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            <div className="relative" role="search">
              <Input getInputProps={getInputProps} />
              <FilteredList
                isOpen={isOpen}
                filteredEmbalses={filteredEmbalses}
                getMenuProps={getMenuProps}
                getItemProps={getItemProps}
                highlightedIndex={highlightedIndex}
              />
              {showNoResults && <NoResult inputValue={inputValue} />}
            </div>
            <div>
              <p className="text-sm">
                Encuentra toda la información disponible de los embalses de
                España
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
