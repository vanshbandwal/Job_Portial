import { Injectable } from '@nestjs/common';
import { SignDto } from './Dto/signup..Dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './Model/user.model';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './Dto/login_Dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class ApiService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async signup(user: SignDto) {
    const { email, password, role, fullname } = user;

    // check if user exists
    const existUser = await this.userModel.findOne({ email });
    if (existUser) {
      return {
        success: false,
        message: 'User already exists, please login !!',
      };
    }

    // hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // create new user
    const newUser = new this.userModel({
      fullname,
      email,
      password: hashPassword,
      role,
    });

    await newUser.save();

    // generate token
    const token = jwt.sign(
      { userId: newUser._id, userRole: newUser.role },
      'SECRET_KEY',
      { expiresIn: '7d' },
    );

    return { success: true, token };
  }
  
  async login(user: LoginDto) {
    const { email, password } = user;
    const ExistsUser = await this.userModel.findOne({ email });

    if (!ExistsUser) return { success: false, message: 'Please Signup first !!' };

    const isMatch = await bcrypt.compare(password, ExistsUser.password);
    if (!isMatch) return { success: false, message: 'Invalid credentials !!' };

    const token = jwt.sign({ userId: ExistsUser._id,userRole:ExistsUser.role}, 'SECRET_KEY', { expiresIn: '7d' });
    return token
  }
}  
