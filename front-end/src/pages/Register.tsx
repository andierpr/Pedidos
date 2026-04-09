import { useState } from "react";
import Input from "../components/Input";

import { Link } from "react-router";
import Button from "../components/Button";

const caminho = "http://localhost:3000/register";

const Register = () => {
  // codigo javascript pode ser escrito aqui

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmePassword, setConfirmePassword] = useState("");
  const [cep, setCep] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      if (!name || !email || !password || !cep) {
        setError("Todas as informações são obrigatórias");
        return;
      }
      if (password !== confirmePassword) {
        setError("Senhas não conferem");
        return;
      }

      const response = await fetch(caminho, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ name, email, password, cep }),
      });

      switch (response.status) {
        case 409:
          setError("E-mail já cadastrado");
          break;
        case 400:
          setError("Todas as informções são obrigatorias");
          break;
        case 201:
          setName("");
          setEmail("");
          setPassword("");
          setConfirmePassword("");
          setCep("");
          setError("");
          break;
        case 500:
          setError("Tente mais tarde");
          break;
        default:
          setError("");
      }
      //pegar os dados
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
      return;
    }

    // console.log({ name, email, password, confirmePassword, cep });
  }

  return (
    <form
      className="flex h-screen items-center justify-center bg-[#161410]"
      onClick={handleSubmit}
    >
      <div className="flex flex-col justify-center gap-2">
        <Link to="/">
          <img src="./logo.png" alt="logo" className="mx-auto mb-4" />
        </Link>

        <Input
          placeholder="Nome"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <Input
          placeholder="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <Input
          placeholder="senha"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Input
          placeholder="Confirme sua senha"
          type="password"
          onChange={(e) => setConfirmePassword(e.target.value)}
          value={confirmePassword}
        />
        <Input
          placeholder="CEP"
          type="text"
          onChange={(e) => setCep(e.target.value)}
          value={cep}
        />
        <p className="font-bold text-red-500">{error}</p>

        <div className="mt-3 flex w-full flex-col gap-2">
          <Button title="Criar conta" type="submit" />

          <Link to={"/login"} className="w-full">
            <Button title="Já tenho uma conta" variant="outline" />
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Register;
