# Inicio Rápido - Sistema de Autenticación MarkenX Student

## Requisitos Previos

Antes de comenzar, asegúrate de tener corriendo:

1. **Keycloak**: `http://localhost:8090`
   - Realm: `markenx`
   - Client: `markenx-student-web`

2. **MarkenX Backend**: `http://localhost:8082`
   - Servicio Spring Boot con API REST

## Instalación

```bash
cd udla-markenx-dxp-student-ui
npm install
```

## Iniciar la Aplicación

```bash
npm start
```

La aplicación estará disponible en: `http://localhost:4200`

## Primer Uso

1. **Navega a** `http://localhost:4200`
   - Serás redirigido automáticamente a `/login`

2. **Ingresa tus credenciales**:
   - Email: `estudiante@udla.edu.ec` (debe ser un estudiante registrado)
   - Contraseña: La contraseña del estudiante en Keycloak

3. **Tras login exitoso**:
   - Verás el Dashboard con tu información
   - Información del curso en el que estás inscrito
   - Lista de tareas asignadas

## Estructura de Navegación

```
/login              → Pantalla de inicio de sesión
/dashboard          → Dashboard principal (requiere login)
/assignments        → Lista de tareas (requiere login)
/lessons            → Evaluaciones (requiere login)
/game-mode/tutorial → Modo tutorial (requiere login)
/game-mode/normal   → Modo normal (requiere login)
/progress           → Mi progreso (requiere login)
```

## Credenciales de Prueba

Si necesitas crear un estudiante de prueba:

1. **Accede al Admin UI** (markenx-admin-ui)
2. **Inicia sesión como administrador**
3. **Crea un nuevo estudiante** con:
   - Email: `estudiante.prueba@udla.edu.ec`
   - Nombres y apellidos
   - Asignado a un curso

El sistema creará automáticamente el usuario en Keycloak con:
- Username: el email ingresado
- Password temporal: se genera automáticamente

## Funcionalidades Implementadas

### ✅ Login
- Formulario de autenticación
- Validación de campos
- Manejo de errores
- Redirección automática

### ✅ Dashboard
- **Perfil del estudiante**:
  - Nombre completo
  - Email institucional
  - Código de estudiante
  
- **Información del curso**:
  - Nombre del curso
  - Código
  - Créditos
  - Período académico
  
- **Tareas asignadas**:
  - Lista completa de tareas
  - Estado de cada tarea (Asignada, En Progreso, Enviada, Calificada)
  - Fechas de asignación y envío
  - Número máximo de intentos
  - Botón para ver detalles

### ✅ Protección de Rutas
- Todas las rutas excepto `/login` requieren autenticación
- Redirección automática al login si no hay sesión
- Preservación de URL de destino

### ✅ Gestión de Sesión
- Tokens JWT almacenados en localStorage
- Validación automática de expiración
- Logout manual disponible
- Interceptor HTTP que agrega token a todas las peticiones

## Troubleshooting

### No puedo hacer login
- **Verifica que Keycloak esté corriendo**: `http://localhost:8090`
- **Verifica las credenciales**: El usuario debe existir en Keycloak
- **Revisa la consola del navegador**: Busca errores de CORS o conexión

### No veo mi información en el dashboard
- **Verifica que el backend esté corriendo**: `http://localhost:8082`
- **Verifica que el estudiante tenga un curso asignado**
- **Revisa la consola del navegador**: Busca errores 404 o 401
- **Verifica el proxy**: `proxy.conf.json` debe apuntar a `http://localhost:8082`

### Token expirado
- El token expira según configuración de Keycloak (típicamente 5-30 min)
- Haz logout y vuelve a iniciar sesión
- La aplicación detecta tokens expirados y redirige al login automáticamente

### Errores de CORS
- Asegúrate de que el backend tenga CORS configurado para `http://localhost:4200`
- Verifica que el proxy esté funcionando correctamente

## API Endpoints Usados

```
# Autenticación
POST http://localhost:8090/realms/markenx/protocol/openid-connect/token

# Perfil del estudiante
GET http://localhost:8082/api/markenx/students/me

# Tareas del estudiante
GET http://localhost:8082/api/markenx/students/me/tasks

# Intentos de una tarea
GET http://localhost:8082/api/markenx/students/me/tasks/{taskId}/attempts
```

## Arquitectura de Componentes

```
src/app/
├── core/
│   ├── auth/
│   │   ├── guards/
│   │   │   └── auth.guard.ts              # Protección de rutas
│   │   ├── interceptors/
│   │   │   └── auth.interceptor.ts        # Agrega token a requests
│   │   ├── services/
│   │   │   └── auth.service.ts            # Lógica de autenticación
│   │   └── keycloak.config.ts             # Configuración Keycloak
│   └── services/
│       └── student.service.ts             # API del estudiante
├── features/
│   ├── auth/
│   │   └── login/                         # Componente de login
│   └── dashboard/                          # Dashboard principal
└── view/
    ├── app-markenx-tasks/                  # Tareas (existente)
    └── app-markenx-lessons/                # Lecciones (existente)
```

## Próximos Pasos

1. **Integrar tareas con el componente existente**: 
   - Conectar `AppMarkenxAssignmentsComponent` con `StudentService`
   
2. **Agregar vista de perfil editable**:
   - Permitir al estudiante actualizar su información

3. **Implementar envío de tareas**:
   - Form para subir archivos
   - Tracking de intentos

4. **Agregar notificaciones**:
   - Toast messages para feedback al usuario

## Soporte

Para más detalles técnicos, consulta: `AUTHENTICATION_SETUP.md`

## Scripts Disponibles

```bash
# Desarrollo
npm start

# Build producción
npm run build

# Tests
npm test

# Watch mode
npm run watch
```
