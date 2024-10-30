import { VerifyProvider } from "@/features/signup/provider";
import { RootPage } from "@/pages/root";
import { MedicalPage } from "@/pages/root/medical";
import { WardPage } from "@/pages/root/ward";
import { SignIn } from "@/pages/signin";
import { SignUp } from "@/pages/signup";
import { TestPage } from "@/pages/test";
import { useAuth } from "@/shared/hooks/auth";
import { paths } from "@/shared/paths";
import { ErrorPage } from "@/widgets/errors";
import { JSX } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import { AccountsLayout, DefaultLayout, RootLayout } from "./layouts";
import { ProtectedRoute, ProtectGeoLocation } from "./protects";
import { CustomErrorPage } from "@/pages/error";

const RedirectIfAuthenticated = ({ element }: { element: JSX.Element }) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <></>;
  return isAuthenticated ? <Navigate to={paths.root} /> : element;
};

const router: any = createBrowserRouter([
  {
    path: paths.root,
    element: <DefaultLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: paths.test,
        element: <TestPage />,
      },
      {
        element: (
          <ProtectedRoute
            element={<ProtectGeoLocation element={<RootLayout />} />}
          />
        ),
        children: [
          {
            path: paths.root,
            element: <RootPage />,
          },
          {
            path: paths.medical,
            element: <MedicalPage />,
          },
          {
            path: paths.ward,
            element: <WardPage />,
          },
        ],
      },
      {
        element: <RedirectIfAuthenticated element={<AccountsLayout />} />,
        children: [
          {
            path: paths.signIn,
            element: <SignIn />,
          },
          {
            path: paths.error,
            element: <CustomErrorPage />,
          },
          {
            path: paths.signUp,

            element: (
              <VerifyProvider>
                <SignUp />
              </VerifyProvider>
            ),
          },
        ],
      },
    ],
  },
]);

export { router };
