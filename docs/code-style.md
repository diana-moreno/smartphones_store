## Estilo de código

- **Formateo**: Prettier formatea el código automáticamente para que siempre tenga el mismo aspecto, independientemente de quién lo escriba. Ejecuta `npm run format` para aplicarlo o `npm run lint` para verificar que todo está bien.
- **Linting**: ESLint analiza el código en busca de errores y malas prácticas antes de que lleguen a ejecutarse.
- **Editor**: El proyecto incluye configuración de VSCode que aplica el formateo y el linting al guardar, sin necesidad de configuración manual.
- **Pre-commit**: [Husky](https://www.npmjs.com/package/husky) ejecuta los tests unitarios automáticamente antes de cada commit. Si alguno falla, el commit se bloquea. Los tests e2e no se incluyen porque son demasiado lentos para correr en cada commit.
- **SVGs**: los iconos SVG se han optimizado con [SVGOMG](https://svgomg.net/) antes de añadirlos al proyecto para reducir su peso eliminando metadatos y atributos innecesarios.

---

[← Volver al README](../README.md)
