import React from "react";
import { Card } from "@/common/components/card.component";
import { PROVINCIAS } from "@/core/constants";
import Link from "next/link";

export const EmbalseProvinciaList: React.FC = () => {
  return (
    <Card className="mx-auto w-full pt-6 pr-4 pb-6 pl-4 md:max-w-[900px] md:p-8">
      <div className="bg-base-100 rounded-2xl p-6">
        <h2>Embalses por provincias</h2>
        <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 md:grid-cols-3">
          {PROVINCIAS.map(({ id, name }) => (
            <Link
              key={id}
              href={`/embalse-provincia/${id}`}
              className="link-accessible"
            >
              {name}
            </Link>
          ))}
        </div>
      </div>
    </Card>
  );
};
