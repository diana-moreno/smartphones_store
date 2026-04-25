# Convenciones de commits

Seguimos [Conventional Commits](https://www.conventionalcommits.org/).

## Sintaxis

```
type(scope): comment
```

- **type**: obligatorio, uno de los valores indicados abajo
- **scope**: opcional, indica el módulo o contexto afectado
- **comment**: descripción breve y clara del cambio realizado, **en inglés**

## Tipos

| Tipo       | Cuándo usarlo                                                   |
| ---------- | --------------------------------------------------------------- |
| `feat`     | Nueva funcionalidad                                             |
| `fix`      | Corrección de errores                                           |
| `docs`     | Cambios en la documentación                                     |
| `chore`    | Tareas rutinarias o de mantenimiento                            |
| `refactor` | Cambios en el código que no afectan el comportamiento           |
| `build`    | Cambios que afectan al sistema de build o dependencias externas |
| `ci`       | Cambios en la configuración o scripts de integración continua   |
| `style`    | Cambios puramente estéticos que no afectan la lógica            |
| `perf`     | Mejoras de rendimiento o eficiencia en el código                |
| `test`     | Adición o corrección de tests                                   |

## Ejemplo

```bash
git commit -m "feat(users): implement login"
```

---

[← Volver al README](../README.md)
