import { Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { TelegramProvider } from "./contexts";
import { routerConfig } from "./routes";
import spinner from "./assets/spinner.svg";

import "./App.scss";

const router = createBrowserRouter(routerConfig);
const loader = (
  <div className="flex h-screen w-full justify-center items-center">
    <img src={spinner} alt="spinner" />
  </div>
);
function App() {
  return (
    <TelegramProvider>
      <Suspense fallback={loader}>
        <RouterProvider router={router} />
      </Suspense>
    </TelegramProvider>
  );
}

export default App;
