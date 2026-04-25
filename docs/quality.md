# Calidad de código

## Accesibilidad

La interfaz es navegable íntegramente con teclado y compatible con lectores de pantalla. Los elementos interactivos tienen nombres descriptivos, la estructura de html se han creado teniendo en cuenta su propia semántica y la jerarquía de encabezados es coherente en todas las páginas.

## Testing

La estrategia separa claramente qué corresponde a cada nivel:

- **Unitarios** (Vitest + Testing Library): verifican que cada componente funciona correctamente de forma aislada. Viven junto al fichero que testean siguiendo el principio de colocalización.
- **E2e** (Playwright): simulan flujos reales de usuario navegando entre páginas contra la API real. No repiten lo que ya cubren los unitarios.

## Rendimiento

- **Debounce**: la búsqueda aplica un debounce de 300ms para no disparar peticiones en cada pulsación de teclado.
- **AbortController**: cada petición a la API se cancela automáticamente si el componente se desmonta o si llega una nueva búsqueda antes de que termine la anterior.
- **SVGs**: los iconos SVG se optimizaron con SVGOMG antes de añadirlos al proyecto para eliminar metadatos y atributos innecesarios.
- **Build**: Vite genera el bundle de producción con los assets concatenados y minimizados.

## Principios de diseño

- **KISS**: la solución más simple que funcione. Sin abstracciones prematuras ni código defensivo para casos que no ocurren.
- **Single Responsibility**: cada pieza tiene una sola razón para cambiar. Las páginas no tienen lógica, los widgets componen sin saber de rutas, los slices de `entities` no conocen las features que los usan.
- **Colocation**: cada fichero vive junto a lo que le da sentido. Tests al lado del componente que testean, estilos al lado del componente que los usa.
- **DRY**: no repetir lógica ni setup. El cliente HTTP centraliza el fetch y los headers; `renderWithProviders` centraliza el contexto de tests. Los componentes reutilizables se extraen en un shared.

---

[← Volver al README](../README.md)
