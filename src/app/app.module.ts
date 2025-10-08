import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MarkenxHeaderComponent } from './markenx-header/markenx-header.component';
import { AppSidebarComponent } from './markenx-sidebar/markenx-sidebar.component';
import { AppSidebarOptionComponent } from './markenx-sidebar/sidebar-option/sidebar-option.component';

@NgModule({
  declarations: [
    AppComponent,
    MarkenxHeaderComponent,
    AppSidebarComponent,
    AppSidebarOptionComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ButtonModule,
    TableModule,
    MenuModule,
    PanelModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
