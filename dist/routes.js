"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_1 = require("./handlers/product");
const express_validator_1 = require("express-validator");
const middleware_1 = require("./middleware");
const router = (0, express_1.Router)();
/**
 * @swagger
 * components:
 *  schemas:
 *    Product:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: The product ID
 *          example: 1
 *        name:
 *          type: string
 *          description: The product name
 *          example: Monitor Curvo de 40 pulgadas
 *        price:
 *          type: number
 *          description: The product price
 *          example: 300
 *        availability:
 *          type: boolean
 *          description: The product availability
 *          example: True
 */
/**
 * @swagger
 * /api/products:
 *  get:
 *    summary: Get a list of products
 *    tags:
 *      - Products
 *    description: Return a list of products
 *    responses:
 *      200:
 *        descripcion: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Product'
 *
 */
router.get("/", product_1.getProducts);
/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *    summary: Get a product by ID
 *    tags:
 *      - Products
 *    description: Return a product based on its unique ID
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The ID of the product to retrieve
 *      required: true
 *      schema:
 *        type: integer
 *    responses:
 *      200:
 *        description: Succesful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      404:
 *        description: Not found
 *      400:
 *        description: Bad request, invalid ID
 */
router.get("/:id", (0, express_validator_1.param)("id").isInt().withMessage("ID no valido"), middleware_1.handleInputErrors, product_1.getProductsById);
/**
 * @swagger
 * /api/products:
 *  post:
 *    summary: Creates a new product
 *    tags:
 *      - Products
 *    description: Return a new record in the database
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               example: "Monitor de 40 pulgadas"
 *             price:
 *               type: number
 *               example: 399
 *    responses:
 *      201:
 *        description: sucessful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      404:
 *        description: Bad request - Invalid input data
 *
 */
router.post("/", 
//validacion
(0, express_validator_1.body)("name")
    .notEmpty()
    .withMessage("El nombre del producto no puede ir vacio"), (0, express_validator_1.body)("price")
    .isNumeric()
    .withMessage("Valor no valido")
    .notEmpty()
    .withMessage("El precio del producto no puede ir vacio")
    .custom((value) => value > 0)
    .withMessage("Valor no valido"), middleware_1.handleInputErrors, product_1.createProduct);
/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *    summary: Updates a product with user input
 *    tags:
 *      - Products
 *    description: returns the updated product
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The ID of the product to retrieve
 *      required: true
 *      schema:
 *        type: integer
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               example: "Monitor de 40 pulgadas"
 *             price:
 *               type: number
 *               example: 399
 *    responses:
 *      200:
 *        description: sucessful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad request - Invalidad ID or invalid input data
 *      404:
 *        description: Product not found
 *
 *
 *
 *
 *
 *
 */
router.put("/:id", (0, express_validator_1.param)("id").isInt().withMessage("ID no valido"), (0, express_validator_1.body)("name")
    .notEmpty()
    .withMessage("El nombre del producto no puede ir vacio"), (0, express_validator_1.body)("price")
    .isNumeric()
    .withMessage("Valor no valido")
    .notEmpty()
    .withMessage("El precio del producto no puede ir vacio")
    .custom((value) => value > 0)
    .withMessage("Valor no valido"), (0, express_validator_1.body)("availability")
    .isBoolean()
    .withMessage("Valor para disponibilidad no valido"), middleware_1.handleInputErrors, product_1.updateProduct);
/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *    summary: Update Product availability
 *    tags:
 *      - Products
 *    description: Return the updated availability
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The ID of the product to retrieve
 *      required: true
 *      schema:
 *        type: integer
 *    responses:
 *      200:
 *        description: sucessful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad request - Invalidad ID or invalid input data
 *      404:
 *        description: Product not found
 *
 */
router.patch("/:id", (0, express_validator_1.param)("id").isInt().withMessage("ID no valido"), middleware_1.handleInputErrors, product_1.updateAvailability);
/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *    patch:
 *    summary: Delete a product
 *    tags:
 *      - Products
 *    description: Return a confirmation message
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The ID of the product to retrieve
 *      required: true
 *      schema:
 *        type: integer
 *    responses:
 *      200:
 *        description: sucessful response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *      400:
 *        description: Bad request - Invalidad ID or invalid input data
 *      404:
 *        description: Product not found
 */
router.delete("/:id", (0, express_validator_1.param)("id").isInt().withMessage("ID no valido"), middleware_1.handleInputErrors, product_1.deleteProduct);
exports.default = router;
//# sourceMappingURL=routes.js.map