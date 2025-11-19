import { firstValueFrom } from "rxjs";
import { AssignmentsService } from "../services/assignments.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class AssignmentsViewModel {
  constructor(private _assignmentsService: AssignmentsService) {}

  public getAllAssignmentsStatus(): Promise<any> {
    return firstValueFrom(
      this._assignmentsService.getAllAssignmentStatus()
    );
  }
}
