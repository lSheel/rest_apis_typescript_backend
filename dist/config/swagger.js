"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerUiOption = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    swaggerDefinition: {
        openapi: "3.0.2",
        tags: [
            {
                name: "Products",
                description: "API operations realted to products",
            },
        ],
        info: {
            title: "REST APIP Node.js /Express / TypeScript",
            version: "1.0.0",
            description: "API Docs for producs",
        },
    },
    apis: ["./src/routes.ts"],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
const swaggerUiOption = {
    customCss: `
    /* Oculta el logo predeterminado */
    .topbar-wrapper .link svg {
        display: none;
    }

    /* Agrega tu imagen personalizada como un pseudo-elemento */
    .topbar-wrapper .link::after {
        content: '';
        display: inline-block;
        width: 80px; /* Ancho deseado */
        height: 80px; /* Alto deseado */
        background-image: url('/assets/banner.png'); /* Ruta de la imagen */
        background-size: contain; /* Ajusta la imagen al contenedor */
        background-repeat: no-repeat; /* Evita que la imagen se repita */
    }
        `,
    customSiteTitle: "Documentacion REST API Express",
    customfavIcon: '/assets/icon.ico'
};
exports.swaggerUiOption = swaggerUiOption;
exports.default = swaggerSpec;
//# sourceMappingURL=swagger.js.map