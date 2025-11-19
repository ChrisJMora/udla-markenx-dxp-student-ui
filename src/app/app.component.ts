import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppMarkenxMenuItem } from '@chrisjmora/markenx-dxp-components';
import { AuthService } from './core/auth/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public title = 'udla-markenx-dxp-student-ui';
  public isAuthenticated$: Observable<boolean>;

  public menuItems: AppMarkenxMenuItem[] = [
    {
      value: 'dashboard',
      label: 'Inicio',
      icon: 'pi pi-home',
      route: '/dashboard',
    },
    {
      value: 'assignments',
      label: 'Tareas',
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

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.isAuthenticated$ = this.authService.authStatus$;
  }

  ngOnInit(): void {
    // Verificar autenticación al iniciar
    const currentUrl = this.router.url;
    if (!this.authService.isAuthenticated()) {
      if (currentUrl !== '/login' && currentUrl !== '/') {
        this.router.navigate(['/login']);
      }
    }
  }
}
