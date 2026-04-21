# Tecnologías

## Core

| Tecnología                                    | Versión | Propósito                                     |
| --------------------------------------------- | ------- | --------------------------------------------- |
| [React](https://react.dev/)                   | 19      | Framework de UI                               |
| [TypeScript](https://www.typescriptlang.org/) | 6       | Tipado estático                               |
| [Vite](https://vite.dev/)                     | 8       | Herramienta de build y servidor de desarrollo |
| [React Router](https://reactrouter.com/)      | 7       | Enrutado en cliente                           |
| [Sass](https://sass-lang.com/)                | 1       | Preprocesador de CSS                          |

## Testing

| Tecnología                            | Propósito                        |
| ------------------------------------- | -------------------------------- |
| [Vitest](https://vitest.dev/)         | Tests unitarios e de integración |
| [Playwright](https://playwright.dev/) | Tests end-to-end                 |

## Linting y formateo

| Tecnología                       | Propósito                   |
| -------------------------------- | --------------------------- |
| [ESLint](https://eslint.org/)    | Análisis estático de código |
| [Prettier](https://prettier.io/) | Formateo de código          |

## Scripts

```bash
npm run dev              # Inicia el servidor de desarrollo
npm run build            # Comprobación de tipos + build de producción
npm run lint             # Comprueba formateo y linting
npm run format           # Corrige el formateo automáticamente
npm run test             # Ejecuta todos los tests (unitarios + e2e)
npm run test:unit        # Ejecuta los tests unitarios una vez
npm run test:unit:watch  # Ejecuta los tests unitarios en modo watch
npm run test:e2e         # Ejecuta los tests e2e
```

## Variables de entorno

Las variables se definen en `.env.local` (no commiteado). Usa `.env.example` como plantilla:

| Variable            | Descripción                                             |
| ------------------- | ------------------------------------------------------- |
| `VITE_API_BASE_URL` | URL base de la API REST de móviles                      |
| `VITE_API_KEY`      | Clave enviada en el header `x-api-key` de cada petición |

Nota: Vite inlinea las variables `VITE_*` en el bundle del cliente en build-time, por lo que son visibles en el JavaScript descargado. Esto es inherente a las SPA sin backend proxy.
