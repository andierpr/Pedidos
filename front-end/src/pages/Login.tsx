import { use, useState } from "react";
import Input from "../components/Input";
import { Link } from "react-router";
import Button from "../components/Button";
import { useNavigate } from "react-router";

import { useContext } from "react";
import { UserContext } from "../contexts/UserContexts";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      if (!email || !password) {
        setError("E-mail e senha são obrigatórios");
        return;
      }

      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
        credentials: "include",
      });

      if (response.status === 404) {
        setError("Usuário não encontrado");
      }
      if (response.status === 400) {
        setError("Usuário e senha são obrigatórios");
      }

      if (response.status === 401) {
        setError("Credenciais invalidas");
      }

      if (response.status === 500) {
        setError("Erro no servidor");
      }
      if (response.status === 200) {
        setError("");
        const data = await response.json();
        navigate("/");

        setUser(data);
      }
    } catch (error) {
      console.error(error);
      setError("Não foi possível conectar ao servidor");
    }
  }

  return (
    <form
      className="flex h-screen items-center justify-center bg-[#161410]"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col justify-center gap-2">
        <Link to="/">
          <img src="./logo.png" alt="logo" className="mx-auto mb-4" />
        </Link>

        <div className="mb-3 flex flex-col not-last:gap-2">
          <Input
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />

          <Input
            placeholder="Senha"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-left text-sm font-bold text-red-500">{error}</p>
        </div>

        <Button title="Login" type="submit" className="mt-4" />

        <Link to="/register" className="w-full">
          <Button title="Não tenho uma conta" variant="outline" />
        </Link>
      </div>
    </form>
  );
}

export default Login;
