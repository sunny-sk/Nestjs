import { User } from 'src/auth/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskStatus } from './task.model';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  title: string;

  @ManyToOne((type) => User, (user) => user.tasks, { eager: false })
  user: User;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;
}
