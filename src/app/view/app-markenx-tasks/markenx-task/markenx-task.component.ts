import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-markenx-task',
  templateUrl: './markenx-task.component.html',
  styleUrls: ['./markenx-task.component.scss']
})
export class MarkenxTaskComponent implements OnInit {
  @Input()
  public task!: any;

  ngOnInit() {
    // Debug: ver el estado de la tarea
    console.log('Task data:', {
      activeAttempt: this.task.activeAttempt,
      maxAttempts: this.task.maxAttempts,
      currentStatus: this.task.currentStatus,
      dueDate: this.task.dueDate,
      isOverdue: this.isOverdue,
      showPlayButton: this.showPlayButton,
      showRetryButton: this.showRetryButton,
      showContinueButton: this.showContinueButton,
      showHistoryButton: this.showHistoryButton
    });
  }

  public get isOverdue():boolean {
    if (!this.task.dueDate) return false;
    const dueDate = new Date(this.task.dueDate);
    return dueDate < new Date();
  }

  public get isFirstAttempt(): boolean {
    return this.task.activeAttempt === 0;
  }

  public get attemptsAvailable(): boolean {
    return this.task.activeAttempt < this.task.maxAttempts;
  }

  public get showPlayButton(): boolean {
    // Mostrar play si es primer intento y NO está vencida
    return this.task.activeAttempt === 0 && !this.isOverdue;
  }

  public get showRetryButton(): boolean {
    // Mostrar retry si ya tiene intentos, quedan disponibles y NO está vencida
    return this.task.activeAttempt > 0 && this.attemptsAvailable && !this.isOverdue;
  }

  public get showHistoryButton(): boolean {
    // Siempre mostrar historial si tiene al menos un intento
    return this.task.activeAttempt > 0;
  }

  public get showContinueButton(): boolean {
    // Mostrar continuar solo si no hay intentos disponibles, no se ha empezado y NO está vencida
    return !this.showPlayButton && !this.showRetryButton && !this.attemptsAvailable && !this.isOverdue;
  }
}
