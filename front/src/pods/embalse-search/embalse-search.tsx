"use client";

import { useState } from "react";
import { useCombobox } from "downshift";
import { useRouter } from "next/navigation";
import { SearchIcon } from "./components/search-icon";
import { Embalse, getEmbalsesCollection } from "./api";
import { EmbalseSearchModel } from "./embalse-search.model";
import { getFilteredEmbalses } from "./embalses-search.business";
import { useEffect } from "react";

export const EmbalseSearch: React.FC = () => {
  const router = useRouter();
  const [embalses, setEmbalses] = useState<Embalse[]>([]);
  const [filteredEmbalses, setFilteredEmbalses] = useState<
    EmbalseSearchModel[]
  >([]);

  useEffect(() => {
    getEmbalsesCollection().then(setEmbalses);
  }, []);

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
      setFilteredEmbalses(
        newValue ? getFilteredEmbalses(newValue, embalses) : [],
      );
    },
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) {
        //console.log("Embalse seleccionado: ", selectedItem);
        router.push(`/embalse/${selectedItem.slug}`);
      }
    },
  });

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden p-8">
      <div className="absolute inset-0 bg-[url('/images/embalse-generico.jpg')] bg-cover bg-center p-8 opacity-40"></div>
      <div className="flex grow flex-col items-center justify-center">
        <div className="bg-base-100 absolute flex max-w-10/12 flex-col gap-8 rounded-xl p-8 shadow-lg">
          <div className="text-center">
            <h2 className="font-bold">Embalses</h2>
          </div>

          <div className="flex flex-col gap-4">
            <div className="relative">
              <label className="input input-bordered flex w-full items-center gap-2">
                <input
                  {...getInputProps({
                    placeholder: "La tolba",
                    className: "grow",
                  })}
                />
                <SearchIcon />
              </label>
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
                        highlightedIndex === index
                          ? "bg-primary text-white"
                          : ""
                      }`}
                    >
                      {item.name}
                    </li>
                  ))}
              </ul>
            </div>
            <div>
              <p className="text-sm">
                Encuentra toda la información disponible de los embalses de
                España
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
