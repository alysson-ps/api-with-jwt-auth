import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import mailer from "../utils/mailer";
import db from "../database/connetions";
import { hashPassword, compareHash } from "../utils/hashPassword";

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (email == null && password == null) {
    return res.status(400).json({ error: "Data sent is empty" });
  }
  const user = await db.table("users").where("email", "=", email).first();
  if (user) {

    if (await compareHash(password, user.password)) {
      const { id } = user;
      const token = jwt.sign({ id }, process.env.JWT_SECRET as string, {
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
  const { email, confirmPassword, password } = req.body;
  if (email == null && confirmPassword == null && password == null) {
    return res.status(400).json({ error: "Data sent is empty" });
  }

  if (password !== confirmPassword){
    return res.status(400).json({ error: "Passwords do not macth" });
  }

  const user = await db.table("users").where("email", "=", email).first();

  if (user) {
    return res.status(400).json({ error: "Email already exist" });
  }

  const now = new Date();

  const okay = await db.table("users").insert({
    email,
    password: await hashPassword(password),
    created_at: now,
    updated_at: now,
  });

  const data = await db.table("users").where("id", "=", okay[0]).first();

  delete data.password;

  return res.json({ data });
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
    password: await hashPassword(password),
    updated_at: now
  });

  return res.status(200).json({ message: "ok" });
};
