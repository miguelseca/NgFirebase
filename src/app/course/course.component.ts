import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Course } from "../model/course";
import { finalize, tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { Lesson } from "../model/lesson";
import { CoursesService } from "../services/courses.service";

@Component({
  selector: "course",
  templateUrl: "./course.component.html",
  styleUrls: ["./course.component.css"],
})
export class CourseComponent implements OnInit {
  lessons: Lesson[];

  course: Course;

  lastPageLoaded: number = 0;

  loading = false;

  displayedColumns = ["seqNo", "description", "duration"];

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService
  ) {}

  ngOnInit() {
    this.course = this.route.snapshot.data["course"];

    this.loading = true;
    //this.lessons$ = this.coursesService.findlessons(this.course.id);
    this.coursesService
      .findlessons(this.course.id)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((lessons) => (this.lessons = lessons));
  }

  onLoadMore() {
    this.lastPageLoaded++;

    this.coursesService
      .findlessons(this.course.id, "asc", this.lastPageLoaded)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((lessons) => (this.lessons = this.lessons.concat(lessons)));
  }
}
