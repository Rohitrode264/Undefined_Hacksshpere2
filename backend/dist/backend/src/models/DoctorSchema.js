"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrimmedDoctorModel = exports.DoctorModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const DoctorSchema = new mongoose_1.default.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    position: { type: String, required: true },
    password: { type: String, required: true },
    dof: { type: String, required: true },
    hospital: { type: String, required: true },
});
const TrimmedDoctorSchema = new mongoose_1.default.Schema({
    fullName: { type: String, required: true, trim: true, lowercase: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    position: { type: String, required: true },
    password: { type: String, required: true },
    dof: { type: String, required: true },
    hospital: { type: String, required: true, trim: true, lowercase: true },
});
exports.DoctorModel = mongoose_1.default.model("Doctor", DoctorSchema);
exports.TrimmedDoctorModel = mongoose_1.default.model("TrimmedDoctor", TrimmedDoctorSchema);
