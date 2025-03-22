"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientController_1 = require("../controller/patientController");
const ValidateRequest_1 = require("../Middleware/ValidateRequest");
const validation_1 = require("../../../shared/validation");
const validation_2 = require("../zod/validation");
const patientrouter = express_1.default.Router();
patientrouter.post("/signup", (0, ValidateRequest_1.validateRequest)(validation_1.patientSignupSchema), patientController_1.patientSignup);
patientrouter.post('/signin', (0, ValidateRequest_1.validateRequest)(validation_2.signinSchema), patientController_1.patientSignin);
patientrouter.get("/profile/:phone", patientController_1.patientdetails);
exports.default = patientrouter;
