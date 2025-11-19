import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
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

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppMarkenxAssignmentsComponent } from './view/app-markenx-tasks/app-markenx-tasks.component';
import { AppMarkenxLessonsComponent } from './view/app-markenx-lessons/app-markenx-lessons.component';

import { MarkenxComponentsModule } from '@chrisjmora/markenx-dxp-components';
import { MarkenxTaskComponent } from './view/app-markenx-tasks/markenx-task/markenx-task.component';

import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    AppMarkenxAssignmentsComponent,
    AppMarkenxLessonsComponent,
    MarkenxTaskComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
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
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
