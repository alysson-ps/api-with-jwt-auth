"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var secret_1 = require("../utils/secret");
var authentication = function (req, res, next) {
    var token = req.header("x-acess-token");
    if (!token)
        return res.status(401).json({ error: "No token provider" });
    jsonwebtoken_1.default.verify(token, secret_1.secret, function (err, decoded) {
        if (err != null) {
            return res.status(500).json({ error: err });
        }
        req.user_id = decoded.id;
        next();
    });
};
exports.default = authentication;
