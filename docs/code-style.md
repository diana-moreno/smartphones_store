# Estándares de Formateo y Calidad de Código

## 1. Propósito

Este documento define la configuración de **formateo y linting** del proyecto.
El objetivo es garantizar una **coherencia visual y funcional** del código, evitando conflictos entre herramientas.

---

## 2. Enfoque general

Se adopta una separación clara de responsabilidades entre herramientas:

| Herramienta  | Rol principal                                                  |
| ------------ | -------------------------------------------------------------- |
| **Prettier** | Formateo visual (indentación, comillas, saltos de línea, etc.) |
| **ESLint**   | Lógica de calidad, análisis estático                           |
| **VS Code**  | Integración automática de formateo y correcciones al guardar   |

Esta división garantiza un flujo de trabajo predecible, sin solapamientos ni reformatos inconsistentes.

---

## 3. Configuración de Prettier

Prettier actúa como **formateador principal** y se encarga de todos los aspectos visuales del código fuente.

### 3.1 Parámetros adoptados

- Comillas simples (`'`), punto y coma obligatorio y sangrado de **2 espacios** (tabsize 2).
- **Ancho máximo de línea:** 80 caracteres.
- **Saltos de línea tipo LF** (estilo UNIX), asegurando compatibilidad multiplataforma.
- **Trailing comma `es5`**: coma final en objetos y arrays multilínea.

**Configuración (`.prettierrc`):**

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "endOfLine": "lf"
}
```

### 3.2 Motivos

- Prettier ofrece un formateo rápido, coherente y agnóstico del lenguaje.
- Centralizar el formato visual evita conflictos con ESLint.
- La configuración es simple, mantenible y estándar en el ecosistema JavaScript/TypeScript.

---

## 4. Configuración de ESLint

ESLint se utiliza para el **análisis estático**, la **detección de errores comunes** y la **aplicación de buenas prácticas**.
El proyecto usa la **Flat Config** (nueva sintaxis de ESLint).

### 4.1 Características principales

- Basado en los presets oficiales de `@eslint/js` y `typescript-eslint`.
- Plugins `eslint-plugin-react-hooks` y `eslint-plugin-react-refresh` para ficheros `.tsx`.
- Inclusión de `eslint-config-prettier` al final para desactivar reglas que puedan solaparse con Prettier.

### 4.2 Motivos

- Configuración **mínima y extensible** como punto de partida.
- Evita conflictos entre reglas de estilo y formato visual.

---

## 5. Integración con VS Code

El entorno de desarrollo se configura para **ejecutar automáticamente Prettier y ESLint al guardar**.

### 5.1 Configuración aplicada (`.vscode/settings.json`)

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[javascript][typescript][javascriptreact][typescriptreact]": {
    "editor.formatOnSave": true
  },
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "never"
  }
}
```

### 5.2 Motivos

- Formateo y corrección automáticos sin intervención manual.
- Desactivación de `source.organizeImports` para evitar eliminación de imports con side effects.
- Flujo de trabajo más ágil y predecible, sin pasos adicionales antes del commit.

---

## 6. Principios de mantenimiento

1. **Prettier controla el formato.**
   ESLint nunca debe incluir reglas de estilo visual.
2. **ESLint gestiona la calidad.**
   La base define lo esencial; se amplía según el contexto del proyecto.
3. **VS Code automatiza el flujo.**
   No se requieren pasos manuales para formatear o corregir.
4. **Sin formateos destructivos.**
   Se evita cualquier herramienta que elimine código o imports no referenciados.
