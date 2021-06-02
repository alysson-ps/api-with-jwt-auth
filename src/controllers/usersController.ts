import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import mailer from "../utils/mailer";
import db from "../database/connetions";
import { secret } from "../utils/secret";
import { hashPassword, compareHash } from "../utils/hashPassword";

export const loginUser = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  if (email == null && username == null && password == null) {
    return res.status(400).json({ error: "Data sent is empty" });
  }
  const user = await db.table("users").where("email", "=", email).first();
  if (user) {

    if (await compareHash(password, user.password)) {
      const { id } = user;
      console.log(process.env.JWT_SECRET, "aqui");
      const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: 18000,
      });

      return res.status(200).json({ token: token });
    } else {
      return res.status(401).json({ error: "Not Unauthorized" });
    }
  } else {
    return res.status(400).json({ error: "User Not found" });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;
  if (email == null && username == null && password == null) {
    return res.status(400).json({ error: "Data sent is empty" });
  }

  const user = await db.table("users").where("email", "=", email).first();

  if (user) {
    return res.status(400).json({ error: "Email already exist" });
  }

  const now = new Date();

  await db.table("users").insert({
    email,
    username, 
    password: await hashPassword(password),
    created_at: now,
    updated_at: now,
  });

  const users = await db.table("users").where("email", "=", email).first();

  return res.json({ users });
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = await db.table("users").where("email", "=", email).first();

  if (!user) return res.status(400).json({ error: "User Not found" });

  const ExpireIn = new Date();
  ExpireIn.setHours(ExpireIn.getHours() + 1);
  const token = crypto.randomBytes(20).toString("hex");

  await db
    .table("users")
    .update({
      password_reset_token: token,
      password_reset_token_expire: ExpireIn,
    })
    .where("email", "=", email);

  mailer(email, token)
    .then((result) => {
      return res.json({ message: result });
    })
    .catch((err) => {
      return res.json({ message: err });
    });
};

export const resetPassword = async (req: Request, res: Response) => {
  const { email, password, token } = req.body;
  const user = await db.table("users").where("email", "=", email).first();
  const now = new Date();

  if (!user) return res.status(400).json({ error: "User Not found" });
  if (user.password_reset_token !== token)
    return res.status(400).json({ error: "Token invalid" });
  if (now > user.password_reset_token_expire)
    return res.status(400).json({ error: "Token expired" });

  await db.table("users").where("email", "=", email).update({
    password: password,
  });

  return res.status(200).json({ message: "ok" });
};
