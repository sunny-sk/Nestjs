import { Document, Schema } from 'mongoose';
export const feedbackSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a full name'],
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Please add a full name'],
      trim: true,
    },
    suggestion: {
      type: String,
      required: [true, 'Please add a full name'],
      trim: true,
    },
  },
  { timestamps: true }
);

export interface Feedback extends Document {
  title: string;
  message: string;
  suggestion: string;
}
