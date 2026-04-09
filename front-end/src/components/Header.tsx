import { Link } from "react-router";
import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContexts";
import { useLocation } from "react-router";
import { LogOut, ShoppingCart, Box, LayoutDashboard, Plus } from "lucide-react";

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();

  //Função para autenticar usuários (Auth User)
  const autenticacaoDoUsuario = async () => {
    try {
      const response = await fetch("http://localhost:3000/me", {
        credentials: "include",
         method: "GET",
      });

      if (response.status !== 200) {
        return;
      }
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.log("error.... ");
      return;
    }
  };
  const handlerLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/logout", {
        credentials: "include",
        method: "POST",
      });

      if (!response.ok) {
        console.log("Não deu certo");
        return;
      }
      setUser(null);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  useEffect(() => {
    autenticacaoDoUsuario();
  }, []);

  //Função para classes do menu
  const getNavClass = (path: string) => {
    const classeBase =
      "h-35px w-35px flex cursor-pointer items-center justify-center rounded-md border";
    if (location.pathname === path) {
      return `${classeBase} text-[#161410] bg-[#F2DAAC]`;
    } else {
      return classeBase;
    }
  };

  return (
    <div className="bg-[#161410]">
      <div className="mx-auto flex w-full max-w-184.25 items-center justify-between p-3 md:p-0">
        <Link to="/">
          <img src="./logo.png" alt="" />
        </Link>

        {user ? (
          <div className="flex items-center gap-8 text-white">
            {user.admin && (
              <div className="items-center gap-2 text-[#F2DAAC] md:flex">
                <Link to="/">
                  <div className={getNavClass("/")}>
                    <Box size={18} />
                  </div>
                </Link>

                <Link to="/pedidos">
                  <div className={getNavClass("/pedidos")}>
                    <LayoutDashboard size={18} />
                  </div>
                </Link>

                <Link to="/">
                  <div className="flex h-8.75 w-8.75 cursor-pointer items-center justify-center rounded-md border">
                    <Plus size={18} />
                  </div>
                </Link>
              </div>
            )}

            <div className="relative cursor-pointer">
              <ShoppingCart size={18} />
              <p className="absolute -top-4 -right-4 flex h-5 w-5 items-center justify-center rounded-full bg-[#F2DAAC] text-[#161410]">
                1
              </p>
            </div>

            <div className="flex items-center gap-2">
              <p>{user?.name} </p>
              <LogOut
                size={18}
                className="cursor-pointer"
                onClick={() => handlerLogout()}
              />
            </div>
          </div>
        ) : (
          <Link to="/login">
            <div className="flex h-8.75 w-32.5 cursor-pointer items-center justify-center rounded-sm bg-[#F2DAAC]">
              Entrar
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
