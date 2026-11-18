# chivos-api

API de **Bovigest**. "chivos" es el nombre interno y Bovigest el que ve la gente
(D-014). NestJS 12 con TypeScript.

La documentación del proyecto vive fuera del repo, en la carpeta que lo
contiene: `../SESIONES.md`, `../DECISIONES.md`, `../ARQUITECTURA.md`,
`../DESPLIEGUE.md`, `../MODELO_DATOS.md` y `../API.md`. Si existe, leerla antes
de cambiar la estructura. Las decisiones se citan por número (D-0XX).

@AGENTS.md

## Comandos

Todo con **pnpm**, nunca npm. La versión está fija en `packageManager`.

| Para | Comando |
|---|---|
| Instalar | `pnpm install` |
| Programar (se reinicia al guardar) | `docker compose up -d db` y `pnpm start:dev` |
| Probar todo como en el servidor | `docker compose up --build` |
| Pruebas | `pnpm test` (unitarias) y `pnpm test:e2e` (la API por HTTP) |
| Formato y revisión | `pnpm format` y `pnpm lint` |
| Compilar | `pnpm build` |
| Crear piezas | `pnpm exec nest generate module\|controller\|service <nombre>` |

Antes de cada commit: `pnpm format`, `pnpm lint` y `pnpm test`.

## Código

- Módulos ESM (D-019): los `import` propios terminan en `.js`
  (`'./health/health.module.js'`).
- TypeScript estricto.
- Un módulo por funcionalidad, en `src/<nombre>/`, como un addon de Odoo.
  `AppModule` solo junta módulos.
- El controlador recibe y contesta; la lógica va en servicios.
- Comentarios en español.

## Variables de entorno

| Variable | Para qué |
|---|---|
| `PORT` | Puerto. Si no está, 3000 |
| `NODE_ENV` | `production` dentro de Docker; lo pone el `Dockerfile` |
| `SWAGGER` | `true` enciende Swagger en `/docs`. Si no está, se enciende solo fuera de Docker (D-021) |
| `DATABASE_URL` | Conexión a Postgres. Todavía no se usa |

- **Laptop:** `docker-compose.yml`, con la API y Postgres 18 (base
  `chivos_local`, usuario y contraseña `chivos`, solo en `127.0.0.1`). Esa
  contraseña está en el repo a propósito: solo abre la base de la laptop.
- **Pruebas y producción:** pestaña *Environment* de cada app en Dokploy. Los
  secretos de verdad van ahí, nunca en el repo; `.env` está en `.gitignore`.

## Docker

- `Dockerfile` en dos etapas sobre `node:26-alpine`. Corre como el usuario
  `node`, con `HEALTHCHECK` a `/health`.
- `pnpm-workspace.yaml` va en el mismo `COPY` que `package.json`, antes del
  `pnpm install`: guarda el "no" al script de `@scarf/scarf`, que viene con
  Swagger. Sin ese archivo, `pnpm install` falla con `ERR_PNPM_IGNORED_BUILDS`
  y el build de Dokploy también. Toda dependencia nueva con script de
  instalación necesita su respuesta: `pnpm approve-builds '!paquete'` (no) o
  `'paquete'` (sí).
- No quitar `app.enableShutdownHooks()` de `main.ts`: sin eso, Node ignora la
  orden de apagarse y `docker stop` lo corta a la fuerza a los 10 s.
- El servidor es ARM: las imágenes se construyen allá, no en la laptop.

## Ramas y entregas (D-006)

- `main` es producción y `develop` es pruebas. Dokploy despliega solo cada push
  a su rama: `bovigest-api.datosystems.dev` y
  `bovigest-api-dev.datosystems.dev`.
- Cada cambio va en `feature/<nombre>`, sale de `develop` y entra a `develop`
  por pull request. A `main` solo llega `develop`, también por pull request.
- Entrega: subir `version` en `package.json` (semver: el del medio con funciones
  nuevas, el último con correcciones), pull request `develop` → `main` y
  etiqueta `vX.Y.Z` en el commit de `main`. Al integrar, no borrar `develop`.
- El remote usa el alias SSH `gitpersonal`
  (`git@gitpersonal:CSagasDev/chivos-api.git`), no `github.com` (D-020).
- `gh` usa la cuenta personal con `GH_CONFIG_DIR=~/.config/gh-personal`. Lo
  pone `../mise.toml` en las terminales con mise; en otro shell, a mano (D-022).
- En la web, los pull requests a `develop` se abren con
  `…/compare/develop...feature/<nombre>`: el botón de GitHub apunta a `main`.
