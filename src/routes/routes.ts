import { Router } from "express";

// Controllers
import {
  registerUser,
  forgotPassword,
  loginUser,
  resetPassword,
} from "../controllers/usersController";
import {
  createIndustry,
  listIndustry,
  destroyIndustry,
  updateIndustry,
} from "../controllers/industriesController";

// Middlewares
import authentication from "../middlewares/authentication";
import {
  createFreight,
  listFreight,
  destroyFreight,
  updateFreight,
} from "../controllers/freightersController";

const routes = Router();

routes.post("/register", registerUser);
routes.post("/login", loginUser);
routes.post("/forgot/password", forgotPassword);
routes.post("/reset/password", resetPassword);

routes.post("/industry", authentication, createIndustry);
routes.get("/industry", authentication, listIndustry);
routes.delete("/industry/:id", authentication, destroyIndustry);
routes.put("/industry", authentication, updateIndustry);

routes.post("/freight", authentication, createFreight);
routes.get("/freight", authentication, listFreight);
routes.delete("/freight/:id", authentication, destroyFreight);
routes.put("/freight", authentication, updateFreight);

export default routes;
