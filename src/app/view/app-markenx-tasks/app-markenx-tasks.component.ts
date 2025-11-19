import { Component, OnInit } from '@angular/core';
import { AssignmentsViewModel } from 'src/app/vm/view-model/assignments.view-model';
import { TasksViewModel } from 'src/app/vm/view-model/tasks.view-model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-markenx-assignments',
  templateUrl: './app-markenx-tasks.component.html',
  styleUrls: ['./app-markenx-tasks.component.scss'],
})
export class AppMarkenxAssignmentsComponent implements OnInit {
  public statusList: Array<any> = [];
  public selectedStatus: string | null = null;

  public dateRange: Date[] | null = null;

  public tasks: Array<any> = [];

  public size: number = 5;
  public currentPage: number = 0;
  public totalRecords: number = 0;

  constructor(
    private _assignmentsViewModel: AssignmentsViewModel,
    private _tasksViewModel: TasksViewModel,
    private datePipe: DatePipe
  ) {}

  public ngOnInit(): void {
    this._loadStatusList().then(() => {
      this._loadTasks(this.currentPage, this.size);
    });
  }

  private async _loadStatusList(): Promise<void> {
    try {
      const data = await this._assignmentsViewModel.getAllAssignmentsStatus();
      this.statusList = data;
    } catch (err) {
      return console.error(err);
    }
  }

  private _loadTasks(
    page: number = 0,
    size: number = 5,
    status?: string,
    startDate?: string | null,
    endDate?: string | null
  ) {
    this._tasksViewModel
      .getAllStudentTasks(page, size, status, startDate, endDate)
      .then((response) => {
        // El nuevo endpoint devuelve un array directamente, no un objeto paginado
        const tasksArray = Array.isArray(response) ? response : [];
        
        this.tasks = tasksArray.map((studentTask: any) => {
          // Verificar si la tarea está vencida
          const dueDate = new Date(studentTask.task.endDate);
          const isOverdue = dueDate < new Date();
          
          // Determinar el estado real
          let finalStatus = studentTask.assignmentStatus;
          let finalStatusLabel = studentTask.assignmentStatus;
          let finalStatusModifier = studentTask.assignmentStatus.toLowerCase().replaceAll('_', '-');
          
          if (isOverdue && finalStatus !== 'COMPLETED' && finalStatus !== 'GRADED') {
            finalStatus = 'OVERDUE';
            finalStatusLabel = 'VENCIDA';
            finalStatusModifier = 'overdue';
          } else {
            const status = this.statusList.find((s) => s.id === studentTask.assignmentStatus);
            if (status) {
              finalStatusLabel = status.label;
              finalStatusModifier = status.id.toLowerCase().replaceAll('_', '-');
            }
          }
          
          return {
            // Mapear desde la nueva estructura
            id: studentTask.studentTaskId,
            code: studentTask.studentTaskCode,
            title: studentTask.task.name,
            summary: studentTask.task.description,
            description: studentTask.task.description,
            maxAttempts: studentTask.task.maxAttempts,
            activeAttempt: studentTask.attemptCount,
            dueDate: studentTask.task.endDate,
            startDate: studentTask.task.startDate,
            maxScore: studentTask.task.maxScore,
            minScoreToPass: studentTask.task.minScoreToPass,
            courseCode: studentTask.task.courseCode,
            courseName: studentTask.task.courseName,
            currentStatus: finalStatus,
            statusModifier: finalStatusModifier,
            statusLabel: finalStatusLabel,
            // Datos originales
            originalData: studentTask
          };
        });
        this.totalRecords = tasksArray.length;
      })
      .catch((err) => console.error(err));
  }

  public onPageChange(event: any) {
    this.currentPage = event.page ?? 0;
    this.size = event.rows ?? 0;
    this._loadTasks(this.currentPage, this.size);
  }

  public onFilter() {
    const startDateStr = this.dateRange?.[0]
      ? this.datePipe.transform(this.dateRange[0], 'yyyy-MM-dd')
      : undefined;

    const endDateStr = this.dateRange?.[1]
      ? this.datePipe.transform(this.dateRange[1], 'yyyy-MM-dd')
      : undefined;

    if (this.selectedStatus == null) return;

    this._loadTasks(
      this.currentPage,
      this.size,
      this.selectedStatus,
      startDateStr,
      endDateStr
    );
  }

  public get filtersValueChanged() {
    return this.dateRange !== null || this.selectedStatus !== null;
  }

  public onResetFilters() {
    this.dateRange = null;
    this.selectedStatus = null;
    this._loadTasks(
      this.currentPage,
      this.size
    );
  }
}
