import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/services/auth.service';
import { StudentService, StudentWithCourseResponse, StudentTaskResponse } from '../../core/services/student.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  studentProfile: StudentWithCourseResponse | null = null;
  tasks: StudentTaskResponse[] = [];
  loading = true;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadStudentData();
  }

  loadStudentData(): void {
    this.loading = true;
    this.errorMessage = '';

    // Cargar perfil del estudiante
    this.studentService.getCurrentStudentProfile().subscribe({
      next: (profile) => {
        this.studentProfile = profile;
        this.loadStudentTasks();
      },
      error: (error) => {
        console.error('Error loading student profile:', error);
        this.errorMessage = 'Error al cargar el perfil del estudiante';
        this.loading = false;
      }
    });
  }

  loadStudentTasks(): void {
    // Cargar tareas del estudiante
    this.studentService.getCurrentStudentTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading student tasks:', error);
        this.errorMessage = 'Error al cargar las tareas del estudiante';
        this.loading = false;
      }
    });
  }

  getTaskStatusLabel(status: string): string {
    const statusMap: { [key: string]: string } = {
      'PENDING': 'Pendiente',
      'IN_PROGRESS': 'En Progreso',
      'SUBMITTED': 'Enviada',
      'GRADED': 'Calificada',
      'COMPLETED': 'Completada'
    };
    return statusMap[status] || status;
  }

  getTaskStatusClass(status: string): string {
    const classMap: { [key: string]: string } = {
      'PENDING': 'status-assigned',
      'IN_PROGRESS': 'status-in-progress',
      'SUBMITTED': 'status-submitted',
      'GRADED': 'status-graded',
      'COMPLETED': 'status-graded'
    };
    return classMap[status] || '';
  }

  viewTask(task: StudentTaskResponse): void {
    this.router.navigate(['/assignments']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
