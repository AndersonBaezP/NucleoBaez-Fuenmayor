import { Injectable } from '@angular/core';
import { Course } from '../../types/courses';

@Injectable({
  providedIn: 'root'
})
export class CartService {
 course: Course[] = [];
 cartVisible = false;

  constructor() { }

  addCourse(course: Course) {
    this.course.push(course);
  }

  removeCourse(course: Course) {
    const index = this.course.indexOf(course);
    if (index !== -1) {
      this.course.splice(index, 1);
    }
  }

  getTotal() {
    return this.course.reduce((total, course) => total + course.price, 0);
  }

  getCourses() {
    return this.course;
  }

  isCartVisible() {
    return this.cartVisible;
  }

  showCart() {
    this.cartVisible = true;
  }

  hideCart() {
    this.cartVisible = false;
  }
}
