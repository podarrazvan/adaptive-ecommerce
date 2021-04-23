import { Body, Controller, Get, Post, Put, Param } from '@nestjs/common';
import { IUser } from './user.model';
import { UsersService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAllUsers() {
    return;
  }

  @Post('signup')
  async signup(@Body('user') user) {
    return;
  }

  @Post('login')
  async login(@Body('user') user) {
    return;
  }
}
