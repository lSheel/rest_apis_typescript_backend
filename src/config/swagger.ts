import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: "3.0.2",
     servers: [
      { url: "https://rest-apis-typescript-frontend-3oh0c8ub1.vercel.app", description: "Production server" },
    ],
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

const swaggerSpec = swaggerJSDoc(options);
const swaggerUiOption: SwaggerUiOptions = {
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

export default swaggerSpec;
export { swaggerUiOption };
