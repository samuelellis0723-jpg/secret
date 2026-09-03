# 💅 Secret Nail Atelier — Secret Management Privé

Plataforma de gestión de lujo y reserva exclusiva para **Secret Nail Atelier**, diseñada para brindar un flujo operativo de alta precisión (*Haute Couture en Uñas*) tanto para clientas como para el equipo administrativo del atelier.

![Secret Management Privé](https://img.shields.io/badge/Secret%20Atelier-v2.0-832F46?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?style=for-the-badge&logo=vite)
![Status](https://img.shields.io/badge/Status-Active-4ADE80?style=for-the-badge)

---

## 🌟 Características Principales

### 📱 Portal Público y Clientas
- **Reserva de Citas en Línea (`/reservar`):** Wizard paso a paso para seleccionar servicios, fecha, hora y modalidad (Local Atelier o servicio Concierge a Domicilio).
- **Portal de Acceso (`/login` / `/registro`):** Autenticación y registro de clientas.
- **Panel de Clienta (`/mi-cuenta`):** Consulta de citas agendadas, historial de tratamientos pasados y gestión de perfil.

### 👑 Panel Administrativo (*Secret Management Privé*)
- **Dashboard Ejecutivo Hoy (`/admin/dashboard`):**
  - Métricas clave en tiempo real: Citas agendadas, solicitudes por validar, ingresos estimados en Colones (₡ CRC) y próximo bloque libre para desinfección/pausa técnica.
  - Cronograma diario en línea de tiempo interactiva con badges de estado (*En Curso, Completada, Próxima, Confirmada*).
  - Bandeja **Inbox Atelier** para aceptar o rechazar solicitudes entrantes de la Web o Bot de WhatsApp.
  - Accesos rápidos para citas manuales, bloqueo de turnos personales y exportación del cierre diario a CSV.
- **Gestión de Reservas & Solicitudes (`/admin/reservas`):**
  - Filtrado por estado (*Pendiente, Confirmada, Completada, Cancelada*) y modalidad (*Local / Domicilio*).
  - Panel lateral con ficha detallada de la reserva y modal de plantillas de WhatsApp para confirmación directa con la clienta.
- **Calendario & Disponibilidad (`/admin/calendario`):**
  - Vista mensual y semanal interactiva.
  - Bloqueo de turnos por mantenimiento, almuerzo o insumos con liberación de horario en un clic.
- **Directorio de Clientes (`/admin/clientes`):**
  - Búsqueda por nombre, teléfono o correo electrónico.
  - Historial completo de visitas, preferencias técnicas y badges de categoría (*VIP, Cliente Frecuente, Primera Visita*).
- **Reportes & Analítica (`/admin/reportes`):**
  - Gráficos de demanda por día de la semana, distribución Local vs Domicilio, top servicios más solicitados y franjas de horas pico.
  - Exportación de reportes ejecutivos en CSV e impresión del resumen contable.
- **Ajustes del Atelier (`/admin/configuracion`):**
  - Gestión en tiempo real del catálogo de tratamientos (edición de duraciones y precios en CRC).
  - Configuración de horarios operativos y dirección de la sede.

---

## 🖤 Modo Oscuro Privé (*Luxury Dark Theme*)

La plataforma incluye un sistema de temas dual con conmutación en tiempo real:
- **Modo Oscuro Privé (Por defecto):** Paleta inspirada en cristales borgoña, obsidiana nocturna (`#0E0D12` / `#191622`) y acentos en rosa rosé (`#F4A5BE` / `#832F46`).
- **Modo Claro:** Estilo minimalista en tonos marfil, lino y arena (`#FAF8F5`).
- **Selector de Tema Integrado:** Disponible en la barra superior (`AdminHeader`) mediante el icono **Sol ☀️ / Luna 🌙**.

---

## 🛠️ Herramientas Integradas en Encabezado (`AdminHeader`)

- 🔔 **Notificaciones en Tiempo Real:** Desplegable flotante con las últimas solicitudes pendientes y alertas del atelier, con confirmación o rechazo directo desde la notificación.
- 🔍 **Búsqueda Global (`Ctrl + K` / `Cmd + K`):** Command Palette interactivo para buscar clientas, reservas o navegar a cualquier sección del sistema al instante.
- 👤 **Ficha de Usuario:** Indicador de Directora de Atelier y Sede activa.

---

## 🚀 Tecnologías Utilizadas

- **Frontend:** React 18, Vite 8, React Router DOM v6
- **Iconografía:** Lucide React
- **Estilos:** CSS3 nativo con Variables CSS y motor de temas dual
- **Persistencia & Mock API:** REST client con fallback a datos locales (`adminService.js` / JSON-Server)

---

## 💻 Instalación y Ejecución Local

### 1. Clonar el repositorio e instalar dependencias
```bash
npm install
```

### 2. Iniciar el servidor de desarrollo Vite
```bash
npm run dev
```
Accede a la aplicación en: `http://localhost:5173`

### 3. Iniciar JSON-Server (Opcional para Mock Backend API)
```bash
npm run json-server
```

### 4. Compilar para Producción
```bash
npm run build
```

---

© **Secret Management Privé** • Protocolo de Reserva & Alta Costura en Uñas  
*Soporte Concierge: concierge@secretatelier.cr*
