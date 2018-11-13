import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Course } from './registration/course';
import { catchError, map } from "rxjs/internal/operators";
import { RegistrationModel } from './registration/registration';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'//,
    //'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  public registration: RegistrationModel;
  private baseUrl: string = "https://localhost:44364";

  constructor(private http: HttpClient) { }

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.baseUrl + '/api/registration/course')
                    .pipe(catchError(this.errorHandler));
  }

  addRegistration(registration: RegistrationModel): Observable<string> {
    let body = JSON.stringify(registration);
    return this.http.post(this.baseUrl + "/api/registration", body, httpOptions)
      .pipe(map(response => response = 'Success'))
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || "Server Error");
  }
}
