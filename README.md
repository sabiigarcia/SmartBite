# SmartBite — Integración con Jakarta EE + MySQL

## Descripción

Este proyecto es **smart-bite-modified** con la capa de datos migrada desde
`jsonplaceholder.typicode.com` a una base de datos MySQL real, siguiendo
exactamente la arquitectura del proyecto **jakartaee-docker-compose-project**.

---

## Estructura del proyecto

```
smart-bite-jakarta/
├── app/                         ← Next.js (sin cambios)
├── components/                  ← React (solo se modificaron los 3 fetch)
│   └── screens/
│       ├── login-screen.tsx     ← fetch → /api/usuarios?email=...
│       ├── recipes-screen.tsx   ← fetch → /api/recetas?_limit=4
│       └── results-screen.tsx   ← fetch → /api/ingredientes?_limit=7
│
├── backend/                     ← Backend Jakarta EE (nuevo, basado en jakarta-project)
│   ├── pom.xml
│   ├── Dockerfile
│   └── src/main/java/com/smartbite/
│       ├── model/
│       │   ├── ConexionBD.java      ← Igual que ConexionBD.java del proyecto base
│       │   ├── Usuario.java         ← Equivalente a Contacto.java
│       │   ├── UsuarioDAO.java      ← Equivalente a ContactoDAO.java
│       │   ├── Receta.java
│       │   ├── RecetaDAO.java
│       │   ├── Ingrediente.java
│       │   └── IngredienteDAO.java
│       └── controller/
│           └── SmartBiteServlet.java ← Equivalente a BuscarContactosServlet.java
│
├── mysql/
│   └── init/
│       └── 01-smartbite.sql     ← BD adaptada (antes bd1 → ahora smartbite_db)
│
├── docker-compose.yml           ← Adaptado del docker-compose.yml del proyecto base
└── Dockerfile.frontend          ← Nuevo (para Next.js)
```

---

## Correspondencia con el proyecto jakarta base

| Proyecto jakarta base           | SmartBite                         |
|---------------------------------|-----------------------------------|
| `bd1` (base de datos)           | `smartbite_db`                    |
| `contactos` (tabla)             | `usuarios`, `recetas`, `ingredientes` |
| `Contacto.java`                 | `Usuario.java`                    |
| `ContactoDAO.java`              | `UsuarioDAO.java`, `RecetaDAO.java`, `IngredienteDAO.java` |
| `ConexionBD.java`               | `ConexionBD.java` (sin cambios)   |
| `BuscarContactosServlet.java`   | `SmartBiteServlet.java`           |
| `mysql_bd1` (container)         | `mysql_smartbite`                 |

---

## Endpoints REST del backend

| Método   | Endpoint                          | Usado en                 |
|----------|-----------------------------------|--------------------------|
| GET      | `/api/usuarios?email=...`         | `login-screen.tsx`       |
| GET      | `/api/recetas?_limit=4`           | `recipes-screen.tsx`     |
| GET      | `/api/ingredientes?_limit=7`      | `results-screen.tsx`     |
| POST     | `/api/usuarios`                   | (disponible para registro) |
| DELETE   | `/api/usuarios?id=...`            | (disponible para admin)   |

---

## Cómo arrancar

```bash
# Arrancar todo con Docker Compose
docker-compose up --build

# Servicios disponibles:
#   Frontend Next.js  → http://localhost:3000
#   Backend Jakarta   → http://localhost:8080/smartbite-backend/api
#   phpMyAdmin        → http://localhost:8081
#   MySQL             → localhost:3307
```

### Variable de entorno

El frontend lee la URL del backend desde:
```
NEXT_PUBLIC_API_URL=http://localhost:8080/smartbite-backend/api
```

En desarrollo local (sin Docker), el valor por defecto es el mismo.

---

## Cambios realizados en el frontend

Solo se modificaron **3 archivos** de `components/screens/`, únicamente
la llamada `fetch()` en cada uno. La estructura de la app, los componentes
UI, el routing y el estado global permanecen **sin cambios**.

| Archivo              | Antes                                      | Después                        |
|----------------------|--------------------------------------------|--------------------------------|
| `login-screen.tsx`   | `jsonplaceholder.../users?email=...`        | `/api/usuarios?email=...`      |
| `recipes-screen.tsx` | `jsonplaceholder.../posts?_limit=4`         | `/api/recetas?_limit=4`        |
| `results-screen.tsx` | `jsonplaceholder.../todos?_limit=7`         | `/api/ingredientes?_limit=7`   |
