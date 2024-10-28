import { TanstakQueryProivder } from "@/shared/providers";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <TanstakQueryProivder>
      <Toaster/>
      <RouterProvider router={router} />
    </TanstakQueryProivder>
  );
}

export default App;
