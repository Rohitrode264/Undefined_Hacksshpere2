"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const doctorController_1 = require("../controller/doctorController");
const ValidateRequest_1 = require("../Middleware/ValidateRequest");
const validation_1 = require("../../../shared/validation");
const doctorrouter = express_1.default.Router();
doctorrouter.post("/signup", (0, ValidateRequest_1.validateRequest)(validation_1.doctorSignupSchema), doctorController_1.doctorSignup);
doctorrouter.post("/signin", (0, ValidateRequest_1.validateRequest)(validation_1.signinSchema), doctorController_1.doctorSignin);
exports.default = doctorrouter;
