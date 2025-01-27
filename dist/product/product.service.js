"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ProductService = class ProductService {
    constructor(productModel) {
        this.productModel = productModel;
    }
    async create(createProductDto) {
        const createdProduct = new this.productModel(createProductDto);
        return createdProduct.save();
    }
    async findAll() {
        return this.productModel.find().exec();
    }
    async findByOwner(ownerId) {
        return this.productModel.find({ ownerId }).exec();
    }
    async findOne(id) {
        return this.productModel.findById(id).exec();
    }
    async update(id, updateProductDto) {
        return this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true }).exec();
    }
    async delete(id, ownerId) {
        return this.productModel.deleteOne({ _id: id, ownerId }).exec();
    }
    async reserve(productId, userId) {
        const product = await this.productModel.findById(productId);
        if (!product) {
            throw new common_1.NotFoundException('Produto não encontrado');
        }
        if (product.status === 'reserved') {
            throw new common_1.HttpException('Produto já reservado', common_1.HttpStatus.BAD_REQUEST);
        }
        product.status = 'reserved';
        product.reservedBy = userId;
        return product.save();
    }
    async available(productId, userId) {
        const product = await this.productModel.findById(productId);
        if (!product) {
            throw new common_1.NotFoundException('Produto não encontrado');
        }
        if (product.status === 'available') {
            throw new common_1.HttpException('Produto já disponivel para reserva', common_1.HttpStatus.BAD_REQUEST);
        }
        product.status = 'available';
        product.reservedBy = null;
        return product.save();
    }
    async findReservedByUser(userId) {
        return this.productModel.find({ reservedBy: userId }).exec();
    }
    async findByStatus(status) {
        return this.productModel.find({ status }).exec();
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Product')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProductService);
//# sourceMappingURL=product.service.js.map