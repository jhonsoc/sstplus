import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async createCompany(dto: CreateCompanyDto, user: User): Promise<Company> {
    const company = this.companyRepository.create({
      name: dto.name,
      nit: dto.nit,
      users: [user], // asociar el usuario creador
    });

    return this.companyRepository.save(company);
  }

  async findAll(): Promise<Company[]> {
    return this.companyRepository.find({ relations: ['users'] });
  }

  async findOne(id: number): Promise<Company | null> {
    return this.companyRepository.findOne({
      where: { id },
      relations: ['users'],
    });
  }

  async findById(id: number): Promise<Company | null> {
    return this.companyRepository.findOne({
      where: { id },
      relations: ['users'],
    });
  }
}
