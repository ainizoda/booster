import { Suspense, useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { TelegramProvider, useWebAppData } from "./contexts";
import { routerConfig } from "./routes";
import { Loader } from "./components";

import "./App.scss";

const router = createBrowserRouter(routerConfig);

function App() {
  const data = useWebAppData();
  useEffect(() => {
    alert(JSON.stringify(data));
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
