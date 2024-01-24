import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Country } from 'src/countries/entities/country.entity';

@Injectable()
export class AddressService {
  constructor(@InjectModel(Address) private addressRepository: typeof Address) {}

  async create(createAddressDto: CreateAddressDto) {
    try {
      const address = await this.addressRepository.create(createAddressDto);
      return await this.addressRepository.findByPk(address.id, {
        include: [{ model: Country, attributes: ['name'] }],
      });
    } catch (error) {
      if (error.name === 'SequelizeForeignKeyConstraintError') {
        throw new NotFoundException(error.original?.detail);
      }
      throw error;
    }
  }

  findAll(userId: number) {
    return this.addressRepository.findAll({
      where: { user_id: userId },
      include: [{ model: Country, attributes: ['name'] }],
    });
  }

  async update(id: number, updateAddressDto: UpdateAddressDto) {
    try {
      const [numberOfAffectedRows] = await this.addressRepository.update(updateAddressDto, {
        where: { id },
      });
      if (numberOfAffectedRows === 0) {
        throw new NotFoundException('Address not found');
      }

      return await this.addressRepository.findByPk(id, {
        include: [{ model: Country, attributes: ['name'] }],
      });
    } catch (error) {
      if (error.name === 'SequelizeForeignKeyConstraintError') {
        throw new NotFoundException(error.original?.detail);
      }
      throw error;
    }
  }

  async remove(id: number) {
    const result = await this.addressRepository.destroy({
      where: { id },
    });
    if (!result) {
      throw new NotFoundException('Address not found');
    }
  }
}
