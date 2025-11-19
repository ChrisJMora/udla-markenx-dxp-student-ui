import { Injectable } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksViewModel {
  constructor(private _tasksService: TasksService) {}

  public getAllStudentTasks(
    page?: number,
    size?: number,
    status?: string,
    startDate?: string | null,
    endDate?: string | null
  ): Promise<any> {
    return firstValueFrom(
      this._tasksService.getAllStudentTasks(page, size, status, startDate, endDate)
    );
  }
}
