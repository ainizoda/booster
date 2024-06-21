import { Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

import { TelegramProvider } from "./contexts";
import { routerConfig } from "./routes";
import { Loader } from "./components";

import "./App.scss";

const router = createBrowserRouter(routerConfig);

function App() {
  function fallbackRender({ error }: FallbackProps) {
    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre style={{ color: "red" }}>{error.message}</pre>
      </div>
    );
  }
  return (
    <ErrorBoundary fallbackRender={fallbackRender}>
      <TelegramProvider>
        <Toaster position="top-center" reverseOrder={false} />
        <Suspense fallback={<Loader />}>
          <RouterProvider router={router} />
        </Suspense>
      </TelegramProvider>
    </ErrorBoundary>
  );
}

export default App;
