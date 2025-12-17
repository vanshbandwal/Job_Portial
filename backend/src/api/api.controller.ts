import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { SignDto } from './Dto/signup..Dto';
import { ApiService } from './api.service';
import { LoginDto } from './Dto/login_Dto';
import type { Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Controller('api')
export class ApiController {
  constructor(private readonly ApiService: ApiService) {}
  @Post('/signup')
  async signup(@Body() user: SignDto, @Res() res: Response) {
    const result = await this.ApiService.signup(user);

    if (!result.success) {
      return res.status(400).json(result); // return error from service
    }

    // set cookie
    res.cookie('token', result.token, {
      httpOnly: true,
      secure: false, // change to true in production (HTTPS)
      sameSite: 'strict',
    });

    return res.json({
      success: true,
      message: 'Signup successful',
    });
  }
  
  @Post('/login')
  async login(@Body() user: LoginDto, @Res() res: Response) {
    const token = await this.ApiService.login(user);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // set true in production with https
      sameSite: 'strict',
    });

    return res.json({
      success: true,
      message: 'Login successfully',
    });
  }
@Post('/logout')
logout(@Res() res: Response) {  

  res.clearCookie('token', {
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  });

  return res.json({
    success: true,
    message: 'Logged out successfully',
  });
}

@Get('/me')
async getMe(@Req() req, @Res() res: Response) {
  const token = req.cookies['token'];
  console.log(token)
  if (!token) {
    return res.status(401).json({ success: false, message: 'Not logged in' });
  }

  try {
    const decoded = jwt.verify(token, 'SECRET_KEY');
    return res.json({ success: true, user: decoded });
  } catch (e) {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
}
}
