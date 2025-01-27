import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schema/product.schema';
import { ProductDTO } from './dto/productDTO';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private readonly productModel: Model<Product>) { }

  async create(createProductDto: ProductDTO): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findByOwner(ownerId: string) {
    return this.productModel.find({ ownerId }).exec();
  }

  async findOne(id: string): Promise<Product> {
    return this.productModel.findById(id).exec();
  }

  async update(id: string, updateProductDto: ProductDTO): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true }).exec();
  }

  async delete(id: string, ownerId: string): Promise<any> {
    return this.productModel.deleteOne({ _id: id, ownerId }).exec();
  }

  async reserve(productId: string, userId: string): Promise<Product> {
    const product = await this.productModel.findById(productId);
    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }
    if (product.status === 'reserved') {
      throw new HttpException('Produto já reservado', HttpStatus.BAD_REQUEST);
    }
    product.status = 'reserved';
    product.reservedBy = userId;
    return product.save();
  }

  async available(productId: string, userId: string): Promise<Product> {
    const product = await this.productModel.findById(productId);
    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }
    if (product.status === 'available') {
      throw new HttpException('Produto já disponivel para reserva', HttpStatus.BAD_REQUEST);
    }
    product.status = 'available';
    product.reservedBy = null;
    return product.save();
  }

  async findReservedByUser(userId: string): Promise<Product[]> {
    return this.productModel.find({ reservedBy: userId }).exec();
  }

  async findByStatus(status: string): Promise<Product[]> {
    return this.productModel.find({ status }).exec();
  }
  
}
