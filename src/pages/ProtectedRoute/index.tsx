import { useMemo } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

type Props = {
  children: any;
};

const ProtectedRoute = ({ children }: Props) => {
  const { tokens } = useAuth();

  const tokenIsValid = useMemo(() => {
    return tokens && tokens.expires_at > Date.now();
  }, [tokens]);

  if (!tokenIsValid) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
