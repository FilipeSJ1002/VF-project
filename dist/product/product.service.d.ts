import { Model } from 'mongoose';
import { Product } from './schema/product.schema';
import { ProductDTO } from './dto/productDTO';
export declare class ProductService {
    private readonly productModel;
    constructor(productModel: Model<Product>);
    create(createProductDto: ProductDTO): Promise<Product>;
    findAll(): Promise<Product[]>;
    findByOwner(ownerId: string): Promise<(import("mongoose").Document<unknown, {}, Product> & Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<Product>;
    update(id: string, updateProductDto: ProductDTO): Promise<Product>;
    delete(id: string, ownerId: string): Promise<any>;
    reserve(productId: string, userId: string): Promise<Product>;
    available(productId: string, userId: string): Promise<Product>;
    findReservedByUser(userId: string): Promise<Product[]>;
    findByStatus(status: string): Promise<Product[]>;
}
