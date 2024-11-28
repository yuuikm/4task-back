import { Controller, Post, Body, Get, Patch } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(
    @Body() body: { name: string; email: string; password: string },
  ) {
    return await this.usersService.createUser(
      body.name,
      body.email,
      body.password,
    );
  }

  @Get()
  async findAllUsers() {
    return await this.usersService.findAll();
  }

  @Patch('block')
  async blockUsers(@Body() body: { ids: number[] }) {
    return await this.usersService.blockUsers(body.ids);
  }

  @Patch('unblock')
  async unblockUsers(@Body() body: { ids: number[] }) {
    return await this.usersService.unblockUsers(body.ids);
  }

  @Patch('delete')
  async deleteUsers(@Body() body: { ids: number[] }) {
    return await this.usersService.deleteUsers(body.ids);
  }
}
