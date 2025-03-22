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
exports.doctorSigninTrimmed = exports.doctorSignupTrimmed = exports.doctorSignin = exports.doctorSignup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const DoctorSchema_1 = require("../models/DoctorSchema");
const validation_1 = require("../zod/validation");
const JWT_SECRET = process.env.JWT_SECRET || "default-secret";
const doctorSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedBody = validation_1.doctorSignupSchema.parse(req.body);
        const { fullName, email, phone, position, password, dof, hospital } = parsedBody;
        const checkExistingDoctor = yield DoctorSchema_1.DoctorModel.findOne({ email });
        if (checkExistingDoctor) {
            res.status(400).json({ message: "Doctor already exists" });
            return;
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newDoctor = new DoctorSchema_1.DoctorModel({
            fullName,
            email,
            phone,
            position,
            password: hashedPassword,
            dof,
            hospital,
        });
        const savedDoctor = yield newDoctor.save();
        const token = jsonwebtoken_1.default.sign({ id: savedDoctor._id, email: savedDoctor.email }, JWT_SECRET, { expiresIn: "1h" });
        res.status(201).json({
            message: "Doctor registered successfully",
            doctor: {
                id: savedDoctor._id,
                fullName: savedDoctor.fullName,
                email: savedDoctor.email,
                position: savedDoctor.position,
                hospital: savedDoctor.hospital,
            },
            token,
        });
    }
    catch (error) {
        console.error("Error during doctor signup:", error);
        res.status(500).json({ message: "Server error occurred" });
    }
});
exports.doctorSignup = doctorSignup;
const doctorSignin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedBody = validation_1.signinSchema.parse(req.body);
        const { email, password } = parsedBody;
        const doctor = yield DoctorSchema_1.DoctorModel.findOne({ email });
        if (!doctor) {
            res.status(404).json({ message: "Doctor not found" });
            return;
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(password, doctor.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: "Incorrect password" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: doctor._id, email: doctor.email }, JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({
            message: "Signin successful",
            doctor: {
                id: doctor._id,
                fullName: doctor.fullName,
                email: doctor.email,
                position: doctor.position,
                hospital: doctor.hospital,
            },
            token,
        });
    }
    catch (error) {
        console.error("Error during doctor signin:", error);
        res.status(500).json({ message: "Server error occurred" });
    }
});
exports.doctorSignin = doctorSignin;
const doctorSignupTrimmed = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedBody = validation_1.doctorSignupSchema.parse(req.body);
        const { fullName, email, phone, position, password, dof, hospital } = parsedBody;
        const checkExistingDoctor = yield DoctorSchema_1.TrimmedDoctorModel.findOne({ email });
        if (checkExistingDoctor) {
            res.status(400).json({ message: "Doctor already exists" });
            return;
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newDoctor = new DoctorSchema_1.TrimmedDoctorModel({
            fullName,
            email,
            phone,
            position,
            password: hashedPassword,
            dof,
            hospital,
        });
        const savedDoctor = yield newDoctor.save();
        const token = jsonwebtoken_1.default.sign({ id: savedDoctor._id, email: savedDoctor.email }, JWT_SECRET, { expiresIn: "1h" });
        res.status(201).json({
            message: "Doctor registered successfully",
            doctor: {
                id: savedDoctor._id,
                fullName: savedDoctor.fullName,
                email: savedDoctor.email,
                position: savedDoctor.position,
                hospital: savedDoctor.hospital,
            },
            token,
        });
    }
    catch (error) {
        console.error("Error during doctor signup:", error);
        res.status(500).json({ message: "Server error occurred" });
    }
});
exports.doctorSignupTrimmed = doctorSignupTrimmed;
const doctorSigninTrimmed = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedBody = validation_1.signinSchema.parse(req.body);
        const { email, password } = parsedBody;
        const doctor = yield DoctorSchema_1.TrimmedDoctorModel.findOne({ email });
        if (!doctor) {
            res.status(404).json({ message: "Doctor not found" });
            return;
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(password, doctor.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: "Incorrect password" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: doctor._id, email: doctor.email }, JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({
            message: "Signin successful",
            doctor: {
                id: doctor._id,
                fullName: doctor.fullName,
                email: doctor.email,
                position: doctor.position,
                hospital: doctor.hospital,
            },
            token,
        });
    }
    catch (error) {
        console.error("Error during doctor signin:", error);
        res.status(500).json({ message: "Server error occurred" });
    }
});
exports.doctorSigninTrimmed = doctorSigninTrimmed;
