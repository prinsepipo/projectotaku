import { Navigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";

export default function GuestRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;
  if (user) return <Navigate to="/kanban" replace />;

  return <>{children}</>;
}
