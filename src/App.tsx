import { Suspense, useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { TelegramProvider, useWebAppData, useWebAppInitData } from "./contexts";
import { routerConfig } from "./routes";
import { Loader } from "./components";

import "./App.scss";
import { paramsToObject } from "./utils";

const router = createBrowserRouter(routerConfig);

function App() {
  const data = useWebAppData();
  useEffect(() => {
    console.log(data?.start_param);
  }, [data]);
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
