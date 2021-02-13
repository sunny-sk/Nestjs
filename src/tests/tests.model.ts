import { Document, Schema } from 'mongoose';
export const TestSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export interface Test extends Document {
  id: string;
  title: string;
  description: string;
}
