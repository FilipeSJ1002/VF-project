import { ProductService } from './product.service';
import { ProductDTO } from './dto/productDTO';
import { Request } from 'express';
interface User {
    id: string;
}
interface RequestWithUser extends Request {
    user: User;
}
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    findAll(): Promise<import("./schema/product.schema").Product[]>;
    getProducts(status?: string): Promise<import("./schema/product.schema").Product[]>;
    findUserProducts(req: RequestWithUser): Promise<(import("mongoose").Document<unknown, {}, import("./schema/product.schema").Product> & import("./schema/product.schema").Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<import("./schema/product.schema").Product>;
    create(productDTO: ProductDTO, req: RequestWithUser): Promise<import("./schema/product.schema").Product>;
    update(id: string, productDTO: ProductDTO): Promise<import("./schema/product.schema").Product>;
    delete(id: string, req: RequestWithUser): Promise<{
        message: string;
    }>;
    findReservedProducts(req: RequestWithUser): Promise<import("./schema/product.schema").Product[]>;
    reserveProduct(id: string, req: RequestWithUser): Promise<{
        message: string;
        product: import("./schema/product.schema").Product;
    }>;
    availableProduct(id: string, req: RequestWithUser): Promise<{
        message: string;
        product: import("./schema/product.schema").Product;
    }>;
}
export {};
