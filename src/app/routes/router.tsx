import { VerifyProvider } from "@/features/signup/provider";
import { SignIn } from "@/pages/signin";
import { SignUp } from "@/pages/signup";
import { useAuth } from "@/shared/hooks/auth";
import { paths } from "@/shared/paths";
import { ErrorPage } from "@/widgets/errors";
import { Navigate, createBrowserRouter } from "react-router-dom";
import { RootLayout, AccountsLayout, DefaultLayout } from "./layouts";
import { RootPage } from "@/pages/root";
import { TestPage } from "@/pages/test";

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <></>;
  return isAuthenticated ? element : <Navigate to={paths.signIn} />;
};

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
        element: <ProtectedRoute element={<RootLayout />} />,
        children: [
          {
            path: paths.root,
            element: <RootPage />,
          },
          {
            path: paths.test,
            element: <TestPage />,
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
