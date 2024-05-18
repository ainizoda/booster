import { useEffect } from "react";
import { paramsToObject } from "./utils";

import "./App.scss";
import { useWebAppData } from "./contexts/telegram";

function App() {
  const initData = useWebAppData();
  return (
    <div className="text-3xl">
      <h1>Welcome to Booster, {initData.user?.first_name}</h1>
    </div>
  );
}

export default App;
