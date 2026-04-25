# Arquitectura

SPA construida con React y TypeScript, organizada siguiendo [**Feature-Sliced Design (FSD)**](https://feature-sliced.design/).

## Capas, slices y segments

FSD organiza el código en tres niveles jerárquicos: **layer → slice → segment**.

- **Layers** (capas): la división de más alto nivel. Hay seis: `app`, `pages`, `widgets`, `features`, `entities`, `shared`. Las capas solo pueden importar hacia abajo, nunca al revés.

  ```text
  app → pages → widgets → features → entities → shared
  ```

- **Slices**: subdivisiones temáticas dentro de una capa. Cada slice agrupa todo lo relacionado con un concepto concreto (por ejemplo, `product` o `cart` dentro de `entities`, o `Header` y `ProductGrid` dentro de `widgets`). Cada slice es autocontenido: tiene su propia lógica, UI y tipos, y no conoce los slices que lo usan. Las capas `app` y `shared` no se subdividen en slices porque son técnicas y globales, no tienen concepto de negocio.

- **Segments**: la división interna de cada slice por tipo técnico. Los más comunes son `ui/` (componentes), `model/` (estado, tipos, lógica de dominio), `api/` (llamadas externas), `lib/` (utilidades) y `assets/` (imágenes, SVGs).

Cada slice expone un `index.ts` (barrel) como única API pública. Los imports entre slices van siempre a través del barrel del slice de destino. Los imports dentro del mismo slice usan rutas relativas directas.

Cuando un nombre colisiona entre el tipo de modelo y el componente UI, el barrel usa un alias para distinguirlos (por ejemplo, `CartItem` el tipo y `CartItemComponent` el componente).

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
│   ├── App.tsx                   # Componente raíz con providers y router
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
│   ├── Header/                   # Cabecera con logo, carrito y volver
│   │   ├── ui/                   # Header.tsx + estilos + test
│   │   ├── assets/               # logo, iconos de bolsa, flecha
│   │   └── index.ts              # Barrel del slice
│   ├── ProductGrid/              # Catálogo con buscador y paginación
│   │   ├── ui/
│   │   └── index.ts
│   ├── ProductDetails/           # Composición del detalle de producto
│   │   ├── ui/
│   │   └── index.ts
│   ├── ProductPurchasePanel/     # Selección de opciones y precio
│   │   ├── ui/
│   │   └── index.ts
│   ├── SimilarProducts/          # Carrusel de productos relacionados
│   │   ├── ui/
│   │   └── index.ts
│   └── CartView/                 # Vista completa del carrito
│       ├── ui/
│       └── index.ts
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

## Estilos globales

Los estilos base siguen el patrón [**ITCSS** Inverted Triangle CSS](https://developer.helpscout.com/seed/glossary/itcss/), que organiza el CSS de más genérico a más específico, siguiendo la forma de un triángulo invertido:

```text
styles/
├── 01.settings/   # Variables globales (colores, tipografía, espaciado)
├── 02.tools/      # Mixins y funciones Sass reutilizables
├── 03.generic/    # Reset y normalize — mínima especificidad
└── 04.elements/   # Estilos base para etiquetas HTML (h1, a, p…)
```

Cada capa tiene menos alcance y más especificidad que la anterior. Las reglas que afectan a todo el proyecto van arriba; las que afectan a elementos concretos, abajo. Los estilos específicos de componente viven en sus propios CSS Modules, fuera de esta jerarquía.

**Ventajas**:

- **Sin conflictos de especificidad**: al ordenar de menos a más específico, las reglas se sobreescriben de forma predecible y nunca se necesitan `!important`.
- **Fácil de mantener**: se sabe exactamente dónde buscar o añadir cada tipo de regla.
- **Escalable**: añadir nuevas capas o reglas no rompe lo existente.

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

---

[← Volver al README](../README.md)
