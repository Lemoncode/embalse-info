import Link from "next/link";

export default function EmbalsesProvinciaPage() {
  return (
    <div className="flex flex-col gap-8">
      <h2>Embalse por provincias</h2>
      <Link href="/embalse-provincia/malaga" className="link-accessible">
        Málaga
      </Link>
    </div>
  );
}
