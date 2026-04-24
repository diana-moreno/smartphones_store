# Arquitectura

SPA construida con React y TypeScript, organizada siguiendo **Feature-Sliced Design (FSD)**.

## Estructura de carpetas

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
├── features/                     # Acciones del usuario
│   ├── addToCart/
│   │   ├── ui/AddToCartButton/
│   │   └── index.ts
│   ├── removeFromCart/
│   │   ├── ui/RemoveFromCartButton/
│   │   └── index.ts
│   └── searchProducts/
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

## Capas y dependencias

Las capas solo pueden importar hacia abajo. Nunca al revés.

```text
app → pages → widgets → features → entities → shared
```

Cada slice expone un `index.ts` como única API pública. Los imports entre slices van siempre a través del barrel del slice de destino. Los imports dentro del mismo slice usan rutas relativas directas.

Cuando un nombre colisiona entre el tipo de modelo y el componente UI, el barrel usa un alias para distinguirlos (por ejemplo, `CartItem` el tipo y `CartItemComponent` el componente).

## Rutas

| Ruta            | Página               | Descripción                                        |
| --------------- | -------------------- | -------------------------------------------------- |
| `/`             | `ProductsListPage`   | Catálogo con buscador                              |
| `/products/:id` | `ProductDetailsPage` | Detalle, selección de opciones y añadir al carrito |
| `/cart`         | `CartPage`           | Carrito con resumen y eliminación de items         |
| `*`             | `NotFoundPage`       | Página 404                                         |

## Gestión de estado

Toda la gestión de estado se hace con React Context. No hay librería externa.

- **`CartProvider`** (`entities/cart`): almacena los items del carrito y expone `useCart`, que devuelve `items`, `count`, `totalPrice`, `addItem` y `removeItem`. Persiste en `localStorage` como snapshot completo en cada cambio.
- **`LoadingProvider`** (`app/loading`): controla una barra de progreso global en el layout. Los widgets que hacen fetch activan y desactivan el loading a través de `useLoading`.

## Obtención de datos

Los widgets hacen peticiones directas a la API REST con `fetch`. Cada llamada usa `AbortController` para cancelar peticiones obsoletas cuando el componente se desmonta o el término de búsqueda cambia antes de que llegue la respuesta.

`ProductGrid` aplica un debounce de 300ms sobre el buscador y realiza una segunda llamada con offset para deduplicar resultados cuando la API devuelve duplicados.

## Testing

La estrategia separa claramente qué corresponde a cada nivel:

- **Unitarios** (Vitest + Testing Library): cubren componentes con lógica propia. Los tests mockean las dependencias externas del componente y verifican comportamiento. Los componentes puramente display-only verifican que renderizan correctamente los datos recibidos por props. Los tests se colocalizan junto al fichero que testean.
- **E2e** (Playwright): cubren flujos completos que atraviesan varias páginas, providers y la API real. No duplican casos ya cubiertos por los unitarios.
