import { Injectable, Inject } from '@angular/core';
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
  private _baseUrl: string = "";

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this._baseUrl = baseUrl;
    console.log("BaseURL: " + baseUrl);
  }

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this._baseUrl + '/api/registration/course')
                    .pipe(catchError(this.errorHandler));
  }

  addRegistration(registration: RegistrationModel): Observable<string> {
    let body = JSON.stringify(registration);
    return this.http.post(this._baseUrl + "/api/registration", body, httpOptions)
      .pipe(map(response => response = 'Success'))
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || "Server Error");
  }
}
