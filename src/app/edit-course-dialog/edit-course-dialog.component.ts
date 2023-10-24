import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Course } from "../model/course";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { AngularFireStorage } from "@angular/fire/storage";
import { Observable, throwError } from "rxjs";
import { CoursesService } from "../services/courses.service";
import { catchError, tap } from "rxjs/operators";

@Component({
  selector: "edit-course-dialog",
  templateUrl: "./edit-course-dialog.component.html",
  styleUrls: ["./edit-course-dialog.component.css"],
})
export class EditCourseDialogComponent {
  form: FormGroup;
  course: Course;

  constructor(
    private dialogRef: MatDialogRef<EditCourseDialogComponent>,
    private fb: FormBuilder,
    private coursesService: CoursesService,
    @Inject(MAT_DIALOG_DATA) course: Course
  ) {
    this.course = course;

    this.form = this.fb.group({
      description: [course.description, Validators.required],
      promo: [course.promo],
      longDescription: [course.longDescription, Validators.required],
    });
  }

  onSave() {
    const changes = this.form.value;

    this.coursesService
      .updateCourse(this.course.id, changes)
      .subscribe(() => this.dialogRef.close(changes));
  }

  onClose() {
    this.dialogRef.close();
  }
}
