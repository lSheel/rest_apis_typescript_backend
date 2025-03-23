"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateAvailability = exports.updateProduct = exports.createProduct = exports.getProducts = exports.getProductsById = void 0;
const Product_model_1 = __importDefault(require("../models/Product.model"));
const getProductsById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product_model_1.default.findByPk(id);
        if (!product) {
            res.status(404).json({
                error: "Producto no encontrado",
            });
        }
        res.json(product);
    }
    catch (error) {
        //console.log(error)
    }
};
exports.getProductsById = getProductsById;
const getProducts = async (req, res) => {
    try {
        const products = await Product_model_1.default.findAll({
            order: [["id", "DESC"]],
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        res.json({ data: products });
    }
    catch (error) {
        //console.log(error)
    }
};
exports.getProducts = getProducts;
const createProduct = async (req, res) => {
    /*validacion
      await check('name')
          .notEmpty().withMessage('El nombre del producto no puede ir vacio')
          .run(req)
      await check('precio')
          .isNumeric().withMessage('Valor no valido')
          .notEmpty().withMessage('El precio del producto no puede ir vacio')
          .custom(value => value > 0).withMessage('Valor no valido')
          .run(req)
     */
    try {
        const product = await Product_model_1.default.create(req.body);
        res.status(201).json({ data: product });
    }
    catch (error) {
        //console.log(error)
    }
    //Primera forma de almacenar datos en la base de datos con sequelize
    //const product = new Product(req.body)
    //const savedProduct = await product.save()
};
exports.createProduct = createProduct;
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product_model_1.default.findByPk(id);
        if (!product) {
            res.status(404).json({
                error: "Producto no encontrado",
            });
            return;
        }
        //Actualizar
        await product.update(req.body);
        await product.save();
        res.json({ data: product });
    }
    catch (error) { }
};
exports.updateProduct = updateProduct;
const updateAvailability = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product_model_1.default.findByPk(id, { logging: false });
        if (!product) {
            res.status(404).json({
                error: "Producto no encontrado",
            });
        }
        //Actualizar
        product.availability = !product.dataValues.availability;
        await product.save();
        res.json({ data: product });
    }
    catch (error) { }
};
exports.updateAvailability = updateAvailability;
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product_model_1.default.findByPk(id);
        if (!product) {
            res.status(404).json({
                error: "Producto no encontrado",
            });
        }
        await product.destroy();
        console.log("Producto eliminado");
        res.status(200).json({
            message: "Producto eliminado correctamente",
        });
    }
    catch (error) {
        //console.log(`Aqui esta el error : ${error}`);
    }
};
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=product.js.map