import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChildrenProps } from "../interfaces";

const queryClient = new QueryClient();

export const TanstakQueryProivder = ({ children }: ChildrenProps) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
