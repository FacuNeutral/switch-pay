import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/_common/dtos/pagination.dto';

@Injectable()
export class ProductsService {

  private readonly logger = new Logger(ProductsService.name);

  constructor(
    @InjectRepository(Product)
    private readonly Product: Repository<Product>
  ) { }

  async create(createProductDto: CreateProductDto) {
    try {

      const newProduct = this.Product.create(createProductDto);
      return await this.Product.save(newProduct);

    } catch (error) { this.handleException(error) }
  }

  async findAll(paginationDto: PaginationDto) {

    const { limit = 10, offset = 0 } = paginationDto;

    const productList = await this.Product.find({
      take: limit,
      skip: offset
    });

    if (!productList.length)
      throw new BadRequestException("No products found.");

    return productList;
  }

  async findOne(id: string) {
    try {
      const dbProduct = await this.Product.findOne({ where: { id } });
      return dbProduct;
    } catch (error) { this.handleException(error) }
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }


  //% Errors management
  private handleException(error: any) {
    this.logger.error(error.message);

    if (error.code === '23505')
      throw new BadRequestException("Product already exists");

    throw new InternalServerErrorException("Internal Server Error");

  }
}
