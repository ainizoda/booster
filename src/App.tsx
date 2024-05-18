import { useEffect } from "react";
import "./App.css";
import { paramsToObject } from "./utils/paramsToObject";

function App() {
  const webapp = Telegram.WebApp;

  useEffect(() => {
    webapp.ready();
    webapp.expand();
  }, []);

  return (
    <div>
      <h1>Hi, {paramsToObject(webapp.initData).user?.first_name}</h1>
    </div>
  );
}

export default App;
