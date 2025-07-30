import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { promises as fs, existsSync } from 'fs';
import * as path from 'path';

const FILE_PATH = path.join(__dirname, '..', 'storage', 'users.json');

@Injectable()
export class UsersService {
  async getAll(): Promise<User[]> {
    if (!existsSync(FILE_PATH)) {
      await fs.mkdir(path.dirname(FILE_PATH), { recursive: true });
      await fs.writeFile(FILE_PATH, '[]', 'utf-8');
    }

    const content = await fs.readFile(FILE_PATH, 'utf-8');
    return JSON.parse(content);
  }

  async exists(email: string): Promise<boolean> {
    const users = await this.getAll();
    return users.some((user) => user.email === email);
  }

  async create(dto: CreateUserDto): Promise<User> {
    const users = await this.getAll();

    const newUser: User = {
      id: uuidv4(),
      ...dto,
    };

    users.push(newUser);
    await fs.writeFile(FILE_PATH, JSON.stringify(users, null, 2));
    return newUser;
  }

  async deleteById(id: string): Promise<boolean> {
    const users = await this.getAll();
    const updated = users.filter((user) => user.id !== id);

    if (updated.length === users.length) {
      return false;
    }

    await fs.writeFile(FILE_PATH, JSON.stringify(updated, null, 2));
    return true;
  }
}
