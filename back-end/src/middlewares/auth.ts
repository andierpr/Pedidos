import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies?.user;

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ message: "Erro no servidor" });
  }

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    return next();
  } catch (error) {
    console.error("Erro JWT:", error);
    return res.status(401).json({
      message: "Token inválido ou expirado",
    });
  }
};
