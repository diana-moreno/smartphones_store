# Arquitectura

SPA construida con React y TypeScript, organizada siguiendo **Feature-Sliced Design (FSD)**.

### Capas y dependencias

Las capas solo pueden importar hacia abajo. Nunca al revés.

```text
app → pages → widgets → features → entities → shared
```

Cada slice expone un `index.ts` barrel como única API pública. Los imports entre slices van siempre a través del barrel del slice de destino. Los imports dentro del mismo slice usan rutas relativas directas.

Cuando un nombre colisiona entre el tipo de modelo y el componente UI, el barrel usa un alias para distinguirlos (por ejemplo, `CartItem` el tipo y `CartItemComponent` el componente).

### Estructura de carpetas

```text
e2e/                              # Tests end-to-end (Playwright)
├── products-list.spec.ts         # Flujos de la página de catálogo
├── product-detail.spec.ts        # Flujos del detalle de producto
├── cart.spec.ts                  # Flujos del carrito
└── not-found.spec.ts             # Flujos de páginas de error

src/
├── app/                          # Configuración global
│   ├── Layout/                   # Layout raíz con barra de progreso
│   ├── loading/                  # Context y hook de loading global
│   ├── styles/                   # Estilos base (reset, tipografía, variables)
│   ├── routes.tsx                # Definición de rutas
│   └── main.tsx                  # Punto de entrada
│
├── pages/                        # Un fichero por ruta, sin lógica propia
│   ├── ProductsListPage.tsx
│   ├── ProductDetailsPage.tsx
│   ├── CartPage.tsx
│   └── NotFoundPage.tsx
│
├── widgets/                      # Bloques de UI completos y autocontenidos
│   ├── ui/
│   │   ├── Header/
│   │   ├── ProductGrid/          # Catálogo con buscador y paginación
│   │   ├── ProductDetails/       # Composición del detalle de producto
│   │   ├── ProductPurchasePanel/ # Selección de opciones y precio
│   │   ├── SimilarProducts/      # Carrusel de productos relacionados
│   │   ├── CartView/             # Vista completa del carrito
│   │   └── index.ts              # Barrel
│   └── assets/                   # Imágenes y SVGs del widget
│
├── features/                     # Acciones del usuario que modifican el estado
│   ├── addToCart/                # Añade un producto al carrito y redirige a /cart
│   │   ├── ui/AddToCartButton/
│   │   └── index.ts
│   ├── removeFromCart/           # Elimina un item del carrito
│   │   ├── ui/RemoveFromCartButton/
│   │   └── index.ts
│   └── searchProducts/           # Filtra el catálogo por nombre con debounce
│       ├── ui/SearchBar/
│       └── index.ts
│
├── entities/                     # Modelos de dominio con su UI y lógica
│   ├── product/
│   │   ├── api/                  # Llamadas a la API REST
│   │   ├── model/                # Tipos TypeScript
│   │   ├── ui/                   # ProductCard, ColorSelector, StorageSelector…
│   │   └── index.ts              # Barrel
│   └── cart/
│       ├── model/                # CartProvider, useCart, tipos
│       ├── ui/                   # CartItem
│       └── index.ts              # Barrel
│
└── shared/                       # Código genérico sin dependencias de dominio
    ├── api/                      # Cliente HTTP base
    ├── ui/                       # Button, OptionGroup
    └── test/                     # renderWithProviders, test-setup
```

## Rutas

| Ruta            | Descripción                                        |
| --------------- | -------------------------------------------------- |
| `/`             | Catálogo con buscador                              |
| `/products/:id` | Detalle, selección de opciones y añadir al carrito |
| `/cart`         | Carrito con resumen y eliminación de items         |
| `*`             | Página 404                                         |

## Estado y datos

- **Carrito**: React Context con persistencia en `localStorage`.
- **Loading**: React Context para la barra de progreso global.
- **Fetch**: peticiones directas con `fetch`.

## Tests

- **Unitarios** (Vitest + Testing Library): verifican que cada componente funciona correctamente de forma aislada. Viven junto al fichero que testean siguiendo el principio de colocalización.
- **E2e** (Playwright): simulan flujos reales de usuario navegando entre páginas contra la API real. No repiten lo que ya cubren los unitarios.

## Accesibilidad

La interfaz es navegable íntegramente con teclado y compatible con lectores de pantalla. Los elementos interactivos tienen nombres descriptivos, los elementos se han creado teniendo en cuenta su propia semántica y la jerarquía de encabezados es coherente en todas las páginas.

---

[← Volver al README](../README.md)
