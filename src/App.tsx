import { useEffect } from "react";
import { paramsToObject } from "./utils";

import "./App.scss";

function App() {
  const webapp = Telegram.WebApp;

  useEffect(() => {
    webapp.ready();
    webapp.expand();
  }, []);

  return (
    <div className="text-red-300">
      <h1>Hi, {paramsToObject(webapp.initData).user?.first_name}</h1>
    </div>
  );
}

export default App;
