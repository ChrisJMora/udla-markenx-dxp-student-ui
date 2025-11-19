import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-markenx-task',
  templateUrl: './markenx-task.component.html',
  styleUrls: ['./markenx-task.component.scss']
})
export class MarkenxTaskComponent {
  @Input()
  public task!: any;

  public get isOverdue():boolean {
    return this.task.dueDate < new Date();
  }

  public get isFirstAttempt(): boolean {
    return this.task.activeAttempt === 0;
  }

  public get attemptsAvailable(): boolean {
    return this.task.activeAttempt < this.task.maxAttempts;
  }

  public get showPlayButton(): boolean {
    return this.task.currentStatus !== 'OUTDATED' && !this.isOverdue && this.isFirstAttempt;
  }

  public get showRetryButton(): boolean {
    return !this.isOverdue && !this.isFirstAttempt && this.attemptsAvailable;
  }

  public get showHistoryButton(): boolean {
    return this.task.activeAttempt > 0;
  }
}
