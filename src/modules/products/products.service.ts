import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ErrorMessage } from 'src/configuration/error-messages';
import { FindProductDto } from './dto/find-product.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const objTransporteDto =
        await this.productRepository.create(createProductDto);
      const resp = await this.productRepository.save({
        ...objTransporteDto,
        objTransporteDto,
      });
      return resp;
    } catch (error) {
      throw new HttpException(
        {
          message: error.response.message || ErrorMessage.ERROR_SERVICE.message,
          codRetorno:
            error.response.codRetorno || ErrorMessage.ERROR_SERVICE.codRetorno,
        },
        error.status || ErrorMessage.ERROR_SERVICE.status,
        {
          cause: new Error(error.options.cause || error),
          description: error.options.description || error.message,
        },
      );
    }
  }

  async findAll(findProductDto: FindProductDto): Promise<Product[]> {
    try {      
      const resp = await this.productRepository.findBy(findProductDto);
      return resp;
    } catch (error) {
      throw new HttpException(
        {
          message: error.response.message || ErrorMessage.ERROR_SERVICE.message,
          codRetorno:
            error.response.codRetorno || ErrorMessage.ERROR_SERVICE.codRetorno,
        },
        error.status || ErrorMessage.ERROR_SERVICE.status,
        {
          cause: new Error(error.options.cause || error),
          description: error.options.description || error.message,
        },
      );
    }
  }

  async findOne(findProductDto: FindProductDto) {
    try {
      const resp = await this.productRepository.findOneBy(findProductDto);
      return resp;
    } catch (error) {
      throw new HttpException(
        {
          message: error.response.message || ErrorMessage.ERROR_SERVICE.message,
          codRetorno:
            error.response.codRetorno || ErrorMessage.ERROR_SERVICE.codRetorno,
        },
        error.status || ErrorMessage.ERROR_SERVICE.status,
        {
          cause: new Error(error.options.cause || error),
          description: error.options.description || error.message,
        },
      );
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const resp = await this.productRepository.update(id, updateProductDto);
      return resp;
    } catch (error) {
      throw new HttpException(
        {
          message: error.response.message || ErrorMessage.ERROR_SERVICE.message,
          codRetorno:
            error.response.codRetorno || ErrorMessage.ERROR_SERVICE.codRetorno,
        },
        error.status || ErrorMessage.ERROR_SERVICE.status,
        {
          cause: new Error(error.options.cause || error),
          description: error.options.description || error.message,
        },
      );
    }
  }

  async remove(id: number, updateProductDto: UpdateProductDto) {
    try {
      const respUpdate = await this.productRepository.update(
        id,
        updateProductDto,
      );

      const resp = await this.productRepository.softDelete(id);

      return resp;
    } catch (error) {
      throw new HttpException(
        {
          message: error.response.message || ErrorMessage.ERROR_SERVICE.message,
          codRetorno:
            error.response.codRetorno || ErrorMessage.ERROR_SERVICE.codRetorno,
        },
        error.status || ErrorMessage.ERROR_SERVICE.status,
        {
          cause: new Error(error.options.cause || error),
          description: error.options.description || error.message,
        },
      );
    }
  }
}
