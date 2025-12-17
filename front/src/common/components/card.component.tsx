import React from "react";

interface Props {
  children?: React.ReactNode;
}

export const Card: React.FC<Props> = (props: Props) => {
  const { children } = props;
  return (
    <div className="flex flex-col gap-6 rounded-2xl bg-(--color-base-100) p-4">
      {children}
    </div>
  );
};
