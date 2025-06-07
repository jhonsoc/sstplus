// src/company/company.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard'; 
import { Roles } from '../auth/decorators/roles.decorator'; 
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../auth/entities/user.entity';
import { Role } from '../auth/enums/role.enum';

@Controller('companies')
@UseGuards(JwtAuthGuard, RolesGuard) // 👈 Aplica ambos guards
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @Roles(Role.SUPERADMIN) // 👈 Solo SUPERADMIN puede crear empresas
  create(@Body() dto: CreateCompanyDto, @GetUser() user: User) {
    return this.companyService.createCompany(dto, user);
  }

  @Get()
  findAll() {
    return this.companyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyService.findById(Number(id));
  }
}
