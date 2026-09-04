# 🧠 Entregable 2: Documento de Reflexión — Desarrollo Vibe Coding

**Proyecto:** SECRET — Gestor de Reservas para Manicura  
**Autor:** Desarrollador / Estudiante de Laboratorio  
**Metodología:** Vibe Coding (*Describe → Genera → Revisa → Prueba → Refina*)

---

## 💬 Reflexión sobre el Proceso de Desarrollo

### 1. Estimación de Tiempos: ¿Sin IA vs. Con IA?
Desarrollar una plataforma completa como **SECRET** desde cero —incluyendo el maquetado responsive en React, la configuración de rutas, la base de datos relacional PostgreSQL, los endpoints REST en Node.js/Express, la lógica de validación de disponibilidad y el sistema de temas dual— me habría tomado aproximadamente **de 3 a 4 semanas de trabajo intensivo** trabajando de forma tradicional sin asistencia de Inteligencia Artificial.

Con la metodología *Vibe Coding* y la ayuda de la IA, el tiempo total se redujo drásticamente a **tan solo 2 a 3 días**. La IA eliminó casi todo el tiempo invertido en escribir código de infraestructura repetitivo (*boilerplate*), sintaxis de CSS y estructura inicial de componentes, permitiéndome avanzar a velocidad de diseño conceptual.

---

### 2. Detección de Errores de la IA: El Caso del Estado de las Citas
Un momento crítico donde la IA cometió un fallo relevante ocurrió durante la Fase 3, al implementar la actualización del estado de las citas en el **Inbox Atelier**. 

Al pedirle a la IA que implementara el botón para cambiar el estado de una cita de **`PENDIENTE`** a **`CONFIRMADA`**, el código generado funcionaba visualmente en la interfaz, pero tenía dos fallos graves en la lógica de negocio:
1. **Falta de Persistencia:** La función `handleStatusChange` actualizaba únicamente el estado local (`useState`) en el componente React de la pantalla actual, pero no ejecutaba la petición HTTP `PATCH` hacia el servidor backend en Express/PostgreSQL. Al recargar la página, la cita volvía a estar en estado `PENDIENTE`.
2. **Ausencia de Validación de Traslape:** Al confirmar una cita, la IA no comprobaba si el horario solicitado había sido ocupado o bloqueado por otra reserva aprobada minutos antes.

Me di cuenta de este error durante la etapa de **Prueba**, al abrir dos pestañas del navegador en paralelo (una como cliente y otra como administradora) y verificar que al confirmar la cita en el admin, la disponibilidad pública del calendario no se actualizaba ni se reflejaba en la base de datos. Tuve que intervenir manualmente para implementar la llamada a la API y agregar el middleware de comprobación de horarios.

---

### 3. Distribución del Trabajo: ¿Qué fue Humano y qué fue de la IA?

* **Trabajo Humano (Criterio, Arquitectura y Decisiones):**
  * **Definición de las reglas de negocio:** Establecer las necesidades reales del atelier (modalidades Local vs. Domicilio, estados de cita, tiempos de pausa técnica).
  * **Criterio estético y de experiencia de usuario:** Diseñar la identidad de marca (*Luxury Dark Theme*), seleccionar paletas de color y definir la jerarquía visual del panel de control.
  * **Auditoría y control de calidad:** Revisión de código generado, detección de *bugs* de concurrencia y validación del manejo de zonas horarias.
  * **Arquitectura:** Decidir el stack tecnológico (React, Tailwind, Express, PostgreSQL, Vercel, Railway).

* **Trabajo de la IA (Generación y Sintaxis):**
  * **Escritura de maquetado en JSX:** Generación rápida de tarjetas, modales, tablas y formularios.
  * **Creación de código base:** Estructura de routers en Express y sentencias `CREATE TABLE` / `INSERT INTO` en PostgreSQL.
  * **Generación de utilidades:** Funciones auxiliares para formateo de fechas y moneda (Colones ₡ CRC).

---

### 4. Transformación de la Visión del Desarrollador
Esta experiencia ha cambiado profundamente mi percepción sobre el rol de un desarrollador de software. Escribir líneas de código punto por punto ya no es el factor determinante ni la tarea principal. 

El desarrollador moderno se convierte en un **Arquitecto de Software, Director de Producto y Revisor Crítico**. El valor fundamental ya no reside en memorizar la sintaxis exacta de un lenguaje, sino en **saber hacer las preguntas correctas (Prompt Engineering)**, **comprender la arquitectura del sistema**, **definir buenas reglas de negocio** y **tener la capacidad analítica para auditar, probar y corregir** lo que produce la IA. La IA es un motor de ejecución ultrapotente, pero el timón y el criterio de calidad siempre pertenecen al desarrollador humano.
