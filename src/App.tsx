import { Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { TelegramProvider } from "./contexts";
import { routerConfig } from "./routes";
import { Loader } from "./components";

import "./App.scss";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter(routerConfig);

function App() {
  return (
    <TelegramProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>
    </TelegramProvider>
  );
}

export default App;
