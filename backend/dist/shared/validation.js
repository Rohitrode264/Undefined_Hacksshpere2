"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinSchema = exports.patientSignupSchema = exports.doctorSignupSchema = void 0;
const zod_1 = require("zod");
exports.doctorSignupSchema = zod_1.z.object({
    fullName: zod_1.z.string().min(2, "Name must be at least 2 characters"),
    email: zod_1.z.string().email("Invalid email format"),
    phone: zod_1.z.string().regex(/^\+?[\d\s-]{10,}$/, "Invalid phone number"),
    position: zod_1.z.string().min(2, "Position is required"),
    password: zod_1.z.string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Include at least one uppercase letter")
        .regex(/[0-9]/, "Include at least one number"),
    dof: zod_1.z.string().min(2, "Degree is required"),
    hospital: zod_1.z.string().min(2, "Hospital name is required"),
});
exports.patientSignupSchema = zod_1.z.object({
    fullName: zod_1.z.string().min(2, "Name must be at least 2 characters"),
    email: zod_1.z.string().email("Invalid email format"),
    phone: zod_1.z
        .string()
        .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"), // Exactly 10 digits, no spaces or country code
    password: zod_1.z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Include at least one uppercase letter")
        .regex(/[0-9]/, "Include at least one number"),
    dob: zod_1.z
        .string()
        .refine((date) => {
        const enteredDate = new Date(date);
        const today = new Date();
        return enteredDate <= today; // Ensure DOB is not in the future
    }, "Date of Birth cannot be in the future"),
});
exports.signinSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email format"),
    password: zod_1.z.string().min(1, "Password is required"),
});
