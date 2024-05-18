import { useEffect } from "react";
import "./App.css";

function App() {
  const webapp = Telegram.WebApp;

  useEffect(() => {
    webapp.ready();
    webapp.expand();
  }, []);

  return (
    <div>
      <h1>Hi, {webapp.initData}</h1>
    </div>
  );
}

export default App;
