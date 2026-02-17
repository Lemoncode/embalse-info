import React from "react";

interface Props {
  inputValue: string;
}

export const NoResult: React.FC<Props> = (props) => {
  const { inputValue } = props;
  return (
    <div
      className="bg-base-100 absolute z-10 mt-1 w-full rounded-lg p-4 text-center shadow-lg"
      role="status"
      aria-live="polite"
    >
      <p className="text-sm opacity-70">
        No se encontraron embalses que coincidan con &quot;
        {inputValue}&quot;
      </p>
    </div>
  );
};
