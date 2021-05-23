import { Response, Request } from "express";

import db from "../database/connetions";

interface IFreighters {
  id: string;
  carLicensePlate: string;
  trackingNumber: string;
  driverName: string;
  freightWeight: string;
  freightType: string;
  description: string;
}

export const createFreight = async (req: Request, res: Response) => {
  const {
    carLicensePlate,
    trackingNumber,
    driverName,
    freightWeight,
    freightType,
    description,
  }: IFreighters = req.body;
  const now = new Date();

  if (
    description == null &&
    carLicensePlate == null &&
    trackingNumber == null &&
    driverName == null &&
    freightWeight == null &&
    freightType == null
  ) {
    return res.status(400).json({ error: "Data sent is empty" });
  }

  const freightCheck = await db
    .table("freighters")
    .where("tracking_number", "=", trackingNumber)
    .first();

  if (freightCheck) {
    return res.status(400).json({ error: "Freight already exist" });
  }

  await db.table("freighters").insert({
    car_license_plate: carLicensePlate,
    tracking_number: trackingNumber,
    driver_name: driverName,
    freight_weight: freightWeight,
    freight_type: freightType,
    description: description,
    created_at: now,
    updated_at: now,
  });

  const freight = await db
    .table("freighters")
    .where("tracking_number", "=", trackingNumber)
    .first();

  return res.json({ freight });
};

export const listFreight = async (req: Request, res: Response) => {
  const id: string = req.query.id as string;

  if (id !== undefined) {
    const freight = await db.table("freighters").where("id", "=", id).first();
    return res.json({ freight });
  } else {
    const freighters = await db.select("*").from("freighters");
    return res.json({ freighters });
  }
};

export const updateFreight = async (req: Request, res: Response) => {
  const {
    id,
    carLicensePlate,
    trackingNumber,
    driverName,
    freightWeight,
    freightType,
    description,
  }: IFreighters = req.body;
  const now = new Date();

  if (
    description == null &&
    carLicensePlate == null &&
    trackingNumber == null &&
    driverName == null &&
    freightWeight == null &&
    freightType == null
  ) {
    return res.status(400).json({ error: "Data sent is empty" });
  }

  const freightCheck = await db
    .table("freighters")
    .where("id", "=", id)
    .first();

  if (!freightCheck) {
    return res.status(400).json({ error: "Freight not exist" });
  }

  await db.table("freighters").where("id", id).update({
    car_license_plate: carLicensePlate,
    tracking_number: trackingNumber,
    driver_name: driverName,
    freight_weight: freightWeight,
    freight_type: freightType,
    description: description,
    updated_at: now,
  });

  const freight = await db.table("freighters").where("id", "=", id).first();

  return res.json({ freight });
};

export const destroyFreight = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id) return res.json({ error: "id not provider" });

  await db.table("freighters").where("id", "=", id).delete();

  return res.json({ okay: true });
};
