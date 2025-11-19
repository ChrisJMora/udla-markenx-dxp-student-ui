import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../environment/environment';

export interface StudentWithCourseResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  identityNumber: string;
  studentCode: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  course: {
    id: string;
    name: string;
    description: string;
    code: string;
    credits: number;
    status: string;
    academicTerm: {
      id: string;
      name: string;
      code: string;
      startDate: string;
      endDate: string;
      status: string;
    };
  };
}

export interface StudentTaskResponse {
  studentTaskId: string;
  studentTaskCode: string;
  studentTaskStatus: string;
  assignmentStatus: string;
  attemptCount: number;
  task: {
    id: string;
    code: string;
    name: string;
    description: string;
    maxScore: number;
    minScoreToPass: number;
    maxAttempts: number;
    status: string;
    startDate: string;
    endDate: string;
    courseCode: string;
    courseName: string;
    academicTermYear: number;
  };
}

export interface AttemptResponse {
  id: string;
  attemptNumber: number;
  startedAt: string;
  completedAt: string | null;
  score: number | null;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private readonly baseUrl = `/${enviroment.baseRoute}/students`;

  constructor(private http: HttpClient) {}

  getCurrentStudentProfile(): Observable<StudentWithCourseResponse> {
    return this.http.get<StudentWithCourseResponse>(`${this.baseUrl}/me`);
  }

  getCurrentStudentTasks(): Observable<StudentTaskResponse[]> {
    return this.http.get<StudentTaskResponse[]>(`${this.baseUrl}/me/tasks`);
  }

  getCurrentStudentTaskAttempts(taskId: string): Observable<AttemptResponse[]> {
    return this.http.get<AttemptResponse[]>(`${this.baseUrl}/me/tasks/${taskId}/attempts`);
  }
}
