import React from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { ChildrenProps } from "@/shared/interfaces/props";

const RootErrorFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <div>
      {(error as any).message}
      <button
        style={{
          width: "100%",
          padding: "20px",
          border: "none",
          backgroundColor: "transparent",
          fontWeight: "bold",
          color: "hotpink",
        }}
        onClick={() => resetErrorBoundary()}
      >
        재 연결 시도
      </button>
    </div>
  );
};

const RootErrorBoundary: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <ErrorBoundary FallbackComponent={RootErrorFallback}>
      {children}
    </ErrorBoundary>
  );
};

export { RootErrorBoundary };
