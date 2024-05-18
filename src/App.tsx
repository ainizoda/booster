import { TelegramProvider } from "./contexts/telegram";
import "./App.scss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routerConfig } from "./routes";

const router = createBrowserRouter(routerConfig);

function App() {
  return (
    <TelegramProvider>
      <RouterProvider router={router} />
    </TelegramProvider>
  );
}

export default App;
