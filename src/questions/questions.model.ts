import { Document, Schema } from 'mongoose';
import { LEVEL, OPTIONS, TYPE } from 'src/constants/constant';
import * as mongoose from 'mongoose';

export const questionSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
      // unique: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
      enum: TYPE,
    },
    level: {
      type: String,
      required: true,
      trim: true,
      enum: LEVEL,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: 'Category',
      required: true,
      trim: true,
    },
    answer: {
      type: String,
      default: null,
    },
    options: {
      type: [
        new Schema({
          option: {
            type: String,
            required: true,
            enum: OPTIONS,
          },
          ans: {
            type: String,
            required: true,
          },
        }),
      ],
      default: null,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export interface Question extends Document {
  id: string;
  question: string;
  type: string;
  level: string;
  isActive: boolean;
  createdBy: mongoose.Types.ObjectId;
  category: mongoose.Types.ObjectId;
  options: any;
  answer: any;
}
