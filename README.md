<div align="center">

# 🐄 Bovigest API

**El backend de Bovigest: el control de una finca ganadera, desde la parcela
hasta cada cabeza de ganado.**

[![versión](https://img.shields.io/github/v/tag/CSagasDev/chivos-api?label=versi%C3%B3n&color=2ea44f)](https://github.com/CSagasDev/chivos-api/tags)
[![producción](https://img.shields.io/website?url=https%3A%2F%2Fbovigest-api.datosystems.dev%2Fhealth&label=producci%C3%B3n&up_message=en%20l%C3%ADnea&down_message=ca%C3%ADda)](https://bovigest-api.datosystems.dev)

![NestJS](https://img.shields.io/badge/NestJS-12-E0234E?logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-26-5FA04E?logo=nodedotjs&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-12-F69220?logo=pnpm&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-18-4169E1?logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-listo-2496ED?logo=docker&logoColor=white)
![OpenAPI](https://img.shields.io/badge/OpenAPI-Swagger-85EA2D?logo=swagger&logoColor=black)

</div>

---

## ¿Qué es Bovigest?

Bovigest es una app para llevar el control de fincas ganaderas: el terreno
(fincas, parcelas, potreros), el ganado y su historia. Va a tener una versión
web y una app para Android, y las dos hablan con esta API.

Hoy el proyecto está en sus **cimientos**: la API ya corre en pruebas y en
producción, con HTTPS, despliegue automático y documentación interactiva. Las
funciones de la finca vienen encima de esto.

## Empezar

Necesitas **Node.js 26**, **pnpm 12** y **Docker**.

```bash
git clone https://github.com/CSagasDev/chivos-api.git
cd chivos-api
pnpm install

docker compose up -d db   # un PostgreSQL solo para tu laptop
pnpm start:dev            # la API, que se reinicia sola al guardar
```

Abre <http://localhost:3000>: te lleva a Swagger, donde puedes ver y probar
cada ruta.

¿Prefieres levantar todo como en el servidor? `docker compose up --build`
construye la imagen de la API y la arranca junto con la base.

---

<div align="center">

Hecho en Guatemala 🇬🇹 por **DATO Systems Group**

<sub>© 2026 DATO Systems Group. Todos los derechos reservados: el código se puede
ver, pero no es de uso libre.</sub>

</div>
