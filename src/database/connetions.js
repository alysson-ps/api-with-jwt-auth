"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var knex_1 = __importDefault(require("knex"));
var knexfile_1 = __importDefault(require("../../knexfile"));
var connection = knex_1.default(knexfile_1.default[process.env.NODE_ENV || "development"]);
exports.default = connection;
