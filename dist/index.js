"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stopServer = exports.startServer = void 0;
const server_1 = __importDefault(require("./server"));
const colors_1 = __importDefault(require("colors"));
const port = process.env.PORT || 4000;
const startServer = () => {
    const httpServer = server_1.default.listen(port, () => {
        console.log(colors_1.default.cyan.bold(`REST API desde el puerto ${port}`));
    });
    return httpServer;
};
exports.startServer = startServer;
(0, exports.startServer)();
const stopServer = (httpServer) => {
    httpServer.close();
};
exports.stopServer = stopServer;
//server.listen(port, ()=>{
// console.log(colors.cyan.bold(`REST API desde el puerto ${port}`))
//})
//# sourceMappingURL=index.js.map