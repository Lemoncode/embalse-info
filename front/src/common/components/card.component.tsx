import React from "react";

interface Props {
  children?: React.ReactNode;
  className?: string;
}

export const Card: React.FC<Props> = (props: Props) => {
  const { children, className } = props;
  return (
    <div
      className={
        className
          ? className
          : "bg-base-100 m-8 flex flex-col gap-6 rounded-2xl p-4"
      }
    >
      {children}
    </div>
  );
};
