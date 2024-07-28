import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { TanstakQueryProivder } from "@/shared/providers";

function App() {
  return (
    <TanstakQueryProivder>
      <RouterProvider router={router} />
    </TanstakQueryProivder>
  );
}

export default App;
