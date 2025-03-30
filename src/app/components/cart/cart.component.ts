import { Component } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { Course } from '../../types/courses';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  constructor(private cartService: CartService) { }

  getCourses() {
    return this.cartService.getCourses();
  }

  removeCourse(course: Course) {
    this.cartService.removeCourse(course);
  }

  closeCart() {
    this.cartService.hideCart();
  }

  getTotal() {
    return this.cartService.getTotal();
  }
}
