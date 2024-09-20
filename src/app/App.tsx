import { TanstakQueryProivder } from "@/shared/providers";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";

function App() {
  return (
    <TanstakQueryProivder>
      <RouterProvider router={router} />
    </TanstakQueryProivder>
  );
}

export default App;
