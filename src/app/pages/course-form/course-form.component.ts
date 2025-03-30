import { Component } from '@angular/core';
import { CoursesService } from '../../services/courses/courses.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent {
  form: FormGroup;
  id: number = 0;

  constructor(
    private coursesService: CoursesService, 
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      title: ["", [Validators.required]],
      description: [""],
      price: [0, [Validators.required]],
      image: [""],
      videoUrl: [""],
      professor: [""]
    })
  }

  ngOnInit(){
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      if(!this.id) return;
      this.coursesService.getCourse(this.id).subscribe(courses => {
        this.form.patchValue(courses);
      });
    })
  }  

  addCourse(){
    if(this.form.invalid) return;
    this.coursesService.addCourse(this.form.value)
      .then(() => this.router.navigate(["/courses"]))
      .catch(err => console.log(err));
  }

  updateCourse(){
    if(this.form.invalid) return;
    this.coursesService.updateCourse({ id: this.id, ...this.form.value})
      .then(() => this.router.navigate(["/courses"]))
      .catch(err => console.log(err));
  }
}
