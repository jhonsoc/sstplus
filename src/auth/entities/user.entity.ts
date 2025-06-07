// src/auth/entities/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Company } from '../../company/entities/company.entity';
import { Role } from '../enums/role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  documentNumber: string;

  @Column()
  password: string;

  // Otros campos...

  @Column({ default: true })
  isActive: boolean;  // <-- agrega esta propiedad

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.TRABAJADOR, // 👈 Rol por defecto
  })
  role: Role;

  @ManyToMany(() => Company, (company) => company.users)
  companies: Company[];
}
