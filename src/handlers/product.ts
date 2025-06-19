import { Request, Response } from "express";
import Product from "../models/Product.model";

export const getProductsById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      res.status(404).json({
        error: "Producto no encontrado",
      });
    }
    res.json(product);
  } catch (error) {
    //console.log(error)
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll({
      order: [["id", "DESC"]],
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json({ data: products });
  } catch (error) {
    //console.log(error)
  }
};

export const createProduct = async (req: Request, res: Response) => {
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
    const product = await Product.create(req.body);
    res.status(201).json({ data: product });
  } catch (error) {
    //console.log(error)
  }

  //Primera forma de almacenar datos en la base de datos con sequelize
  //const product = new Product(req.body)
  //const savedProduct = await product.save()
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
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
  } catch (error) {}
};

export const updateAvailability = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      res.status(404).json({
        error: "Producto no encontrado",
      });
    }

    console.log(product.availability);
    //Actualizar
    product.availability = !product.dataValues.availability;

    console.log(product.availability);
    await product.save();

    res.json({ data: product });
  } catch (error) {}
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

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
  } catch (error) {
   //console.log(`Aqui esta el error : ${error}`);
  }
};
