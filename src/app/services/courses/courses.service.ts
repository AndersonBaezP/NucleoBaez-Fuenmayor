import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../../types/courses';
import { 
  collection, 
  collectionData,
  deleteDoc, 
  doc, 
  docData, 
  Firestore, 
  getDocs, 
  setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient, private firestore: Firestore) { }

  getCourses(): Observable<Course[]> {
    const coursesRef = collection(this.firestore, "courses");
    return collectionData(coursesRef) as Observable<Course[]>;
  }

  getCourse(id: number): Observable<Course> {
    const courseRef = doc(this.firestore, "courses", id.toString());
    return docData(courseRef) as Observable<Course>;
  }

  addCourse(course: Course) {
      const coursesRef = collection(this.firestore, "courses");
      return getDocs(coursesRef).then(snapshot => {
        const maxId = snapshot.docs.reduce((max, course) => Math.max(max, Number(course.id)), 0);
        course.id = maxId + 1;
        return this.updateCourse(course);
      });
    }

  updateCourse(course: Course){
    const courseRef = doc(this.firestore, "courses", course.id.toString());
    return setDoc(courseRef, course, {merge: true});
  }

  deleteCourse(id: number) {
    const courseRef = doc(this.firestore, "courses", id.toString());
    return deleteDoc(courseRef);
  }
  loadCoursestoFirebase() {
    this.getCourses().subscribe(course => {
      course.forEach(course => {
        const coursesRef = doc(this.firestore, "courses", course.id.toString());
        setDoc(coursesRef, course);
      })
    });
  }
}

