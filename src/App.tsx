import { useEffect } from "react";

function App() {
  const webapp = Telegram.WebApp;

  useEffect(() => {
    webapp.ready();
    webapp.expand();
    alert(webapp.initData);
  }, []);

  return (
    <div>
      <h1>Hi, {}</h1>
    </div>
  );
}

export default App;
