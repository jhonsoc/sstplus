// src/company/entities/company.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../auth/entities/user.entity';  // ajusta ruta según estructura

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  nit: string;

  @ManyToMany(() => User, (user) => user.companies, { cascade: true })
  users: User[];
}
