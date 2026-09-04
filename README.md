# 💅 SECRET — Gestor de Reservas para Manicura

> **Plataforma de alta precisión y gestión exclusiva (*Haute Couture en Uñas*) para la reserva, control operativo y administración de servicios de manicure.**

![Status](https://img.shields.io/badge/Status-Completed-4ADE80?style=for-the-badge)
![Frontend](https://img.shields.io/badge/Frontend-React%20%7C%20Tailwind-61DAFB?style=for-the-badge&logo=react)
![Backend](https://img.shields.io/badge/Backend-Node.js%20%7C%20PostgreSQL-339933?style=for-the-badge&logo=nodedotjs)
![Deploy](https://img.shields.io/badge/Deployment-Vercel%20%7C%20Railway-000000?style=for-the-badge&logo=vercel)

---

## 📄 Resumen Ejecutivo

**SECRET — Gestor de Reservas para Manicura** es una solución integral orientada a digitalizar, agilizar y elevar la experiencia de atención en estudios de manicure y atención personalizada a domicilio.

### 🎯 Problema que resuelve
1. **Solapamiento de Agendas y Choque de Citas:** Reemplaza los registros manuales desordenados en cuadernos o chats de mensajería por un motor de disponibilidad en tiempo real.
2. **Falta de Trazabilidad y Gestión de Clientes:** Elimina la pérdida de historial de tratamientos, preferencias de las clientas y registros de ingresos diarios.
3. **Pérdida de Tiempo Operativo:** Automatiza la recepción de solicitudes, permitiendo a la manicurista concentrarse en la atención técnica mientras la plataforma gestiona las reservas de sede (*Local Atelier*) y a domicilio (*Concierge*).

---

## 📁 Estructura de Documentación del Proyecto

Toda la documentación técnica y los entregables del laboratorio de *Vibe Coding* se encuentran estructurados en la carpeta [`docs/`](./docs/):

* 📑 [**01-resumen-y-plan.md**](./docs/01-resumen-y-plan.md): Plan general del proyecto y propuesta de valor.
* 👥 [**02-roles-y-permisos.md**](./docs/02-roles-y-permisos.md): Especificación de funcionalidades para Cliente Sin Login, Cliente Con Login y Admin/Manicurista.
* 🛠️ [**03-stack-y-arquitectura.md**](./docs/03-stack-y-arquitectura.md): Arquitectura de software, stack tecnológico (React, Node.js, PostgreSQL, Vercel, Railway) y API REST.
* 🔄 [**04-flujos-de-usuario.md**](./docs/04-flujos-de-usuario.md): Diagramas y paso a paso de los flujos de reserva y confirmación.
* 📝 [**05-bitacora-de-prompts.md**](./docs/05-bitacora-de-prompts.md): **Entregable 1** — Registro estructurado por fases del ciclo *Describe → Genera → Revisa → Prueba → Refina*.
* 🧠 [**06-documento-de-reflexion.md**](./docs/06-documento-de-reflexion.md): **Entregable 2** — Reflexión sobre tiempos, detección de errores de la IA, rol humano vs. IA y evolución del desarrollador.

---

## 👥 Roles de Usuario y Permisos

```
                  ┌─────────────────────────────────────────┐
                  │              ROLES SECRET               │
                  └────────────────────┬────────────────────┘
                                       │
         ┌─────────────────────────────┼─────────────────────────────┐
         ▼                             ▼                             ▼
┌──────────────────┐          ┌──────────────────┐          ┌──────────────────┐
│ Cliente Sin Login│          │ Cliente Con Login│          │Manicurista(Admin)│
└────────┬─────────┘          └────────┬─────────┘          └────────┬─────────┘
         │                             │                             │
         ├─ Ver Catálogo               ├─ Todo lo de Sin Login       ├─ Dashboard Hoy
         ├─ Consultar Horarios         ├─ Historial de Citas         ├─ Control Reservas
         └─ Iniciar Reserva            ├─ Gestión de Perfil          ├─ Bloqueo Agenda
                                       └─ Re-reserva Rápida          ├─ Base Clientes
                                                                     └─ Analítica/Ajustes
```

---

## 🛠️ Stack Tecnológico

```
[ Frontend: React + Tailwind ] ──── (HTTPS / JSON API) ────> [ Backend: Node.js + Express ]
             │                                                           │
       (Hosted on)                                                  (Hosted on)
             ▼                                                           ▼
         [ Vercel ]                                                [ Railway ]
                                                                         │
                                                                         ▼
                                                                [ PostgreSQL Database ]
```

---

## 🔄 Flujos Principales del Sistema

### 1. 📅 Flujo de Solicitud de Cita (Cliente)
1. **Selección de Servicio:** Elección de tratamientos del catálogo.
2. **Modalidad:** Sede Atelier o atención Concierge a Domicilio.
3. **Franja Horaria:** Selección de fecha y hora disponible.
4. **Datos de Contacto:** Ingreso de datos del cliente o login.
5. **Confirmación Inicial:** Envío de solicitud en estado **`Pendiente`**.

### 2. ⚡ Flujo de Confirmación (Admin / Manicurista)
1. **Notificación:** Recepción de solicitud en Inbox Atelier.
2. **Validación:** Verificación de tiempos y logística.
3. **Resolución:** Aprobación (**`Confirmada`**) o Ajuste con envío automático de plantilla por WhatsApp/Correo.
4. **Cierre:** Cambio a **`Completada`** al finalizar el servicio.

---

© **SECRET — Gestor de Reservas para Manicura**  
*Documentación técnica oficial.*
