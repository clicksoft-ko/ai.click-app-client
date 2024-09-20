import { useAuth } from "@/shared/hooks/auth";
import { paths } from "@/shared/paths";
import { JSX } from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ element }: { element: JSX.Element; }) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <></>;
  return isAuthenticated ? element : <Navigate to={paths.signIn} />;
};
