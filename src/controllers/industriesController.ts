import { Response, Request } from "express";

import db from "../database/connetions";

interface IIndustries {
  id: string;
  cnpj: string;
  number: string;
  companyName: string;
  commercialName: string;
  cadastralSituation: string;
  descriptionsBranchOffice: string;
}

export const createIndustry = async (req: Request, res: Response) => {
  const {
    cnpj,
    cadastralSituation,
    commercialName,
    companyName,
    descriptionsBranchOffice,
    number,
  }: IIndustries = req.body;
  const now = new Date();

  if (
    cnpj == null &&
    cadastralSituation == null &&
    commercialName == null &&
    companyName == null &&
    descriptionsBranchOffice == null &&
    number == null
  ) {
    return res.status(400).json({ error: "Data sent is empty" });
  }

  const industryCheck = await db
    .table("industries")
    .where("cnpj", "=", cnpj)
    .first();

  if (industryCheck) {
    return res.status(400).json({ error: "Industry already exist" });
  }

  await db.table("industries").insert({
    cnpj: cnpj,
    cadastral_situation: cadastralSituation,
    commercial_name: commercialName,
    company_name: companyName,
    descriptions_branch_office: descriptionsBranchOffice,
    number: number,
    created_at: now,
    updated_at: now,
  });

  const industry = await db
    .table("industries")
    .where("cnpj", "=", cnpj)
    .first();

  return res.json({ industry });
};

export const listIndustry = async (req: Request, res: Response) => {
  const id: string = req.query.id as string;

  if (id !== undefined) {
    const industry = await db.table("industries").where("id", "=", id).first();
    return res.json({ industry });
  } else {
    const industries = await db.select("*").from("industries");
    return res.json({ industries });
  }
};

export const updateIndustry = async (req: Request, res: Response) => {
  const {
    id,
    cnpj,
    cadastralSituation,
    commercialName,
    companyName,
    descriptionsBranchOffice,
    number,
  }: IIndustries = req.body;
  const now = new Date();

  if (
    id == null &&
    cnpj == null &&
    cadastralSituation == null &&
    commercialName == null &&
    companyName == null &&
    descriptionsBranchOffice == null &&
    number == null
  ) {
    return res.status(400).json({ error: "Data sent is empty" });
  }

  const industryCheck = await db
    .table("industries")
    .where("id", "=", id)
    .first();

  if (!industryCheck) {
    return res.status(400).json({ error: "Industry not exist" });
  }

  await db.table("industries").where("id", "=", id).update({
    cnpj: cnpj,
    cadastral_situation: cadastralSituation,
    commercial_name: commercialName,
    company_name: companyName,
    descriptions_branch_office: descriptionsBranchOffice,
    number: number,
    updated_at: now,
  });

  const industry = await db.table("industries").where("id", "=", id).first();

  return res.json({ industry });
};

export const destroyIndustry = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id) return res.json({ error: "id not provider" });

  await db.table("industries").where("id", "=", id).delete();

  return res.json({ okay: true });
};
