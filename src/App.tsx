import { Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { TelegramProvider } from "./contexts";
import { routerConfig } from "./routes";
import "./App.scss";

const router = createBrowserRouter(routerConfig);

function App() {
  return (
    <TelegramProvider>
      <Suspense fallback={<div>loading</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </TelegramProvider>
  );
}

export default App;
