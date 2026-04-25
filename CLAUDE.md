# CLAUDE.md

Este fichero proporciona orientación a Claude Code (claude.ai/code) cuando trabaja con este repositorio.

## Project overview

SPA de una tienda de smartphones construida con React, TypeScript y Vite, organizada siguiendo Feature-Sliced Design (FSD). Ver [docs/architecture.md](docs/architecture.md) para la arquitectura completa.

El código de la aplicación se escribe **en inglés**. Los ficheros de `docs/` y `CLAUDE.md` son la **única parte en español**.

## Commands

```bash
npm run dev              # Vite dev server (http://localhost:5173)
npm run build            # tsc -b && vite build
npm run preview          # Previsualizar build de producción

npm run lint             # prettier --check . && eslint .
npm run format           # prettier --write .

npm run test             # Unit + e2e (vitest run && playwright test)
npm run test:unit        # Vitest en modo run (una vez)
npm run test:unit:watch  # Vitest en modo watch
npm run test:e2e         # Playwright
```

Ejecutar un único test unitario:

```bash
npx vitest run src/path/to/file.test.ts
npx vitest run -t "nombre del test"
```

Ejecutar un único test e2e:

```bash
npx playwright test e2e/file.spec.ts
npx playwright test -g "nombre del test"
```

## Architecture

- **Build**: Vite 8 con `@vitejs/plugin-react` (usa Oxc). React Compiler **no** está habilitado.
- **TypeScript**: config con project references — `tsconfig.json` raíz referencia `tsconfig.app.json` (código de `src/`) y `tsconfig.node.json` (ficheros de config). `tsconfig.app.json` activa `noUnusedLocals`, `noUnusedParameters`, `erasableSyntaxOnly` y `verbatimModuleSyntax`.
- **Estructura**: Feature-Sliced Design — `app` → `pages` → `widgets` → `features` → `entities` → `shared`. Las capas solo importan hacia abajo, nunca al revés.
- **Routing**: React Router v7, configurado en `src/app/routes.tsx`. Rutas: `/`, `/products/:id`, `/cart`, `*` (404).
- **Estado**: React Context para el carrito (`CartProvider`) y loading global (`LoadingProvider`). Sin librería externa. El carrito persiste en `localStorage` como snapshot completo.
- **Tests unitarios** (Vitest): entorno `jsdom`, `globals: true`. Setup en `src/shared/test/test-setup.ts`. Helper `renderWithProviders` en `src/shared/test/renderWithProviders.tsx` — envuelve con `MemoryRouter`, `LoadingProvider` y `CartProvider`.
- **Tests e2e** (Playwright): carpeta `e2e/`, solo Chromium. `webServer` arranca `npm run dev` automáticamente. Los tests e2e cubren flujos completos entre páginas; los casos atómicos van en unitarios.
- **Styling**: CSS Modules + Sass. Un fichero de módulo por componente, colocalizados.

## Imports y exports

Cada slice expone un `index.ts` como única API pública. Las reglas son:

- **Entre slices**: importar siempre a través del barrel del slice de destino.

  ```ts
  import { ProductCard } from '../../../entities/product'; // ✅ barrel
  import { ProductCard } from '../../../entities/product/ui/ProductCard/ProductCard'; // ❌ ruta interna
  ```

- **Dentro del mismo slice**: rutas relativas directas, sin pasar por el barrel propio.

  ```ts
  import { useCart } from '../model/useCart'; // ✅ relativo directo
  ```

- **Tipos**: exportar con `export type` en el barrel. Importar con `import type` cuando solo se necesita el tipo.

- **Alias de nombre en el barrel**: cuando un nombre colisiona entre la entidad de modelo y el componente UI, usar alias en el barrel.

  ```ts
  export { CartItem as CartItemComponent } from './ui/CartItem'; // evita colisión con el tipo CartItem
  ```

## Principios de diseño

- **KISS** (Keep It Simple, Stupid): la solución más simple que funcione. Sin abstracciones prematuras, sin patrones por adelantado, sin código defensivo para casos que no ocurren.
- **Single Responsibility**: cada pieza tiene una sola razón para cambiar. Las páginas no tienen lógica, los widgets componen sin saber de rutas, los slices de `entities` no conocen las features que los usan.
- **Colocation**: cada fichero vive junto a lo que le da sentido. Tests al lado del componente que testean, estilos al lado del componente que los usa, assets dentro del slice que los necesita.
- **DRY**: no repetir lógica ni setup. El cliente HTTP centraliza el fetch y los headers; `renderWithProviders` centraliza el contexto de tests.

## Code style

Reglas detalladas en [docs/code-style.md](docs/code-style.md). Puntos clave:

- **Prettier controla el formato** (2 espacios, comillas simples, `;` obligatorio, `printWidth` 80, `trailingComma: "es5"`, `endOfLine: lf`). No añadir reglas de estilo visual a ESLint.
- **ESLint Flat Config** (`eslint.config.js`): presets `@eslint/js` + `typescript-eslint` recommended + `react-hooks` + `eslint-config-prettier` al final. No es type-aware (no usa `recommendedTypeChecked`).
- **No reorganizar imports automáticamente**: `.vscode/settings.json` tiene `source.organizeImports: "never"` a propósito, para preservar side-effect imports. No activar auto-organize.
- **Sin comentarios por defecto**: solo cuando el _por qué_ no es obvio. No describir lo que hace el código.

## Testing conventions

- Los tests unitarios se colocalizan junto al fichero que testean (`Component.test.tsx` al lado de `Component.tsx`).
- Los componentes con lógica se testean con mocks de sus dependencias externas. Los display-only verifican que renderizan los datos recibidos por props.
- Para fake timers con debounce: `vi.useFakeTimers()` + `await act(() => vi.advanceTimersByTimeAsync(N))`. Usar `fireEvent` en lugar de `userEvent` cuando los timers están congelados.
- Los tests e2e no duplican cobertura unitaria: solo flujos que atraviesan varias páginas, providers o la API real.

## Commit conventions

Convenciones en [docs/commit-conventions.md](docs/commit-conventions.md). Formato Conventional Commits:

```
type(scope): comment
```

Tipos permitidos: `feat`, `fix`, `docs`, `chore`, `refactor`, `build`, `ci`, `style`, `perf`, `test`. El `scope` es opcional. Los mensajes se escriben **en inglés**.
