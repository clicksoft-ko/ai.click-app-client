import { useAuth } from "@/shared/hooks/auth";
import { paths } from "@/shared/paths";
import { JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const { pathname } = useLocation();
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <></>;
  if (!isAuthenticated) return <Navigate to={paths.signIn} />;
  return pathname === paths.root ? <Navigate to={paths.medical} /> : element;
};