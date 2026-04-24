# Arquitectura

SPA construida con React y TypeScript, organizada siguiendo **Feature-Sliced Design (FSD)**.

## Estructura de carpetas

```text
src/
├── app/          # Configuración global: rutas, layout, providers, estilos base
├── pages/        # Punto de entrada de cada ruta (componentes finos, sin lógica propia)
├── widgets/      # Bloques de UI completos y autocontenidos (Header, CartView, ProductDetails…)
├── features/     # Acciones del usuario (addToCart, removeFromCart, searchProducts)
├── entities/     # Modelos de dominio con su UI y lógica asociada (product, cart)
└── shared/       # Código genérico reutilizable sin dependencias de dominio (Button, cliente HTTP)
```

Las capas solo pueden importar hacia abajo: `app` → `pages` → `widgets` → `features` → `entities` → `shared`. Nunca al revés.

Cada slice expone un `index.ts` como API pública. Los imports entre slices siempre van a través del barrel; los imports dentro del mismo slice usan rutas relativas directas.

## Rutas

| Ruta | Página | Descripción |
| --- | --- | --- |
| `/` | `ProductsListPage` | Catálogo con buscador |
| `/products/:id` | `ProductDetailsPage` | Detalle, selección de opciones y añadir al carrito |
| `/cart` | `CartPage` | Carrito con resumen y eliminación de items |
| `*` | `NotFoundPage` | Página 404 |

## Gestión de estado

- **Carrito**: React Context (`CartProvider`) con persistencia en `localStorage`. El snapshot completo se guarda en cada cambio.
- **Loading global**: React Context (`LoadingProvider`) para mostrar la barra de progreso en el layout.
- No hay librería de estado externa.

## Obtención de datos

Peticiones directas a la API REST desde los widgets que las necesitan (`ProductGrid`, `ProductDetails`), usando `fetch` con `AbortController` para cancelar peticiones obsoletas. No hay capa de caché ni SWR/React Query.

`ProductGrid` implementa un debounce de 300ms sobre la búsqueda y una segunda llamada de paginación para deduplicar los resultados cuando la API devuelve duplicados con offset.

## Testing

- **Unitarios** (Vitest + Testing Library): componentes colocalizados junto a su fichero. Los componentes con lógica se testean con mocks de dependencias externas; los display-only verifican que renderizan los datos correctamente.
- **E2e** (Playwright): flujos completos de usuario contra el servidor de desarrollo con la API real.
