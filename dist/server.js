"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = connectDB;
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const db_1 = __importDefault(require("./config/db"));
const colors_1 = __importDefault(require("colors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("./config/swagger"));
const swagger_2 = require("./config/swagger");
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
//Instancia de express
//Conectar a la base de datos
async function connectDB() {
    try {
        await db_1.default.authenticate();
        db_1.default.sync();
        //console.log(colors.magenta('Conexion exitosa a la base de datos'))
    }
    catch (error) {
        //console.log(error)
        console.log(colors_1.default.bgRed.white('Hubo un error al conectarse a la base de datos'));
    }
}
//Instancia de express
const server = (0, express_1.default)();
const corsOptions = {
    origin: function (origin, callback) {
        if (origin === process.env.FRONTEND_URL) {
            callback(null, true);
        }
        else {
            callback(new Error('Error de cors'));
        }
    }
};
server.use((0, cors_1.default)(corsOptions));
connectDB();
server.use(express_1.default.static('public'));
//Leer datos de formularios
server.use(express_1.default.json());
server.use((0, morgan_1.default)('dev'));
server.use('/api/products', routes_1.default);
//Docs
server.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default, swagger_2.swaggerUiOption));
exports.default = server;
//# sourceMappingURL=server.js.map