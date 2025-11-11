import Link from "next/link";

const RootPage = () => {
  return (
    <div>
      <h1>Home</h1>
      <Link href="/embalse-provincia">Embalses por Provincia</Link>
    </div>
  );
};

export default RootPage;
