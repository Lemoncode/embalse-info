import Link from "next/link";

const RootPage = () => {
  return (
    <div className="relative flex flex-1 flex-col overflow-hidden p-8">
      <div className="absolute inset-0 bg-[url('/images/embalse-generico.jpg')] bg-cover bg-center p-8 opacity-40"></div>
      <div className="flex grow flex-col items-center justify-center">
        <div className="bg-base-100 absolute flex max-w-10/12 flex-col gap-8 rounded-xl p-8 shadow-lg">
          <div className="text-center">
            <h2 className="font-bold">Embalses</h2>
          </div>

          <div className="flex flex-col gap-4">
            <label className="input input-bordered flex w-full items-center gap-2">
              <input type="text" placeholder="La tolba" className="grow" />

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-6 w-6 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
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

export default RootPage;
