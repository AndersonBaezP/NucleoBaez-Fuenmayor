import { Component } from '@angular/core';
import { Course } from '../../types/courses';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CoursesService } from '../../services/courses/courses.service';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent {
  course: Course | undefined;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private coursesService: CoursesService) {}

  ngOnInit(){
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.coursesService.getCourse(id).subscribe(course => {
        this.course = course;
      });
    })
  }
}
