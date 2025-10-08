import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppSidebarComponent } from '../markenx-sidebar.component';

@Component({
  selector: 'app-sidebar-option',
  templateUrl: './sidebar-option.component.html',
  styleUrls: ['./sidebar-option.component.scss'],
})
export class AppSidebarOptionComponent implements OnInit {
  //#region Inputs
  @Input()
  public sidebar!: AppSidebarComponent;
  @Input()
  public value!: string;
  @Input()
  public icon?: string;
  @Input()
  public isSelected: boolean = false;
  @Input()
  public isGroupOption: boolean = false;
  @Input()
  public items!: { value: string; icon: string }[];
  //#endregion

  public showOptions: boolean = false;

  public get hasItems(): boolean {
    return (this.items?.length ?? 0) > 0;
  }

  public ngOnInit(): void {
    this.sidebar.options.push(this);
  }

  public updateSelection(currentValue: string) {
    this.isSelected =
      this.value === currentValue || this.isChildSelected(currentValue);
  }

  private isChildSelected(currentValue: string): boolean {
    if (!this.items) return false;
    return this.items.some((item) => item.value === currentValue);
  }

  public onSelected() {
    this.sidebar.selectValue(this.value);
  }
}
