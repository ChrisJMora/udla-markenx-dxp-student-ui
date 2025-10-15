import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppMarkenxAssignmentsComponent as AppAssignmentsComponent } from './view/app-markenx-assignments/app-markenx-assignments.component';
import { AppMarkenxLessonsComponent as AppLessonsComponent } from './view/app-markenx-lessons/app-markenx-lessons.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'assignments',
    pathMatch: 'full',
  },
  {
    path: 'assignments',
    component: AppAssignmentsComponent,
    data: { breadcrumb: 'Mis Asignaciones' },
  },
  {
    path: 'lessons',
    component: AppLessonsComponent,
    data: { breadcrumb: 'Mis Evaluaciones' },
  },
  {
    path: 'game-mode',
    data: { breadcrumb: 'Modos de Juego' },
    children: [
      {
        path: '',
        redirectTo: 'tutorial',
        pathMatch: 'full',
      },
      {
        path: 'tutorial',
        component: AppLessonsComponent,
        data: { breadcrumb: 'Tutorial' },
      },
      {
        path: 'normal',
        component: AppLessonsComponent,
        data: { breadcrumb: 'Normal' },
      },
    ],
  },
  {
    path: 'progress',
    component: AppLessonsComponent,
    data: { breadcrumb: 'Mi Progreso' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
