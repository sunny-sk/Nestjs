import { Document, Schema } from 'mongoose';
export const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a full name'],
      maxlength: [32, 'max character 32'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please add email'],
      unique: true,
      matcher: [
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      ],
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
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    resetPasswordToken: {
      type: String,
      default: null,
    },
    emailVerifyToken: {
      type: String,
      default: null,
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
  role: string;
  salt: string;
  resetPasswordToken: string;
  emailVerifyToken: string;
}
