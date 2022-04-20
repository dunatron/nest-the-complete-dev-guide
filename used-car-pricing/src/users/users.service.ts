import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    // this simply creates a user record with the values supplied
    const user = this.repo.create({ email, password });
    // this here saves the user in the table
    return this.repo.save(user);
  }

  findOne(id: number) {
    // we could throw an error or return null
    return this.repo.findOne({
      where: {
        id: id,
      },
    });
  }

  find(email: string) {
    return this.repo.find({
      where: {
        email,
      },
    });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    // take all the properties from attrs and assign them over to user
    // overriding any properties that are already there
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found so could not be removed');
    }
    return this.repo.remove(user);
  }
}
