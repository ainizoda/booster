import { useEffect } from "react";
function App() {
  const webapp = Telegram.WebApp;

  useEffect(() => {
    webapp.ready();
    webapp.expand();
    webapp.MainButton.show();
    webapp.MainButton.text = "press"
    alert(webapp.initData);
  }, []);

  return (
    <div>
      <h1>Hi, {}</h1>
    </div>
  );
}

export default App;
