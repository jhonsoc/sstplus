import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(documentNumber: string, password: string): Promise<string | null> {
    const user = await this.userRepository.findOne({
      where: { documentNumber },
    });

    if (!user || !user.isActive) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;

    const payload: JwtPayload = {
      sub: user.id.toString(),
      role: user.role,
      documentNumber: user.documentNumber,
    };

    return this.jwtService.sign(payload);
  }
}
