import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private baseUrl = '/api/markenx/students';

  constructor(private _http: HttpClient) {}

  public getAllStudentTasks(
    studentId: number,
    page: number,
    size: number,
    status?: string,
    startDate?: string | null,
    endDate?: string | null
  ): Observable<any> {
    const url = `${this.baseUrl}/${studentId}/tasks`;

    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (status) {
      params = params.set('status', status);
    }

    if (startDate && endDate) {
      params = params.set('startDate', startDate);
      params = params.set('endDate', endDate);
    }

    return this._http.get(url, { params });
  }
}
