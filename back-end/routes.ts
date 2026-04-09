import { Router } from "express";
import {
  auth,
  login,
  logout,
  register,
} from "./src/controller/user_controller.js";

import { authMiddleware } from "./src/middlewares/auth.js";
import { getProducts } from "./src/controller/product-controller.js";

export const router = Router();

router.post("/login", login);
router.post("/register", register);

// protegido
router.get("/me", authMiddleware, auth);

// protegido
router.post("/logout", authMiddleware, logout);

//Rota de produto
router.get("/get-Products", getProducts);
