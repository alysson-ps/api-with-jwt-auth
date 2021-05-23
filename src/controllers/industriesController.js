"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroyIndustry = exports.updateIndustry = exports.listIndustry = exports.createIndustry = void 0;
var connetions_1 = __importDefault(require("../database/connetions"));
var createIndustry = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, cnpj, cadastralSituation, commercialName, companyName, descriptionsBranchOffice, number, now, industryCheck, industry;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, cnpj = _a.cnpj, cadastralSituation = _a.cadastralSituation, commercialName = _a.commercialName, companyName = _a.companyName, descriptionsBranchOffice = _a.descriptionsBranchOffice, number = _a.number;
                now = new Date();
                if (cnpj == null &&
                    cadastralSituation == null &&
                    commercialName == null &&
                    companyName == null &&
                    descriptionsBranchOffice == null &&
                    number == null) {
                    return [2 /*return*/, res.status(400).json({ error: "Data sent is empty" })];
                }
                return [4 /*yield*/, connetions_1.default
                        .table("industries")
                        .where("cnpj", "=", cnpj)
                        .first()];
            case 1:
                industryCheck = _b.sent();
                if (industryCheck) {
                    return [2 /*return*/, res.status(400).json({ error: "Industry already exist" })];
                }
                return [4 /*yield*/, connetions_1.default.table("industries").insert({
                        cnpj: cnpj,
                        cadastral_situation: cadastralSituation,
                        commercial_name: commercialName,
                        company_name: companyName,
                        descriptions_branch_office: descriptionsBranchOffice,
                        number: number,
                        created_at: now,
                        updated_at: now,
                    })];
            case 2:
                _b.sent();
                return [4 /*yield*/, connetions_1.default
                        .table("industries")
                        .where("cnpj", "=", cnpj)
                        .first()];
            case 3:
                industry = _b.sent();
                return [2 /*return*/, res.json({ industry: industry })];
        }
    });
}); };
exports.createIndustry = createIndustry;
var listIndustry = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, industry, industries;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.query.id;
                if (!(id !== undefined)) return [3 /*break*/, 2];
                return [4 /*yield*/, connetions_1.default.table("industries").where("id", "=", id).first()];
            case 1:
                industry = _a.sent();
                return [2 /*return*/, res.json({ industry: industry })];
            case 2: return [4 /*yield*/, connetions_1.default.select("*").from("industries")];
            case 3:
                industries = _a.sent();
                return [2 /*return*/, res.json({ industries: industries })];
        }
    });
}); };
exports.listIndustry = listIndustry;
var updateIndustry = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, cnpj, cadastralSituation, commercialName, companyName, descriptionsBranchOffice, number, now, industryCheck, industry;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, id = _a.id, cnpj = _a.cnpj, cadastralSituation = _a.cadastralSituation, commercialName = _a.commercialName, companyName = _a.companyName, descriptionsBranchOffice = _a.descriptionsBranchOffice, number = _a.number;
                now = new Date();
                if (id == null &&
                    cnpj == null &&
                    cadastralSituation == null &&
                    commercialName == null &&
                    companyName == null &&
                    descriptionsBranchOffice == null &&
                    number == null) {
                    return [2 /*return*/, res.status(400).json({ error: "Data sent is empty" })];
                }
                return [4 /*yield*/, connetions_1.default
                        .table("industries")
                        .where("id", "=", id)
                        .first()];
            case 1:
                industryCheck = _b.sent();
                if (!industryCheck) {
                    return [2 /*return*/, res.status(400).json({ error: "Industry not exist" })];
                }
                return [4 /*yield*/, connetions_1.default.table("industries").where("id", "=", id).update({
                        cnpj: cnpj,
                        cadastral_situation: cadastralSituation,
                        commercial_name: commercialName,
                        company_name: companyName,
                        descriptions_branch_office: descriptionsBranchOffice,
                        number: number,
                        updated_at: now,
                    })];
            case 2:
                _b.sent();
                return [4 /*yield*/, connetions_1.default.table("industries").where("id", "=", id).first()];
            case 3:
                industry = _b.sent();
                return [2 /*return*/, res.json({ industry: industry })];
        }
    });
}); };
exports.updateIndustry = updateIndustry;
var destroyIndustry = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                if (!id)
                    return [2 /*return*/, res.json({ error: "id not provider" })];
                return [4 /*yield*/, connetions_1.default.table("industries").where("id", "=", id).delete()];
            case 1:
                _a.sent();
                return [2 /*return*/, res.json({ okay: true })];
        }
    });
}); };
exports.destroyIndustry = destroyIndustry;
