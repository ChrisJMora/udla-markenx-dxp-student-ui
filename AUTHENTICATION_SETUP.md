# Sistema de Autenticación - MarkenX Student UI

## Resumen

Se ha implementado un sistema completo de autenticación para el proyecto `udla-markenx-dxp-student-ui` basado en Keycloak, incluyendo:

- ✅ Pantalla de login con validación de formularios
- ✅ Servicio de autenticación (AuthService)
- ✅ Servicio de estudiantes (StudentService)
- ✅ Interceptor HTTP para agregar tokens automáticamente
- ✅ Guard de autenticación para proteger rutas
- ✅ Dashboard con información del estudiante y sus tareas
- ✅ Integración con endpoints del backend MarkenX

## Archivos Creados

### 1. Core - Autenticación

#### `src/app/core/auth/keycloak.config.ts`
Configuración de conexión a Keycloak:
- URL del servidor: `http://localhost:8090`
- Realm: `markenx`
- Client ID: `markenx-student-web`

#### `src/app/core/auth/services/auth.service.ts`
Servicio de autenticación que maneja:
- Login con email/password
- Almacenamiento de tokens en localStorage
- Validación de tokens JWT
- Verificación de roles
- Refresh de tokens
- Logout

#### `src/app/core/auth/interceptors/auth.interceptor.ts`
Interceptor HTTP que:
- Agrega el token Bearer automáticamente a todas las peticiones
- Maneja errores 401 (no autorizado)
- Redirige al login cuando el token expira

#### `src/app/core/auth/guards/auth.guard.ts`
Guard que protege rutas que requieren autenticación:
- Verifica si el usuario está autenticado
- Redirige al login si no hay token válido
- Preserva la URL de retorno

### 2. Core - Servicios

#### `src/app/core/services/student.service.ts`
Servicio para interactuar con los endpoints del estudiante:
- `getCurrentStudentProfile()` - Obtiene perfil del estudiante con curso y período académico
- `getCurrentStudentTasks()` - Obtiene todas las tareas asignadas al estudiante
- `getCurrentStudentTaskAttempts(taskId)` - Obtiene los intentos de una tarea específica

### 3. Features - Login

#### `src/app/features/auth/login/login.component.ts`
Componente de login que:
- Muestra formulario con email y contraseña
- Valida campos (email válido, contraseña mínimo 6 caracteres)
- Maneja errores de autenticación
- Redirige a la página solicitada tras login exitoso

#### `src/app/features/auth/login/login.component.html`
Template del login con:
- Campos de email y contraseña
- Validaciones en tiempo real
- Mensajes de error
- Estado de carga
- Diseño responsive

#### `src/app/features/auth/login/login.component.css`
Estilos modernos para el login:
- Gradiente de fondo
- Tarjeta centrada con sombras
- Animaciones suaves
- Diseño mobile-first

### 4. Features - Dashboard

#### `src/app/features/dashboard/dashboard.component.ts`
Componente principal que:
- Carga perfil del estudiante autenticado
- Muestra información del curso y período académico
- Lista todas las tareas asignadas
- Permite navegar a los detalles de cada tarea
- Incluye botón de logout

#### `src/app/features/dashboard/dashboard.component.html`
Template del dashboard con:
- Header con botón de logout
- Tarjeta de perfil del estudiante
- Grid de tareas asignadas
- Estados de carga y error
- Diseño responsive

#### `src/app/features/dashboard/dashboard.component.css`
Estilos del dashboard:
- Layout moderno con cards
- Grid responsive de tareas
- Estados visuales por tipo de tarea
- Animaciones hover
- Mobile-friendly

## Endpoints del Backend Utilizados

El sistema consume los siguientes endpoints de `markenx-service`:

### Autenticación (Keycloak)
```
POST http://localhost:8090/realms/markenx/protocol/openid-connect/token
```

### Estudiantes
```
GET /api/markenx/students/me
GET /api/markenx/students/me/tasks
GET /api/markenx/students/me/tasks/{taskId}/attempts
```

## Configuración del Módulo

Se actualizó `app.module.ts` para incluir:
- `ReactiveFormsModule` - Para formularios reactivos
- `InputTextModule` - Campos de texto de PrimeNG
- `CardModule` - Tarjetas de PrimeNG
- Registro del `AuthInterceptor` como proveedor HTTP
- Declaración de componentes: `LoginComponent`, `DashboardComponent`

## Configuración de Rutas

Se actualizó `app-routing.module.ts`:

```typescript
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'assignments', component: AppAssignmentsComponent, canActivate: [AuthGuard] },
  { path: 'lessons', component: AppLessonsComponent, canActivate: [AuthGuard] },
  { path: 'game-mode', canActivate: [AuthGuard], children: [...] },
  { path: 'progress', component: AppLessonsComponent, canActivate: [AuthGuard] },
];
```

Todas las rutas excepto `/login` están protegidas con `AuthGuard`.

## Flujo de Autenticación

1. **Usuario no autenticado**: Se redirige automáticamente a `/login`
2. **Login exitoso**: 
   - Se obtiene token de Keycloak
   - Se guarda en localStorage
   - Se redirige al dashboard
3. **Navegación protegida**: El interceptor agrega el token a cada petición
4. **Token expirado**: Se detecta automáticamente y se redirige al login
5. **Logout**: Se limpian tokens y se redirige al login

## Modelos de Datos

### StudentWithCourseResponse
```typescript
{
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  identityNumber: string;
  studentCode: string;
  status: string;
  course: {
    id: string;
    name: string;
    code: string;
    credits: number;
    academicTerm: {
      id: string;
      name: string;
      startDate: string;
      endDate: string;
    }
  }
}
```

### StudentTaskResponse
```typescript
{
  id: string;
  assignedAt: string;
  submittedAt: string | null;
  status: string; // ASSIGNED | IN_PROGRESS | SUBMITTED | GRADED
  task: {
    id: string;
    title: string;
    description: string;
    maxAttempts: number;
  }
}
```

## Configuración Requerida

### 1. Keycloak
Asegúrate de que Keycloak esté corriendo en `http://localhost:8090` con:
- Realm: `markenx`
- Client: `markenx-student-web` (configurado para public client)

### 2. Backend
El servicio MarkenX debe estar corriendo y accesible a través del proxy configurado en `proxy.conf.json`.

### 3. Variables de Entorno
Actualiza `src/app/core/auth/keycloak.config.ts` si tu entorno usa URLs diferentes:
```typescript
export const KEYCLOAK_CONFIG = {
  url: 'http://localhost:8090', // URL de Keycloak
  realm: 'markenx',
  clientId: 'markenx-student-web'
};
```

## Cómo Probar

1. **Iniciar el proyecto**:
   ```bash
   cd udla-markenx-dxp-student-ui
   npm install
   npm start
   ```

2. **Navegar a**: `http://localhost:4200`

3. **Credenciales de prueba**: Usa un estudiante creado en el sistema MarkenX con email `@udla.edu.ec`

4. **Flujo de prueba**:
   - Acceder a cualquier ruta → Redirige a `/login`
   - Ingresar credenciales → Login exitoso
   - Ver dashboard con información del estudiante
   - Ver tareas asignadas
   - Navegar a otras rutas protegidas
   - Hacer logout

## Características Implementadas

✅ **Autenticación con Keycloak**
- Login con email/password
- Tokens JWT
- Refresh automático (lógica preparada)

✅ **Protección de Rutas**
- Guard que verifica autenticación
- Redireccionamiento automático

✅ **Interceptor HTTP**
- Token Bearer automático
- Manejo de errores 401

✅ **Dashboard del Estudiante**
- Información personal
- Datos del curso
- Lista de tareas asignadas
- Estados visuales de tareas

✅ **Diseño Responsive**
- Mobile-first
- Adaptable a diferentes pantallas

✅ **Experiencia de Usuario**
- Estados de carga
- Manejo de errores
- Validaciones en tiempo real
- Animaciones suaves

## Próximos Pasos Recomendados

1. **Integrar con componentes existentes**: Actualizar `AppMarkenxAssignmentsComponent` para usar las tareas del dashboard
2. **Agregar notificaciones**: Usar ToastModule de PrimeNG para mensajes de éxito/error
3. **Implementar refresh token automático**: Renovar token antes de que expire
4. **Agregar perfil de usuario**: Página para editar información personal
5. **Implementar envío de tareas**: Permitir al estudiante subir sus trabajos
6. **Historial de intentos**: Vista detallada de intentos por tarea

## Notas Técnicas

- El token se almacena en `localStorage` bajo la clave `access_token`
- Los tokens expiran según la configuración de Keycloak (típicamente 5-30 minutos)
- El AuthGuard verifica tanto la existencia como la validez del token
- Todos los componentes protegidos deben estar bajo rutas con `canActivate: [AuthGuard]`
- El interceptor se aplica automáticamente a todas las peticiones HTTP excepto las de Keycloak

## Compatibilidad

- Angular 15
- PrimeNG 15.4.1
- TypeScript 4.8.2
- Compatible con la arquitectura existente de MarkenX
