import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(
    name: string,
    email: string,
    password: string,
  ): Promise<User> {
    const newUser = this.userRepository.create({ name, email, password });
    return await this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async blockUsers(ids: number[]): Promise<{ message: string }> {
    await this.userRepository.update({ id: In(ids) }, { status: 'blocked' });
    return { message: 'Users blocked successfully' };
  }

  async unblockUsers(ids: number[]): Promise<{ message: string }> {
    await this.userRepository.update({ id: In(ids) }, { status: 'active' });
    return { message: 'Users unblocked successfully' };
  }

  async deleteUsers(ids: number[]): Promise<{ message: string }> {
    await this.userRepository.delete({ id: In(ids) });
    return { message: 'Users deleted successfully' };
  }
}
