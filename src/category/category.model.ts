import { Document, Schema } from 'mongoose';
export const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a category name'],
      maxlength: [32, 'max character 32'],
      trim: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export interface Category extends Document {
  id: string;
  name: string;
}
