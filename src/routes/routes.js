"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
// Controllers
var usersController_1 = require("../controllers/usersController");
var industriesController_1 = require("../controllers/industriesController");
// Middlewares
var authentication_1 = __importDefault(require("../middlewares/authentication"));
var freightersController_1 = require("../controllers/freightersController");
var routes = express_1.Router();
routes.post("/register", usersController_1.registerUser);
routes.post("/login", usersController_1.loginUser);
routes.post("/forgot/password", usersController_1.forgotPassword);
routes.post("/reset/password", usersController_1.resetPassword);
routes.post("/industry", authentication_1.default, industriesController_1.createIndustry);
routes.get("/industry", authentication_1.default, industriesController_1.listIndustry);
routes.delete("/industry/:id", authentication_1.default, industriesController_1.destroyIndustry);
routes.put("/industry", authentication_1.default, industriesController_1.updateIndustry);
routes.post("/freight", authentication_1.default, freightersController_1.createFreight);
routes.get("/freight", authentication_1.default, freightersController_1.listFreight);
routes.delete("/freight/:id", authentication_1.default, freightersController_1.destroyFreight);
routes.put("/freight", authentication_1.default, freightersController_1.updateFreight);
exports.default = routes;
