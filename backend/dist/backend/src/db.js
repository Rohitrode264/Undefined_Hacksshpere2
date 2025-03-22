"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreatmentModel = exports.PostDiseasesModel = exports.PrescirptionModel = exports.DiseaseModel = exports.MedicationModel = exports.PatientModel = exports.AllowedDoctorModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const PatientSchema = new mongoose_1.Schema({
    name: String,
    age: Number,
    birth: String,
    gender: String,
    number: String,
    date: { type: Date, default: Date.now() },
    // userId:{type:mongoose.Types.ObjectId, required:true}
});
const AllowedDoctorSchema = new mongoose_1.default.Schema({
    allowedDoctor: String,
    patientadds: String
});
exports.AllowedDoctorModel = mongoose_1.default.model("AllowedDoctor", AllowedDoctorSchema);
const MedicationScehma = new mongoose_1.Schema({
    prescriptionId: { type: mongoose_1.default.Types.ObjectId, required: true },
    medication: String,
    dose: Number,
    doseUnit: String,
    duration: Number,
    durationUnit: String,
    morning: Boolean,
    afternoon: Boolean,
    evening: Boolean,
    mealStatus: String
});
const DiseaseSchema = new mongoose_1.Schema({
    doctorId: { type: mongoose_1.default.Types.ObjectId, required: true, ref: "Doctor" },
    patientId: { type: mongoose_1.default.Types.ObjectId, required: true, ref: "Patient" },
    disease: { type: String, required: true, trim: true, lowercase: true },
    severity: { type: String, required: true, trim: true, lowercase: true }
});
const PostDisease = new mongoose_1.default.Schema({
    doctorId: { type: mongoose_1.default.Types.ObjectId, required: true, ref: "Doctor" },
    disease: { type: String, required: true, trim: true, lowercase: true },
    severity: { type: String, required: true, trim: true, lowercase: true },
    prescriptionId: { type: mongoose_1.default.Types.ObjectId, required: true, ref: 'Prescription' }
});
const Prescirption = new mongoose_1.Schema({
    doctorName: { type: String, required: true },
    patientName: { type: String, required: true },
    doctorId: { type: mongoose_1.default.Types.ObjectId, required: true },
    patientId: { type: mongoose_1.default.Types.ObjectId, required: true },
    date: { type: Date, default: new Date(Date.now()), required: true },
});
const TreatmentSchema = new mongoose_1.Schema({
    prescriptionId: { type: mongoose_1.default.Types.ObjectId, required: true },
    content: { type: String, required: true, trim: true }
});
exports.PatientModel = (0, mongoose_1.model)("patient", PatientSchema);
exports.MedicationModel = (0, mongoose_1.model)("Medication", MedicationScehma);
exports.DiseaseModel = (0, mongoose_1.model)("Disease", DiseaseSchema);
exports.PrescirptionModel = (0, mongoose_1.model)("Prescirption", Prescirption);
exports.PostDiseasesModel = (0, mongoose_1.model)("PostDiseases", PostDisease);
exports.TreatmentModel = (0, mongoose_1.model)("Treatment", TreatmentSchema);
