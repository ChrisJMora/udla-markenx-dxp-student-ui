import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { DividerModule } from 'primeng/divider';
import { BreadcrumbModule } from 'primeng/breadcrumb';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppMarkenxAssignmentsComponent } from './view/app-markenx-assignments/app-markenx-assignments.component';
import { AppMarkenxLessonsComponent } from './view/app-markenx-lessons/app-markenx-lessons.component';

import { MarkenxComponentsModule } from '@chrisjmora/markenx-dxp-components';

@NgModule({
  declarations: [
    AppComponent,
    AppMarkenxAssignmentsComponent,
    AppMarkenxLessonsComponent,
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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
