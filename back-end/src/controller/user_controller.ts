import type { Request, Response } from "express";
import { prisma } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
//Tempo unidades de hora para milissegundo 5 h = 18000000 ms
const tempo = 18000000;

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "E-mail e senha são obrigatórios" });
      return;
    }

    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      res.status(404).json({ message: "Usuário não encontrado." });
      return;
    }

    const compararSenha = await bcrypt.compare(password, user?.password);

    if (!compararSenha) {
      res.status(401).json({ message: "Usuário não autorizado" });
      return;
    }
    //Inserir cookies
    const userInfo = {
      id: user.id,
      name: user.name,
      email: user.email,
      cep: user.cep,
      admin: user.admin,
    };

    if (!process.env.JWT_SECRET) {
      return;
    }
    const token = jwt.sign(userInfo, process.env.JWT_SECRET);

    res.cookie("user", token, {
      maxAge: tempo,
    }); //tempo de 5h de expiração ( hora para milissegundo)

    res.status(200).json(userInfo);
  } catch (error) {
    res.status(500).json({ message: "Erro no Servidor." });
    return;
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, cep } = req.body;

    if (!name || !email || !password || !cep) {
      res
        .status(400)
        .json({ messege: "Todas as informações são obrigatórias" });
      return;
    }

    const hash = await bcrypt.hash(password, 10);
    console.log(hash);

    const user = await prisma.user.findFirst({
      where: { email: email },
    });
    //se a informação já existe
    if (user?.email) {
      //409 informação ja existe
      res.status(409).json({ message: "E-mail já cadastrdado" });
    }

    const newUser = await prisma.user.create({
      data: { name: name, email: email, password: hash, cep: cep },
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ messege: "" });
    return;
  }
};

export const auth = async (req: Request, res: Response) => {
  try {
    const { user } = req;
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor" });
    return;
  }
};

export const logout = async (req: Request, res: Response) => {
  //Desestruturando os cookies
  const { user } = req.cookies;
  if (user) {
    res.clearCookie("user");
    res.json({ message: "Usuário deslogado" });
  }
};
