import { useRouteError } from "react-router-dom";

const ErrorPage: React.FC = () => {
  const error = useRouteError();

  return (
    <div className="flex h-[100vh] w-full flex-col items-center justify-center bg-gray-100 p-5 shadow-lg">
      <h1 className="mb-4 text-4xl font-bold text-red-600">
        오류가 발생했습니다
      </h1>
      <p className="mb-8 text-center text-xl text-gray-500">
        {(error as any)?.message}
      </p>
      <button
        className="transform cursor-pointer rounded-full bg-blue-500 px-6 py-3 text-base text-white shadow-md transition duration-300 hover:scale-105 hover:bg-blue-700"
        onClick={() => window.location.reload()}
      >
        재 연결 시도
      </button>
    </div>
  );
};

export { ErrorPage };
