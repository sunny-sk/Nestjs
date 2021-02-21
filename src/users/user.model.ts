import { Document, Schema } from 'mongoose';
import { ROLE } from 'src/constants/constant';
export const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a full name'],
      maxlength: [32, 'max character 32'],
      trim: true,
    },
    empId: {
      type: String,
      required: [true, 'Please add a empId'],
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Please add email'],
      trim: true,
      unique: true,
      matcher: [
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      ],
    },
    skills: {
      type: [String],
      default: [],
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: [5, 'password minimum lenth should be 5'],
    },
    salt: {
      type: String,
    },
    roles: {
      type: [String],
      enum: ROLE,
      default: [ROLE.User],
    },
    resetPasswordToken: {
      type: String,
      default: null,
    },
    emailVerifyToken: {
      type: String,
      default: null,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export interface User extends Document {
  id: string;
  name: string;
  email: string;
  password: string;
  emailVerified: true;
  roles: string[];
  salt: string;
  skills: string[];
  resetPasswordToken: string;
  emailVerifyToken: string;
  empId: string;
}
