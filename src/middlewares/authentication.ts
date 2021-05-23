import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { secret } from "../utils/secret";

const authentication = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("x-acess-token");
  if (!token) return res.status(401).json({ error: "No token provider" });

  jwt.verify(token, secret, (err, decoded) => {
    if (err != null) {
      return res.status(500).json({ error: err });
    }

    req.user_id = (<any>decoded).id;
    next();
  });
};

export default authentication;
