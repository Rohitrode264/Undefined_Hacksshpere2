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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3000;
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const ws_1 = require("ws");
const Router = express_1.default.Router();
const doctor_1 = __importDefault(require("./Routes/doctor"));
const patient_1 = __importDefault(require("./Routes/patient"));
const mainDoctor_1 = require("./Routes/mainDoctor");
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use("/api/doctors", doctor_1.default);
app.use("/api/patients", patient_1.default);
const db_url = process.env.MONGO_URL;
app.use('/cms/v1/doctor', mainDoctor_1.doctorRouter);
const server = http_1.default.createServer(app);
const wss = new ws_1.WebSocketServer({ server });
const activeConnections = {};
const accessRequests = {};
wss.on("connection", (ws, req) => {
    var _a;
    const url = new URL((_a = req.url) !== null && _a !== void 0 ? _a : "", `http://${req.headers.host}`);
    const patientId = url.searchParams.get("patientId");
    if (patientId) {
        activeConnections[patientId] = ws;
        ws.on("close", () => {
            delete activeConnections[patientId];
        });
    }
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect(process.env.MONGO_URL).then(() => console.log("Connection eshatablished with database")).catch((e) => console.log(e));
        app.listen(port, () => console.log(`App listening to ${process.env.PORT}`));
    });
}
main();
