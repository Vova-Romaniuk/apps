import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  BadRequestException,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAll() {
    return this.usersService.getAll();
  }

  @Post()
  async create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const success = await this.usersService.deleteById(id);
    if (!success) {
      throw new BadRequestException('User not found');
    }

    return { message: 'User deleted successfully' };
  }
}
