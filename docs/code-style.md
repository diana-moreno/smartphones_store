# Estilo de código

## Formateo

**Prettier** controla todo el formato visual. La configuración está en `.prettierrc`: 2 espacios, comillas simples, punto y coma, ancho máximo 80, trailing comma ES5, LF.

Ejecuta `npm run format` para aplicarlo o `npm run lint` para verificar.

No añadas reglas de estilo a ESLint — Prettier y ESLint no deben solaparse.

## Linting

**ESLint** con Flat Config. Presets: `@eslint/js` + `typescript-eslint` recommended + `react-hooks` + `react-refresh`. Sin type-aware linting.

## Comentarios

Por defecto, sin comentarios. Solo cuando el _por qué_ no es obvio: una restricción oculta, un workaround, un comportamiento sorprendente. No describas lo que hace el código — los nombres ya lo hacen.

## Imports

Los imports entre slices van a través del barrel (`index.ts`) del slice de destino. Los imports dentro del mismo slice usan rutas relativas directas.

## Editor

`.vscode/settings.json` configura Prettier como formateador por defecto y aplica ESLint al guardar. `source.organizeImports` está desactivado para no eliminar imports con side effects.
