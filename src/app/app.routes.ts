import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { canActivate, redirectUnauthorizedTo } from "@angular/fire/auth-guard";
import { permissionsGuard } from './guards/permissions/permissions.guard';
import { warningsGuard } from './guards/warnings/warnings.guard';
import { CoursesComponent } from './pages/courses/courses.component';
import { CourseComponent } from './pages/course/course.component';
import { CourseFormComponent } from './pages/course-form/course-form.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    {
        path: 'courses',
        component: CoursesComponent,
        ...canActivate(() => redirectUnauthorizedTo(["/login"]))
    },
    { 
        path: 'courses/:id', 
        component: CourseComponent,
        canActivate: [permissionsGuard]
    },
    { path: 'courses-form/:id', component: CourseFormComponent , canDeactivate: [warningsGuard] },
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: NotFoundComponent }
];
