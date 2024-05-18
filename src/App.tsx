import { useEffect } from "react";
function App() {
  const webapp = Telegram.WebApp;

  useEffect(() => {
    webapp.ready();
    webapp.expand();
    webapp.MainButton.show();
    webapp.MainButton.text = "press";
    webapp.MainButton.onClick = () => {
      webapp.MainButton.text = "hi";
      return webapp.MainButton;
    };
  }, []);

  return (
    <div>
      <h1>Hi, {}</h1>
    </div>
  );
}

export default App;
