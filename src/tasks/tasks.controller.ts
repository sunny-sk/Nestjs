import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  UsePipes,
  Patch,
  ValidationPipe,
  Query,
  UseGuards,
  Req,
  Logger,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
// import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
// import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { CParseIntPipe } from './pipes/parseInt.pipe';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from './task.model';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { AuthGuard } from '@nestjs/passport';
@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TaskController');

  constructor(private readonly taskService: TasksService) {}

  @Get()
  getTasks(
    @Query(ValidationPipe) filterDto: GetTaskFilterDto,
    @Req() req
  ): Promise<Task[]> {
    this.logger.verbose(
      `User "${req.user.username}" retrieving all application`
    );
    return this.taskService.getTasks(filterDto, req.user);
  }

  @Get(':id')
  getTaskById(
    @Param('id', CParseIntPipe) id: number,
    @Req() req
  ): Promise<Task> {
    return this.taskService.getTaskById(id, req.user);
  }

  // method1
  // @Post()
  // createTask(@Body() body) {
  //   console.log(body);
  //   // return this.taskService.createTask();
  // }

  // method2
  // @Post()
  // createTas(
  //   @Body('title') title: string,
  //   @Body('description') description: string
  // ) {
  //   return this.taskService.createTask(title, description);
  // }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto, @Req() req): Promise<Task> {
    this.logger.verbose(
      `User "${req.user.username}" creating a new Task ${JSON.stringify(
        createTaskDto
      )}`
    );
    return this.taskService.createTask(createTaskDto, req.user);
  }

  @Delete(':id')
  deleteTask(@Param('id', CParseIntPipe) id: number, @Req() req): Promise<any> {
    return this.taskService.deleteTask(id, req.user);
  }

  @Patch(':id/status')
  updateTaskStatus(
    @Param('id', CParseIntPipe) id: number,
    // custom pipe for validation
    // new TaskStatusValidation(123,34) id params
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    @Req() req
  ): Promise<Task> {
    return this.taskService.updateTaskStatus(id, status, req.user);
  }
}
