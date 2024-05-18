import { useWebAppData } from "../contexts/telegram";

export default function WelcomePage() {
  const initData = useWebAppData();
  return <div className="text-3xl">Welcome, {initData.user?.first_name}</div>;
}
