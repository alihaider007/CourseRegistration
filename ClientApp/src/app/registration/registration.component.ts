import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../registration.service';
import { RegistrationModel } from './registration';
import { Course } from './course';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  courses: Course[] = []
  errorMsg = "";
  isSuccess = false;
  courseHasError = true;
  submitted = false;
  courseDate: Date;

  registrationModel = new RegistrationModel('default', '',null,'');

  constructor(private registrationService: RegistrationService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.registrationService.getAllCourses()
      .subscribe(
        data => this.courses = data,
        error => this.errorMsg = this.FailureResponse(error))
  }

  FailureResponse(error) {
    this.isSuccess = false;
    console.log(error);
    return error;
  }

  validateCourse(value) {
    if (value === "default") {
      this.courseHasError = true;
      this.courseDate = null;
    } else {
      this.courseHasError = false;
      var c = this.courses.find(a => a.name == value);
      this.courseDate = c.date;
      this.registrationModel.datetime = this.courseDate;
    }
  }

  SuccessResponse(data) {
    return data;
  }

  RegistrationSuccessResponse(data) {
    this.isSuccess = true;
    return data;
  }

  onSubmit() {
    this.submitted = true;
    this.registrationService.addRegistration(this.registrationModel)
      .subscribe(
      data => this.RegistrationSuccessResponse(data),
        error => this.errorMsg = this.FailureResponse(error)
      )
  }

  addNew() {
    this.submitted = false;
    this.isSuccess = false;
    this.courseHasError = false;
    this.courseDate = null;
  }

}
