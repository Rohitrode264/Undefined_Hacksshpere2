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
exports.doctorRouter = void 0;
const express_1 = __importStar(require("express"));
const db_1 = require("../db");
const doctorRouter = (0, express_1.Router)();
exports.doctorRouter = doctorRouter;
const mongoose_1 = __importDefault(require("mongoose"));
const DoctorSchema_1 = require("../models/DoctorSchema");
const app = (0, express_1.default)();
const cors = require('cors');
app.use(cors());
// app.use('/prescription',prescriptionRouter);
doctorRouter.post('/patient', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name;
    const age = req.body.age;
    const gender = req.body.gender;
    const DateOfBirth = req.body.birth;
    const number = req.body.number;
    try {
        const newPatient = yield db_1.PatientModel.create({
            name,
            age,
            gender,
            birth: DateOfBirth,
            number
        });
        res.json({
            message: "added",
            ObjectId: newPatient._id
        });
    }
    catch (error) {
        res.json({
            message: `an error occured ${error}`
        });
    }
}));
doctorRouter.post("/allowed", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { patientId, doctorId } = req.body;
        console.log(patientId, doctorId);
        if (!patientId || !doctorId) {
            res.status(400).json({ error: "Patient ID and Doctor ID are required" });
            return;
        }
        const check = yield db_1.AllowedDoctorModel.findOne({ allowedDoctor: doctorId, patientadds: patientId });
        if (!check) {
            yield db_1.AllowedDoctorModel.create({
                allowedDoctor: doctorId,
                patientadds: patientId
            });
        }
        res.json({ message: "Doctor access granted successfully" });
    }
    catch (error) {
        console.error("Error allowing doctor access:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
doctorRouter.delete("/remove", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { patientId, doctorId } = req.body;
        if (!patientId || !doctorId) {
            res.status(400).json({ error: "Patient ID and Doctor ID are required" });
            return;
        }
        const patient = yield db_1.PatientModel.findById(patientId);
        if (!patient) {
            res.status(404).json({ error: "Patient not found" });
            return;
        }
        // Remove the doctorId from AllowedDoctorIds
        //@ts-ignore
        patient.AllowedDoctorIds = patient.AllowedDoctorIds.filter(id => !id.equals(doctorId));
        yield patient.save();
        res.json({ message: "Doctor access removed successfully" });
    }
    catch (error) {
        console.error("Error removing doctor access:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
doctorRouter.get('/patientDetails/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prescirptionId = req.params.id;
        const newPatient = yield db_1.PatientModel.findOne({
            _id: prescirptionId
        });
        if (!newPatient) {
            res.status(404).json({ message: "Not found" });
        }
        res.json({
            newPatient
        });
    }
    catch (error) {
        res.json({
            message: error
        });
    }
}));
doctorRouter.post('/medication', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prescriptionId = req.body.prescriptionId;
    const doctorId = req.body.doctorId;
    const patientId = req.body.patientId;
    const medication = req.body.medication;
    const dose = req.body.dose;
    const doseUnit = req.body.doseUnit;
    const duration = req.body.duration;
    const durationUnit = req.body.durationUnit;
    const morning = req.body.morning;
    const afternoon = req.body.afternoon;
    const evening = req.body.evening;
    const mealStatus = req.body.mealStatus;
    try {
        const newMedication = yield db_1.MedicationModel.create({
            prescriptionId,
            doctorId,
            patientId,
            medication,
            dose,
            doseUnit,
            duration,
            durationUnit,
            morning,
            afternoon,
            evening,
            mealStatus
        });
        res.json({
            message: "Medication Added"
        });
    }
    catch (error) {
        res.status(520).json({
            message: `An unknown error occured ${error}`
        });
    }
}));
doctorRouter.get('/medications/:prescriptionId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prescriptionId = req.params.prescriptionId;
        const medication = yield db_1.MedicationModel.find({ prescriptionId });
        res.json({
            medication: medication
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            message: "error fetching medication"
        });
    }
}));
doctorRouter.post('/treatmentcontent', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prescriptionId = req.body.prescriptionId;
    const treatmentcontent = req.body.content;
    try {
        yield db_1.TreatmentModel.create({
            prescriptionId,
            content: treatmentcontent
        });
        res.json({
            message: "Treatment Added"
        });
    }
    catch (e) {
        res.status(500).json({
            message: e
        });
    }
}));
doctorRouter.get('/treatment/:prescriptionId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prescriptionId = req.params.prescriptionId;
        const treatment = yield db_1.TreatmentModel.findOne({ prescriptionId });
        res.json({
            treatment: treatment
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            message: "error fetching medication"
        });
    }
}));
doctorRouter.delete('/medication/:medicineId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { medicineId } = req.params;
        const result = yield db_1.MedicationModel.deleteOne({ _id: medicineId });
        if (result.deletedCount === 0) {
            res.status(404).json({ Message: "Medicine not found" });
        }
        res.json({ Message: "Medicine Deleted Successfully" });
    }
    catch (error) {
        res.status(500).json({ Message: `An error occurred while deleting medicine: ${error}` });
    }
}));
doctorRouter.post('/disease', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { disease, severity, patientId, doctorId } = req.body;
        yield db_1.DiseaseModel.create({
            doctorId,
            patientId,
            disease,
            severity
        });
        res.status(200).json({
            message: "Disease Added"
        });
    }
    catch (error) {
        res.status(502).json({
            message: `An error occured : ${error}`
        });
    }
}));
doctorRouter.get('/search/:phone/:dob', (req, res) => {
    try {
        const phoneNumber = req.params.phone;
        const DateOfBirth = req.params.dob;
        const regex = new RegExp('^' + DateOfBirth);
        db_1.PatientModel.findOne({
            phone: phoneNumber,
            dob: regex
        }).then((result) => {
            res.json({
                result
            });
        });
    }
    catch (error) {
        res.json({
            error
        });
    }
});
doctorRouter.post('/prescription/presId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doctorId = req.body.doctorId;
        const doctorName = req.body.doctorName;
        const patientName = req.body.patientName;
        const patientId = req.body.patientId;
        const date = new Date();
        date.setMinutes(date.getMinutes() + 330);
        const response = yield db_1.PrescirptionModel.create({
            doctorId,
            doctorName,
            patientName,
            patientId,
            date: date
        });
        res.json({
            response
        });
    }
    catch (e) {
        res.status(500).json({
            message: e
        });
    }
}));
doctorRouter.get('/prescription/:presId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prescirptionId = req.params.presId;
    try {
        const response = yield db_1.PrescirptionModel.findOne({
            _id: prescirptionId
        });
        res.json({
            response
        });
    }
    catch (e) {
        res.status(500).json({
            message: e
        });
    }
}));
doctorRouter.get('/prescription/patient/:patientId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patientId = req.params.patientId;
    const page = parseInt(req.query.page) || 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 5;
    try {
        const response = yield db_1.PrescirptionModel.find({ patientId })
            .sort({ date: -1 })
            .skip((page - 1) * limit)
            .limit(limit);
        res.json({ response, currentPage: page, hasMore: response.length === limit });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
}));
doctorRouter.get('/prescription/doctor/:doctorId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorId = req.params.doctorId;
    try {
        const response = yield db_1.PrescirptionModel.find({
            doctorId: doctorId
        });
        res.json({
            response
        });
    }
    catch (error) {
        res.json({
            message: error
        });
    }
}));
doctorRouter.get('/prescription/doctorname/:doctorId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorId = req.params.doctorId;
    try {
        const response = yield DoctorSchema_1.DoctorModel.findOne({
            _id: doctorId
        });
        if (response) {
            const name = response.fullName;
            res.json({
                name
            });
        }
        else {
            res.status(404).json({
                message: "Doctor not found"
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error
        });
    }
}));
doctorRouter.get('/prescription/patientname/:patientId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patientId = req.params.patientId;
    try {
        const response = yield db_1.PatientModel.findOne({
            _id: patientId
        });
        if (response) {
            res.json({
                response
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error
        });
    }
}));
const getDiseases = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchQuery = req.params.searchQuery;
        const diseases = yield db_1.DiseaseModel.find({
            disease: { $regex: new RegExp(searchQuery, 'i') }
        });
        if (!diseases.length) {
            res.status(404).json({ message: "No matching diseases found" });
            return;
        }
        res.json({ diseases });
    }
    catch (error) {
        res.status(500).json({ message: `An error occurred: ${error}` });
    }
});
doctorRouter.get('/disease/:searchQuery', getDiseases);
doctorRouter.post("/postdiseases", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { disease, severity, doctorId, prescriptionId } = req.body;
        if (!disease || !severity || !doctorId || !prescriptionId) {
            res.status(400).json({ message: "All fields are required: disease, severity, doctorId." });
            return;
        }
        if (!mongoose_1.default.isValidObjectId(doctorId)) {
            res.status(400).json({ message: "Invalid doctorId format." });
            return;
        }
        if (!mongoose_1.default.isValidObjectId(prescriptionId)) {
            res.status(400).json({ message: 'Invalid Prescription Id' });
        }
        yield db_1.PostDiseasesModel.create({
            doctorId: new mongoose_1.default.Types.ObjectId(doctorId),
            disease,
            severity,
            prescriptionId
        });
        res.status(201).json({ message: "Disease added successfully" });
    }
    catch (error) {
        res.status(500).json({ message: `An error occurred: ${error}` });
    }
}));
doctorRouter.get('/postdiseases', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const diseaseData = yield db_1.PostDiseasesModel.find();
        if (!diseaseData || diseaseData.length === 0) {
            res.status(404).json({ message: 'No disease data found' });
            return;
        }
        res.status(200).json(diseaseData);
    }
    catch (error) {
        console.error('Error fetching disease data:', error);
        res.status(500).json({
            message: 'Error fetching disease details',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}));
doctorRouter.get('/prescription/diseases/:prescriptionId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prescirptionId = req.params.prescriptionId;
    try {
        const response = yield db_1.PostDiseasesModel.find({
            prescriptionId: prescirptionId
        });
        const disease = response.map((disease) => {
            return disease.disease;
        });
        res.json({
            disease
        });
    }
    catch (error) {
        res.json({
            message: error
        });
    }
}));
const getDoctors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchQuery = req.params.searchQuery;
        const doctors = yield DoctorSchema_1.DoctorModel.find({
            fullName: { $regex: new RegExp(searchQuery, 'i') }
        });
        if (!doctors.length) {
            res.status(404).json({ message: "No matching diseases found" });
            return;
        }
        res.json({ doctors });
    }
    catch (error) {
        res.status(500).json({ message: `An error occurred: ${error}` });
    }
});
doctorRouter.get('/doctors/:searchQuery', getDoctors);
doctorRouter.get('/hospitals/:searchQuery', (req, res) => {
    try {
        const searchQuery = req.params.searchQuery;
        DoctorSchema_1.DoctorModel.find({
            hospitalName: { $regex: new RegExp(searchQuery, 'i') }
        }).then((result) => {
            res.json({
                result
            });
        });
    }
    catch (error) {
        res.json({
            error
        });
    }
});
exports.default = doctorRouter;
