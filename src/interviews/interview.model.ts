import { Document, Schema } from 'mongoose';
import {
  NO_OF_ROUNDS,
  INTERVIEW_STATUS,
  INTERVIEWER_STATUS_FOR_CANDIDATE,
} from 'src/constants/constant';
import * as mongoose from 'mongoose';
export const interviewSchema = new Schema(
  {
    title: {
      type: String,
      maxlength: [32, 'max character 32'],
      trim: true,
    },
    candidateName: {
      type: String,
      trim: true,
    },
    candidateEmail: {
      type: String,
      matcher: [
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      ],
    },
    noOfRounds: {
      type: Number,
      default: NO_OF_ROUNDS,
    },

    rounds: {
      type: [
        new Schema({
          status: {
            type: String,
            enum: INTERVIEWER_STATUS_FOR_CANDIDATE,
            default: INTERVIEWER_STATUS_FOR_CANDIDATE.Pending,
          },
          interviewer: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true,
          },
          feedbacks: {
            type: [mongoose.Types.ObjectId],
            ref: 'Feedbacks',
            required: true,
          },
          startedAt: {
            type: Date,
            default: null,
          },
          finishedAt: {
            type: Date,
            default: null,
          },
        }),
      ],
      default: null,
    },
    test: {
      type: mongoose.Types.ObjectId,
      ref: 'Test',
    },
    interviewStatus: {
      type: String,
      default: INTERVIEW_STATUS.Goingon,
      enum: INTERVIEW_STATUS,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
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
  resetPasswordToken: string;
  emailVerifyToken: string;
}
