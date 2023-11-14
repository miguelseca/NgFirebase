import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Course } from "../model/course";
import { CoursesService } from "./courses.service";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class CourseResolver implements Resolve<Course> {
  constructor(private courseService: CoursesService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Course> {
    const courseUrl = route.paramMap.get("courseUrl");
    return this.courseService.findCourseByUrl(courseUrl);
  }
}
