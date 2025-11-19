import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppMarkenxAssignmentsComponent as AppAssignmentsComponent } from './view/app-markenx-tasks/app-markenx-tasks.component';
import { AppMarkenxLessonsComponent as AppLessonsComponent } from './view/app-markenx-lessons/app-markenx-lessons.component';
import { LoginComponent } from './features/auth/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AuthGuard } from './core/auth/guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Inicio' },
  },
  {
    path: 'assignments',
    component: AppAssignmentsComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Mis Tareas' },
  },
  {
    path: 'lessons',
    component: AppLessonsComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Mis Evaluaciones' },
  },
  {
    path: 'game-mode',
    canActivate: [AuthGuard],
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
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Mi Progreso' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
