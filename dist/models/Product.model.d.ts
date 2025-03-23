import { Model } from 'sequelize-typescript';
declare class Product extends Model {
    name: String;
    price: number;
    availability: boolean;
}
export default Product;
