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
  public studentId: number = 1;

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
      this._loadTasks(this.studentId, this.currentPage, this.size);
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
    studentId: number,
    page: number = 0,
    size: number = 5,
    status?: string,
    startDate?: string | null,
    endDate?: string | null
  ) {
    this._tasksViewModel
      .getAllStudentTasks(studentId, page, size, status, startDate, endDate)
      .then((response) => {
        this.tasks = response.content.map((task: any) => {
          const status = this.statusList.find(
            (s) => s.id === task.currentStatus
          );
          return {
            ...task,
            statusModifier: status ? status.id.toLowerCase().replaceAll('_', '-') : task.currentStatus,
            statusLabel: status ? status.label : task.currentStatus,
          };
        });
        this.size = response.size;
        this.totalRecords = response.totalElements;
      })
      .catch((err) => console.error(err));
  }

  public onPageChange(event: any) {
    this.currentPage = event.page ?? 0;
    this.size = event.rows ?? 0;
    this._loadTasks(this.studentId, this.currentPage, this.size);
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
      this.studentId,
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
      this.studentId,
      this.currentPage,
      this.size,
    );
  }
}
