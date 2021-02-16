import { Document, Schema } from 'mongoose';
import * as mongoose from 'mongoose';
import { PASSING_PERCENTAGE, PASSING_STATUS } from '../constants/constant';
export const TestSchema = new Schema(
  {
    candidateName: {
      type: String,
      required: true,
    },
    candidateEmail: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      default: null,
    },
    totalTime: {
      type: Number,
      default: 30,
    },
    totalQuetions: {
      type: Number,
      default: 20,
    },
    oneTimeAccess: {
      type: Boolean,
      default: true,
    },
    passingPer: {
      type: Number,
      default: PASSING_PERCENTAGE,
    },
    isTimeout: {
      type: Boolean,
      default: false,
    },
    isValid: {
      type: Boolean,
      default: true,
    },
    isFinished: {
      type: Boolean,
      default: false,
    },
    passingStatus: {
      type: String,
      default: PASSING_STATUS.NotEvaluated,
      enum: PASSING_STATUS,
    },
    questions: {
      type: [
        new Schema(
          {
            questionId: {
              type: mongoose.Types.ObjectId,
              required: true,
              ref: 'Question',
            },
            submittedAns: {
              type: String,
              default: null,
            },
          },
          { _id: false }
        ),
      ],
      required: true,
    },
    startedAt: {
      type: Date,
      default: null,
    },
    feedback: {
      type: mongoose.Types.ObjectId,
      ref: 'Feedback',
    },
    finishedAt: {
      type: Date,
      default: null,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    password: {
      type: String,
      ref: 'User',
    },
  },
  { timestamps: true }
);

export interface Test extends Document {
  id: string;
  description: string;
  candidateName: string;
  candidateEmail: string;
  totalTime: number;
  totalQuetions: number;
  oneTimeAccess: boolean;
  isTimeout: boolean;
  isFinished: boolean;
  questions: any[];
  createdBy: any;
  startedAt: Date;
  finishedAt: Date;
  isValid: boolean;
  passingStatus: PASSING_STATUS;
  passingPer: number;
  feedback: any;
  password: string;
}
