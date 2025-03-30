import { CanDeactivateFn } from '@angular/router';
import { CourseFormComponent } from '../../pages/course-form/course-form.component';

export const warningsGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  const currentComponent = component as CourseFormComponent;
  
  if(currentComponent.form.touched){
    return window.confirm("Estas seguro que deseas abandonar la pagina?");
  }
  return true;
};
