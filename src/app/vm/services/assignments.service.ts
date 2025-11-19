import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  private baseUrl = 'api/markenx/assignments'

  constructor(private _http: HttpClient) {}

  public getAllAssignmentStatus(): Observable<any> {
    const url = `${this.baseUrl}/status`;

    return this._http.get(url);
  }
}
