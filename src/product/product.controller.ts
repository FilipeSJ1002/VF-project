import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Req,
  Patch,
  HttpException,
  HttpStatus,
  Query
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDTO } from './dto/productDTO';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Request } from 'express';

interface User {
  id: string;
}

interface RequestWithUser extends Request {
  user: User;
}

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Get()
  async findAll() {
    return this.productService.findAll();
  }

  @Get('products')
  async getProducts(@Query('status') status?: string) {
    if (status) {
      return this.productService.findByStatus(status);
    } else {
      throw new HttpException(
        'Status não informado. Por favor, passe um parâmetro válido.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('user')
  async findUserProducts(@Req() req: RequestWithUser) {
    const userId = req.user.id;
    return this.productService.findByOwner(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Post()
  async create(@Body() productDTO: ProductDTO, @Req() req: RequestWithUser) {
    const productWithOwnerId = {
      ...productDTO,
      ownerId: req.user.id,
    };
    return this.productService.create(productWithOwnerId);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() productDTO: ProductDTO) {
    return this.productService.update(id, productDTO);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: RequestWithUser) {
    await this.productService.delete(id, req.user.id);
    return { message: 'Produto deletado com sucesso' };
  }

  @Get('reserved')
  async findReservedProducts(@Req() req: RequestWithUser) {
    const userId = req.user.id;
    return this.productService.findReservedByUser(userId);
  }

  @Patch(':id/reserve')
  async reserveProduct(@Param('id') id: string, @Req() req: RequestWithUser) {
    const userId = req.user.id;
    if (!userId) {
      throw new HttpException('User ID is required', HttpStatus.BAD_REQUEST);
    }
    const updatedProduct = await this.productService.reserve(id, userId);
    return { message: 'Produto reservado com sucesso', product: updatedProduct };
  }

  @Patch(':id/available')
  async availableProduct(@Param('id') id: string, @Req() req: RequestWithUser) {
    const userId = req.user.id;
    if (!userId) {
      throw new HttpException('User ID is required', HttpStatus.BAD_REQUEST);
    }
    const updatedProduct = await this.productService.available(id, userId);
    return { message: 'Produto disponibilizado com sucesso', product: updatedProduct };
  }

}
