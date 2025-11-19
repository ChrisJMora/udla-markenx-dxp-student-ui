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
    page?: number,
    size?: number,
    status?: string,
    startDate?: string | null,
    endDate?: string | null
  ): Observable<any> {
    const url = `${this.baseUrl}/me/tasks`;

    let params = new HttpParams();

    if (page !== undefined) {
      params = params.set('page', page.toString());
    }

    if (size !== undefined) {
      params = params.set('size', size.toString());
    }

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
