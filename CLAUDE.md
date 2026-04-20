# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

SPA de una tienda de smartphones. Proyecto en fase inicial: la toolchain está configurada pero la arquitectura de la aplicación (estructura de carpetas, gestión de estado, obtención de datos, rutas) **está aún por definir** — ver [docs/architecture.md](docs/architecture.md).

El código de la aplicación se escribe **en inglés**. Los ficheros de `docs/` son la **única parte en español**.

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
- **Tests unitarios** (Vitest): entorno `jsdom`, `globals: true` (no hace falta importar `describe`/`it`/`expect`). Incluye `src/**/*.{test,spec}.{ts,tsx}`.
- **Tests e2e** (Playwright): `testDir: './e2e'` (la carpeta aún no existe), solo Chromium configurado. `webServer` arranca `npm run dev` automáticamente en `http://localhost:5173`.
- **Styling**: Sass disponible. `src/App.css` e `src/index.css` están en CSS plano (template por defecto).
- **Routing**: `react-router-dom` v7 instalado pero aún no integrado en `App.tsx`.

## Code style

Reglas detalladas en [docs/code-style.md](docs/code-style.md). Puntos clave:

- **Prettier controla el formato** (2 espacios, comillas simples, `;` obligatorio, `printWidth` 80, `trailingComma: "es5"`, `endOfLine: lf`). No añadir reglas de estilo visual a ESLint.
- **ESLint Flat Config** (`eslint.config.js`): presets `@eslint/js` + `typescript-eslint` recommended + `react-hooks` + `react-refresh/vite` + `eslint-config-prettier` al final. No es type-aware (no usa `recommendedTypeChecked`).
- **No reorganizar imports automáticamente**: `.vscode/settings.json` tiene `source.organizeImports: "never"` a propósito, para preservar side-effect imports. No activar auto-organize.

## Commit conventions

Convenciones en [docs/commit-conventions.md](docs/commit-conventions.md). Formato Conventional Commits:

```
type(scope): comment
```

Tipos permitidos: `feat`, `fix`, `docs`, `chore`, `refactor`, `build`, `ci`, `style`, `perf`, `test`. El `scope` es opcional. Los mensajes se escriben **en español**.
