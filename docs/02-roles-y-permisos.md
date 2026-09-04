# 👥 Documento 02: Roles de Usuario y Matriz de Permisos

## 🔐 Definición de Roles

La plataforma contempla tres roles principales con distintos grados de interacción y privilegios:

```
[ Visitante (Sin Login) ] ───► [ Clienta Registrada (Con Login) ] ───► [ Manicurista / Admin ]
```

---

## 1. 🌐 Cliente Sin Login (Visitante)

Persona que accede al sitio público para consultar servicios o agendar por primera vez.

### Funcionalidades:
* **Explorar Catálogo:** Visualización del menú de tratamientos con precios (en ₡ CRC), descripciones y duración aproximada.
* **Consultar Disponibilidad:** Ver los días y horas disponibles según la modalidad deseada.
* **Solicitar Reserva:** Completar el formulario de reserva ingresando nombre, teléfono, correo y notas de preferencia.

---

## 2. 👤 Cliente Con Login (Clienta Registrada)

Clienta frecuente que cuenta con cuenta activa en la plataforma.

### Funcionalidades:
* **Todas las funciones del cliente sin login.**
* **Mi Cuenta (`/mi-cuenta`):** Panel privado para ver sus citas próximas y pasadas.
* **Gestión de Perfil:** Guardado de direcciones para servicios a domicilio y números de contacto.
* **Re-reserva en 1 Clic:** Proceso de reserva acelerado con datos autocompletados.

---

## 3. 👑 Manicurista / Administración (*Secret Management Privé*)

Administradora del atelier y personal técnico encargado de la atención.

### Funcionalidades:
* **Dashboard Ejecutivo (`/admin/dashboard`):**
  * Resumen de ingresos acumulados y estimados del día.
  * Conteo de citas activas, confirmadas y pendientes.
  * Barra de próximo espacio libre para descansos o desinfección.
  * Bandeja **Inbox Atelier** para aceptar o rechazar citas en tiempo real.

* **Gestión de Reservas (`/admin/reservas`):**
  * Tabla interactiva con filtros por estado (`Pendiente`, `Confirmada`, `Completada`, `Cancelada`).
  * Modal con plantillas de WhatsApp listas para enviar confirmación o recordatorio directo a la clienta.

* **Calendario & Interrupciones (`/admin/calendario`):**
  * Vista semanal y mensual interactiva.
  * Creación de bloqueos de horario por almuerzo, compras de insumos o imprevistos personales.

* **Directorio de Clientes (`/admin/clientes`):**
  * Búsqueda avanzada por nombre, teléfono o correo.
  * Etiquetas de categorización: `VIP`, `Cliente Frecuente`, `Primera Visita`.
  * Registro de preferencias técnicas (ej: *Uñas acrílicas esculpidas, tono baby boomer*).

* **Reportes & Analítica (`/admin/reportes`):**
  * Gráficos de servicios más solicitados.
  * Métricas de demanda según días de la semana y horas pico.
  * Exportación de cierres de caja en formato CSV.

* **Ajustes del Atelier (`/admin/configuracion`):**
  * Edición de precios y duraciones del catálogo de servicios.
  * Configuración de horarios operativos del atelier.

---

## 📊 Matriz Comparativa de Permisos

| Módulo / Acción | Cliente Sin Login | Cliente Con Login | Admin / Manicurista |
| :--- | :---: | :---: | :---: |
| Ver Catálogo de Servicios | ✅ | ✅ | ✅ |
| Consultar Disponibilidad | ✅ | ✅ | ✅ |
| Crear Solicitud de Cita | ✅ | ✅ | ✅ |
| Ver Historial Propio | ❌ | ✅ | ✅ |
| Editar Perfil Propio | ❌ | ✅ | ✅ |
| Aceptar / Rechazar Citas | ❌ | ❌ | ✅ |
| Bloquear Horarios en Agenda | ❌ | ❌ | ✅ |
| Ver Métricas e Ingresos | ❌ | ❌ | ✅ |
| Editar Catálogo y Precios | ❌ | ❌ | ✅ |
