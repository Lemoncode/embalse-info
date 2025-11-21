import Link from "next/link";

export default function EmbalsesProvinciaPage() {
  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-4xl">Embalse por provincias</h2>
      <Link href="/embalse-provincia/malaga" className="text-blue-500 text-xl">
        Málaga
      </Link>
    </div>
  );
}
