import { useAuth } from "@/shared/hooks/auth";
import { paths } from "@/shared/paths";
import { Link } from "react-router-dom";

export const TestPage = () => {
  const { user } = useAuth();
  return (
    <div>
      {user?.name} <Link to={paths.root}>dsaddas</Link>
    </div>
  );
};
