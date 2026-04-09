//Arquivo de declaração
import jwt from "jsonwebtoken";
declare global {
  namespace Express {
    interface Request {
      user?: string | jwt.JwtPayload;
    }
  }
}
