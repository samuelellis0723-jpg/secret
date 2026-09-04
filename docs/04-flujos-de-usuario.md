# 🔄 Documento 04: Flujos de Usuario y Ciclo de Vida de Reservas

## 🔄 Ciclo de Vida de una Cita (Estados)

Una reserva en **SECRET** pasa por diferentes estados desde su creación hasta su cierre:

```
           ┌──────────────┐
           │  PENDIENTE   │  (Solicitud realizada por la clienta)
           └──────┬───────┘
                  │
        ┌─────────┴─────────┐
        ▼                   ▼
┌──────────────┐    ┌──────────────┐
│  CONFIRMADA  │    │  CANCELADA   │
└──────┬───────┘    └──────────────┘
       │
       ▼
┌──────────────┐
│  COMPLETADA  │  (Servicio brindado e ingreso computado)
└──────────────┘
```

---

## 📅 1. Flujo de Solicitud de Reserva (Cliente)

```mermaid
sequenceDiagram
    autonumber
    actor Cliente
    participant FE as Frontend (React)
    participant BE as Backend (Express API)
    participant DB as PostgreSQL DB

    Cliente->>FE: Navega a /reservar
    FE->>BE: GET /api/servicios
    BE->>DB: Query catálogo activo
    DB-->>BE: Retorna lista de servicios
    BE-->>FE: Muestra catálogo a la clienta

    Cliente->>FE: Selecciona Tratamiento + Fecha + Hora
    FE->>BE: GET /api/disponibilidad?fecha=...
    BE->>DB: Verifica traslapes y bloqueos
    DB-->>BE: Retorna franjas libres
    BE-->>FE: Habilita horas disponibles

    Cliente->>FE: Completa formulario y confirma
    FE->>BE: POST /api/reservas (Estado: PENDIENTE)
    BE->>DB: Insert cita en BD
    DB-->>BE: ID de reserva generado
    BE-->>FE: Cita solicitada con éxito
    FE-->>Cliente: Pantalla de confirmación inicial
```

---

## ⚡ 2. Flujo de Aprobación y Gestión (Admin / Manicurista)

```mermaid
sequenceDiagram
    autonumber
    actor Admin as Manicurista (Admin)
    participant FE as Dashboard Admin
    participant BE as Backend API
    participant DB as PostgreSQL DB
    actor Cliente

    Admin->>FE: Inicia sesión e ingresa a /admin/dashboard
    FE->>BE: GET /api/admin/reservas?estado=pendiente
    BE->>DB: Query reservas pendientes
    DB-->>BE: Citas en espera de confirmación
    BE-->>FE: Renderiza Inbox Atelier

    alt Aceptar Cita
        Admin->>FE: Clic en "Confirmar Cita"
        FE->>BE: PATCH /api/admin/reservas/:id { estado: "CONFIRMADA" }
        BE->>DB: Update cita -> CONFIRMADA
        DB-->>BE: Confirmación registrada
        BE-->>FE: Actualiza vista y genera plantilla WhatsApp
        FE-->>Cliente: Mensaje/Notificación de cita confirmada
    else Rechazar Cita
        Admin->>FE: Clic en "Rechazar / Cancelar"
        FE->>BE: PATCH /api/admin/reservas/:id { estado: "CANCELADA" }
        BE->>DB: Update cita -> CANCELADA
        DB-->>BE: Horario liberado en agenda
        BE-->>FE: Notifica liberación del espacio
    end
```

---

## 🔒 3. Flujo de Bloqueo Manual de Agenda

Cuando la manicurista necesita tomar una pausa técnica, almuerzo o realizar mantenimiento de herramientas:

1. Ingresa a `/admin/calendario`.
2. Selecciona la opción **"Bloquear Turno"**.
3. Indica el motivo (*Almuerzo, Insumos, Personal*) y el rango de horas.
4. El sistema registra el bloqueo en la base de datos y deshabilita de inmediato esas horas en el portal público de reservas del cliente.
