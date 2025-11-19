import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { DividerModule } from 'primeng/divider';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppMarkenxAssignmentsComponent } from './view/app-markenx-tasks/app-markenx-tasks.component';
import { AppMarkenxLessonsComponent } from './view/app-markenx-lessons/app-markenx-lessons.component';

import { MarkenxComponentsModule } from '@chrisjmora/markenx-dxp-components';
import { MarkenxTaskComponent } from './view/app-markenx-tasks/markenx-task/markenx-task.component';

import { DatePipe } from '@angular/common';

// Auth Components
import { LoginComponent } from './features/auth/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

// Auth Services and Interceptors
import { AuthInterceptor } from './core/auth/interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AppMarkenxAssignmentsComponent,
    AppMarkenxLessonsComponent,
    MarkenxTaskComponent,
    LoginComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    TableModule,
    MenuModule,
    PanelModule,
    DividerModule,
    BreadcrumbModule,
    MarkenxComponentsModule,
    AppRoutingModule,
    HttpClientModule,
    DropdownModule,
    CalendarModule,
    PaginatorModule,
    InputTextModule,
    CardModule,
    TooltipModule,
  ],
  providers: [
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
