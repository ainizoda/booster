import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
import "./index.scss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routerConfig } from "./routes.tsx";

const router = createBrowserRouter(routerConfig);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
