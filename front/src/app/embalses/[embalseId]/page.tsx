export const revalidate = 10;

interface Props {
  params: { embalseId: string };
}

const EmbalseDetailPage = async (props: Props) => {
  const params = props.params;
  const embalse = await fetch(
    `http://localhost:3000/api/embalses/${params.embalseId}`,
    {
      next: { revalidate },
    }
  ).then((res) => res.json());

  return (
    <div>
      <h1>{embalse.nombre}</h1>
      <ul>
        <li>
          <strong>Cuenca:</strong> {embalse.cuenca?.nombre}
        </li>
        <li>
          <strong>Capacidad:</strong> {embalse.capacidad} hm³
        </li>
        <li>
          <strong>Agua actual (AEMET):</strong> {embalse.aguaActualAemet ?? "-"}
        </li>
      </ul>
    </div>
  );
};

export default EmbalseDetailPage;
