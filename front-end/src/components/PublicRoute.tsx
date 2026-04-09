import { useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router";

const PublicRoute = ({ children }: { children: ReactNode }) => {
  const [isChecking, setChecking] = useState(true);
  const navigate = useNavigate();

  //useEffect = espera o componente carregar e depois executa
  useEffect(() => {
    const cookie = document.cookie;
    if (cookie) {
      const cookies = cookie.split(";");
      const userCookie = cookies.find((c) => c.trim().startsWith("user="));

      if (userCookie) {
        navigate("/", { replace: true });
        return;
      }
    }
    setChecking(false);
  }, [navigate]);
  if (isChecking) {
    return <p>carregando...</p>;
  }
  return <p>{children}</p>;
};

export default PublicRoute;
