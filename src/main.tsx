import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
import "./index.scss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routerConfig } from "./routes.tsx";
import { TelegramProvider } from "./contexts/telegram.tsx";
import App from "./App.tsx";

// const router = createBrowserRouter(routerConfig);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <TelegramProvider>
    <App />
  </TelegramProvider>
);
