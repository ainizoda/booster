import { useEffect } from "react";

function App() {
  const webapp = Telegram.WebApp;

  useEffect(() => {
    webapp.ready();
    webapp.expand();
    webapp.themeParams.bg_color = "#fff";
  }, []);

  return (
    <div>
      <h1>Hi, {}</h1>
    </div>
  );
}

export default App;
