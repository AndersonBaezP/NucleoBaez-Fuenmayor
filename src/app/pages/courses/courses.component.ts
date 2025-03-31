import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';
import { UsersService } from '../../services/users/users.service';
import { CoursesService } from '../../services/courses/courses.service';
import { Course } from '../../types/courses';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  courses: Course[] = [];
  role: string = 'user';

  constructor(
    private router: Router, 
    private coursesService: CoursesService,
    private cartService: CartService,
    private usersService: UsersService
  ) {}

  ngOnInit(){
    this.getCourses();
    this.coursesService.loadCoursestoFirebase();
    this.getRole();
  }

  goToCourse(id: number) {
    this.router.navigate(['/courses', id]);
  }

  getCourses() {
    this.coursesService.getCourses().subscribe(course => {
      this.courses = course;
    });
  }

  addToCart(event: Event, course: Course) {
    event.stopPropagation();
    this.cartService.addCourse(course);
  }

  deleteCourse(event: Event, id: number) {
    event.stopPropagation();
    this.coursesService.deleteCourse(id)
      .then(() => console.log("Curso eliminado con exito"))
      .catch(err => console.log(err));
  }
  trackByCourseId(index: number, course: Course): number {
    return course.id;
  }

  getRole() {
    this.usersService.getCurrentUser()!
      .then(user => {
        console.log(user);
        this.role = user?.["role"]
      });
  }
}
