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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientdetails = exports.patientSignin = exports.patientSignup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const PatientSchema_1 = require("../models/PatientSchema"); // ✅ Use the correct Mongoose model
const validation_1 = require("../zod/validation");
const JWT_SECRET = process.env.JWT_SECRET || "default-secret";
const patientSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedBody = validation_1.patientSignupSchema.parse(req.body);
        const { fullName, phone, email, password, dob } = parsedBody;
        const existingPatient = yield PatientSchema_1.PatientModel.findOne({ email });
        if (existingPatient) {
            res.status(400).json({ message: "Patient already exists" });
            return;
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newPatient = new PatientSchema_1.PatientModel({
            fullName,
            phone,
            email,
            password: hashedPassword,
            dob
        });
        const savedPatient = yield newPatient.save();
        const token = jsonwebtoken_1.default.sign({ id: savedPatient._id, email: savedPatient.email }, JWT_SECRET, { expiresIn: "1h" });
        res.status(201).json({
            message: "Patient registered successfully",
            patient: {
                id: savedPatient._id,
                fullName: savedPatient.fullName,
                email: savedPatient.email,
            },
            token,
        });
    }
    catch (error) {
        console.error("Error during patient signup:", error);
        res.status(500).json({ message: "Server error occurred" });
    }
});
exports.patientSignup = patientSignup;
const patientSignin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedBody = validation_1.signinSchema.parse(req.body);
        const { email, password } = parsedBody;
        const patient = yield PatientSchema_1.PatientModel.findOne({ email });
        if (!patient) {
            res.status(404).json({ message: "Patient not found" });
            return;
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(password, patient.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: "Incorrect password" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: patient._id, email: patient.email }, JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({
            message: "Signin successful",
            patient: {
                id: patient._id,
                fullName: patient.fullName,
                email: patient.email,
                phone: patient.phone,
            },
            token,
        });
    }
    catch (error) {
        console.error("Error during patient signin:", error);
        res.status(500).json({ message: "Server error occurred" });
    }
});
exports.patientSignin = patientSignin;
const patientdetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone } = req.params;
    try {
        const patients = yield PatientSchema_1.PatientModel.find({ phone });
        if (patients.length == 0) {
            res.status(404).json({ message: "no patients found" });
        }
        res.json(patients);
    }
    catch (error) {
        res.status(500).json({ message: "error fetching " });
    }
});
exports.patientdetails = patientdetails;
