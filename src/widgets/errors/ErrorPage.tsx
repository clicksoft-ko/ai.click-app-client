import { useRouteError } from "react-router-dom";

const ErrorPage: React.FC = () => {
  const error = useRouteError();

  return (
    <div>
      <h1>오류가 발생했습니다</h1>
      <p>{(error as any).message}</p>
      <button
        style={{
          width: "100%",
          padding: "20px",
          border: "none",
          backgroundColor: "transparent",
          fontWeight: "bold",
          color: "hotpink",
        }}
        onClick={() => window.location.reload()}
      >
        재 연결 시도
      </button>
    </div>
  );
};

export { ErrorPage };
