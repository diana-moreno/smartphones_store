# Smartphones Store

SPA de una tienda de smartphones construida con React 19, TypeScript y Vite. Permite explorar el catálogo, buscar productos, ver el detalle de cada uno, seleccionar color y almacenamiento, añadirlos al carrito y eliminarlos.

**Demo**: [smartphones-store.netlify.app](https://smartphones-store.netlify.app)

## Puesta en marcha

### Requisitos

- Node.js 18+
- Acceso a la API REST (URL y clave)

### Instalación

```bash
npm install
```

Crea un fichero `.env.local` en el root (usa `.env.example` como plantilla):

```env
VITE_API_BASE_URL=https://...
VITE_API_KEY=tu-clave
```

```bash
npm run dev   # http://localhost:5173
```

## Scripts

```bash
npm run dev              # Servidor de desarrollo
npm run build            # Build de producción (tsc + vite)
npm run lint             # Prettier + ESLint
npm run format           # Corrige el formateo
npm run test             # Todos los tests (unitarios + e2e)
npm run test:unit        # Tests unitarios (Vitest)
npm run test:unit:watch  # Tests unitarios en modo watch
npm run test:e2e         # Tests e2e (Playwright)
```

## Documentación

- [Arquitectura](docs/architecture.md) — Feature-Sliced Design, estructura de carpetas, rutas, estado, tests y accesibilidad
- [Tecnologías](docs/technologies.md) — stack completo con versiones
- [Estilo de código](docs/code-style.md) — formateo, linting, configuración del editor y pre-commit
- [Convenciones de commits](docs/commit-conventions.md) — formato y tipos permitidos

## Notas y decisiones

- **Arquitectura FSD**: Feature-Sliced Design va más allá de lo que este proyecto requiere, pero la elección ha sido consciente: el proyecto ha servido como contexto real para aprenderla en profundidad. Es una arquitectura pensada para proyectos grandes, equipos, ideal ecommerce grandes.

  _Ventajas_: separación clara de responsabilidades, límites explícitos entre capas, fácil de escalar y de incorporar nuevos desarrolladores, cada pieza tiene un lugar predecible, su mantenimiento es más fácil y es mas dificil que queden componentes colgados sin utilizar o se dupliquen.

  _Desventajas_: overkill para proyectos pequeños, más ficheros y carpetas de los necesarios, y los barrels (`index.ts`) introducen una penalización de rendimiento en el proceso de resolución de módulos. En proyectos de esta escala no es perceptible, pero en proyectos mayores es mejor mirar alternativas.

- **Manejo de errores y página 404**: no eran requisitos del proyecto, pero se han añadido porque forman parte de una experiencia de usuario mínimamente completa. La app distingue entre errores de la API (producto no encontrado, error de permisos) y rutas desconocidas, y los gestiona de forma diferenciada.

- **Limitación observada en la API**: los parámetros `limit` y `offset` no son compatibles entre sí — cuando se usa `offset`, el `limit` se ignora, sería algo bueno para documentar en Swagger.

- **Carrito simplificado**: el carrito guarda un snapshot completo de cada producto en `localStorage`. Es una solución sencilla y suficiente para el alcance del proyecto. En una versión más completa, lo ideal sería contrastar los datos del carrito con el backend en cada sesión para detectar cambios de precio o productos descatalogados y avisar al usuario.

- **Diseño pixel-perfect**: el diseño se ha seguido pixel perfecto, con una excepción: las imágenes de producto que sirve la API no están recortadas de forma consistente — algunas incluyen espacios y otras no, lo que hace que no tengan el mismo tamaño al renderizarse y en algunos casos el efecto de cortina negro no funciona correctamente. La solución ideal viene desde el backend, que es quien debe servir imágenes con dimensiones homogéneas. Recortarlas en el frontend con Canvas sería posible pero aumentaría considerablemente los tiempos de carga.

- **Uso de IA**: se ha utilizado IA como compañero de código y generador de documentación, no como sustituto. Todas las decisiones técnicas y de diseño han sido tomadas de forma consciente, definiendo el comportamiento del asistente a través del fichero [CLAUDE](/CLAUDE.md) y de la propia documentación del proyecto.
