# 🛠️ Documento 03: Stack Tecnológico y Arquitectura de Software

## 🏗️ Arquitectura General

El sistema está construido bajo una arquitectura de capas desacopladas (**Frontend SPA + Backend API REST + Base de Datos Relacional**), optimizada para despliegues continuos en la nube.

```
┌─────────────────────────────────────────────────────────┐
│                    CAPA FRONTEND                        │
│  React 18 + Vite + Tailwind CSS / Variables CSS         │
│  (Desplegado en Vercel)                                 │
└────────────────────────────┬────────────────────────────┘
                             │
                     Peticiones HTTP (JSON API)
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│                    CAPA BACKEND                         │
│  Node.js + Express REST API                             │
│  (Desplegado en Railway)                                │
└────────────────────────────┬────────────────────────────┘
                             │
                      Driver pg / SQL
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│                 CAPA DE BASE DE DATOS                   │
│  PostgreSQL Relacional                                  │
│  (Instancia Administrada en Railway)                    │
└─────────────────────────────────────────────────────────┘
```

---

## 💻 Detalle del Stack Tecnológico

### 🎨 Frontend
* **Librería Core:** React 18
* **Build Tool:** Vite
* **Estilos:** Vanilla CSS / Tailwind CSS — Soporte completo para modo oscuro (*Luxury Dark Mode*) y claro (*Light Mode*) mediante Variables CSS.
* **Enrutamiento:** React Router DOM (v6).
* **Iconos:** Lucide React (`lucide-react`).
* **Peticiones HTTP:** Axios / Fetch API.
* **Hosting Frontend:** **Vercel**

### ⚙️ Backend
* **Entorno:** Node.js
* **Framework Web:** Express.js
* **Modelado y Consultas:** SQL nativo / ORM para PostgreSQL.
* **Hosting Backend:** **Railway**

### 🗄️ Base de Datos
* **Motor:** PostgreSQL
* **Justificación:** Garantiza integridad de datos, manejo de fechas/transacciones sin traslape y consultas estructuradas eficientes.
* **Hosting DB:** **Railway (PostgreSQL Plugin)**

---

## 📡 Definición de Endpoints Principales (API REST)

### 🟢 Servicios & Disponibilidad (Públicos)
```http
GET /api/servicios
GET /api/servicios/:id
GET /api/disponibilidad?fecha=YYYY-MM-DD&modalidad=local
```

### 🔵 Reservas (Clientes)
```http
POST /api/reservas
GET  /api/reservas/mi-cuenta (Requiere Auth)
```

### 🔴 Administración (Requiere Rol Admin)
```http
GET   /api/admin/dashboard/metricas
GET   /api/admin/reservas?estado=pendiente
PATCH /api/admin/reservas/:id/estado
POST  /api/admin/bloqueos
GET   /api/admin/clientes
GET   /api/admin/reportes/ingresos
```
