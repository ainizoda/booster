import { Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { TelegramProvider, useWebAppInitData } from "./contexts";
import { routerConfig } from "./routes";
import { Loader } from "./components";

import "./App.scss";
import { paramsToObject } from "./utils";

const router = createBrowserRouter(routerConfig);

function App() {
  alert(JSON.stringify(paramsToObject(useWebAppInitData())));
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
