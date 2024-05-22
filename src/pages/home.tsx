import { useWebAppData } from "../contexts";

export default function HomePage() {
  const data = useWebAppData();
  return (
    <div>
      <h1>Welcome, {data.user?.first_name}</h1>
    </div>
  );
}
