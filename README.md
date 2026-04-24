# Smartphones Store

SPA de una tienda de smartphones. Permite explorar el catálogo, buscar productos, ver el detalle de cada uno y añadirlos al carrito.

## Requisitos previos

- Node.js 18+
- npm 9+
- Acceso a la API REST (URL y clave de API)

## Instalación

```bash
npm install
```

Crea un fichero `.env.local` con las variables de entorno (ver `.env.example`):

```env
VITE_API_BASE_URL=https://...
VITE_API_KEY=tu-clave
```

## Scripts

```bash
npm run dev              # Servidor de desarrollo en http://localhost:5173
npm run build            # Comprobación de tipos + build de producción
npm run preview          # Previsualización del build de producción

npm run lint             # Comprueba formateo (Prettier) y linting (ESLint)
npm run format           # Corrige el formateo automáticamente

npm run test             # Todos los tests (unitarios + e2e)
npm run test:unit        # Tests unitarios (Vitest, una sola ejecución)
npm run test:unit:watch  # Tests unitarios en modo watch
npm run test:e2e         # Tests e2e (Playwright, arranca el dev server automáticamente)
```

## Arquitectura y estructura

Ver [docs/architecture.md](docs/architecture.md).

## Tecnologías

Ver [docs/technologies.md](docs/technologies.md).

## Estilo de código

Ver [docs/code-style.md](docs/code-style.md).

## Convenciones de commits

Ver [docs/commit-conventions.md](docs/commit-conventions.md).
