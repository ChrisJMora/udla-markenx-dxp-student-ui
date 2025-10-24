import { Component } from '@angular/core';
import { AppMarkenxMenuItem } from '@chrisjmora/markenx-dxp-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = 'udla-markenx-dxp-student-ui';

  public menuItems: AppMarkenxMenuItem[] = [
    {
      value: 'assignments',
      label: 'Asignaciones',
      icon: 'pi pi-file-edit',
      route: '/assignments',
    },
    {
      value: 'lessons',
      label: 'Evaluaciones',
      icon: 'pi pi-file-edit',
      route: '/lessons',
    },
    {
      value: 'game-mode',
      label: 'Modos de juego',
      icon: 'pi pi-bars',
      route: '/game-mode',
      subItems: [
        {
          value: 'tutorial',
          label: 'Tutorial',
          icon: 'pi pi-eye',
          route: '/game-mode/tutorial',
        },
        {
          value: 'normal',
          label: 'Normal',
          icon: 'pi pi-eye',
          route: '/game-mode/normal',
        },
      ],
    },
    {
      value: 'progress',
      label: 'Progreso',
      icon: 'pi pi-chart-line',
      route: '/progress',
    },
  ];
}
