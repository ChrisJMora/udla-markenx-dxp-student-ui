import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { AppSidebarOptionComponent } from './sidebar-option/sidebar-option.component';

@Component({
  selector: 'app-markenx-sidebar',
  templateUrl: './markenx-sidebar.component.html',
  styleUrls: ['./markenx-sidebar.component.scss'],
})
export class AppSidebarComponent implements AfterViewInit {
  public options: Array<AppSidebarOptionComponent> = [];

  public value!: string;

  public gameModeOptions = [
    {
      value: 'Tutorial',
      icon: 'pi pi-eye',
    },
    {
      value: 'Normal',
      icon: 'pi pi-eye',
    },
  ];

  constructor(private cdr: ChangeDetectorRef) {};

  public ngAfterViewInit() {
    this.value = this.options[0].value;
    this.options.forEach((option) => {
      option.updateSelection(this.value);
    });
    this.cdr.detectChanges();
  }

  public selectValue(value: string) {
    this.value = value;
    this.options.forEach((option) => option.updateSelection(this.value));
  }
}
