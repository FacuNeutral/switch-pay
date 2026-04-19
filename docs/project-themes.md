# Project Themes - SwitchPay

## Versión: 1.0.0

Este documento describe las temáticas generales que abarca el proyecto SwitchPay, basado en los requerimientos de negocio y la arquitectura implementada.

---

## 1. Seguridad (Security)

**Descripción:** Autenticación, autorización y protección de datos.

**Resumen:** Gestión integral de la autenticación, autorización y protección de datos sensibles de los usuarios y transacciones financieras.

**Alcance:**
- Autenticación multifactor (2FA/TOTP)
- Gestión de sesiones y tokens JWT
- Sistema de recuperación de cuentas
- Validaciones y pruebas de identidad (proofs)
- OAuth integration (Google)
- Blacklist para tokens y usuarios comprometidos
- Encriptación de datos en tránsito y reposo
- Control de acceso basado en roles

**Módulos relacionados:**
- `application/security/auth`
- `application/security/proofs`
- `application/security/recoveries`
- `shared/blacklist`

---

## 2. Gestión Bancaria (Banking)

**Descripción:** Sistema financiero de cuentas y transacciones.

**Resumen:** Core del sistema financiero que permite la gestión de cuentas, transacciones y saldos de beneficios laborales.

**Alcance:**
- Creación y administración de cuentas bancarias internas
- Procesamiento de transacciones (débitos, créditos, transferencias)
- Control de saldos y límites
- Historial de movimientos
- Conversión de beneficios en valor monetario
- Manejo de fondos asignados por la empresa

**Módulos relacionados:**
- `application/bank/accounts`
- `application/bank/transactions`

---

## 3. Gestión de Usuarios (User Management)

**Descripción:** Administración de usuarios, perfiles y sesiones.

**Resumen:** Administración del ciclo de vida completo de los usuarios, desde el registro hasta la configuración personalizada.

**Alcance:**
- Registro e incorporación de empleados (onboarding)
- Configuración inicial de cuenta (set-up)
- Gestión de perfiles y preferencias
- Administración de sesiones activas
- Control de usuarios por parte de RRHH
- Sincronización con sistemas corporativos

**Módulos relacionados:**
- `application/users/set-up`
- `application/users/sessions`
- `shared/user-manager`

---

## 4. Beneficios Laborales (Employee Benefits)

**Descripción:** Personalización y gestión de beneficios flexibles.

**Resumen:** Sistema para la gestión, personalización y consumo de beneficios laborales flexibles.

**Alcance:**
- Catálogo de beneficios disponibles (internos y externos)
- Personalización y modificación de beneficios asignados
- Valorización monetaria de beneficios
- Priorización de beneficios internos
- Sistema de canje y conversión
- Seguimiento de uso y consumo
- Gestión de períodos y renovaciones

**Estado:** En planificación/desarrollo inicial

---

## 5. Servicios de Pago (Payment Services)

**Descripción:** Métodos de pago y extracciones de fondos.

**Resumen:** Gestión de métodos de pago externos para extracción de fondos y procesamiento de transacciones monetarias.

**Alcance:**
- Integración con PayPal
- Integración con MercadoPago
- Procesamiento de extracciones de dinero
- Manejo de comisiones e impuestos
- Validación de transacciones externas
- Gestión de reembolsos y devoluciones
- Conversión de beneficios a dinero líquido

**Módulos relacionados:**
- `integrations/pay-methods`

**Estado:** Parcialmente implementado

---

## 6. Notificaciones (Notifications)

**Descripción:** Alertas y comunicación con usuarios.

**Resumen:** Sistema de notificaciones multicanal para mantener informados a los usuarios sobre transacciones, cambios y eventos importantes.

**Alcance:**
- Notificaciones transaccionales (email, push)
- Alertas de seguridad y accesos
- Comunicaciones de cambios en beneficios
- Templates personalizables por tipo de evento
- Preferencias de comunicación del usuario
- Notificaciones en tiempo real
- Historial de notificaciones enviadas

**Módulos relacionados:**
- `integrations/email`

**Estado:** Parcialmente implementado (email básico)

---

## 7. Integraciones Externas (External Integrations)

**Descripción:** Conexión con proveedores y APIs externas.

**Resumen:** Integración con proveedores de beneficios y servicios externos complementarios al sistema.

**Alcance:**
- Integración con proveedores de beneficios
- APIs de terceros para servicios complementarios
- Webhooks para sincronización en tiempo real
- Gestión de credenciales y autenticación externa
- Manejo de rate limits y errores de integración

**Estado:** En planificación

---

## 8. Infraestructura y Logging (Infrastructure & Observability)

**Descripción:** Monitoreo, logs y gestión de infraestructura.

**Resumen:** Componentes transversales para el monitoreo, logging y gestión de la infraestructura técnica del sistema.

**Alcance:**
- Sistema de logging multinivel (error, warn, info, debug, verbose)
- Gestión de logs con Winston
- Middleware de contexto y trazabilidad
- Manejo de errores global
- Interceptors para logging automático
- Métricas y observabilidad
- Gestión de caché (Redis)
- Bases de datos (PostgreSQL, Cold Storage)

**Módulos relacionados:**
- `_common/config/loggers`
- `_common/config/winston`
- `_common/database/cache`
- `_common/database/main`
- `_common/database/cold-storage`
- `_common/middlewares`

---

## 9. Proveedores y Partnerships (Provider Management)

**Descripción:** Gestión de alianzas y proveedores externos.

**Resumen:** Gestión de alianzas con proveedores externos que ofrecen beneficios a los empleados.

**Alcance:**
- Registro y onboarding de proveedores
- Catálogo de servicios y productos ofrecidos
- Administración de convenios y condiciones
- Actualización de precios y disponibilidad
- Estadísticas de uso por proveedor
- Sistema de validación y comprobantes (QR/códigos)

**Estado:** En planificación

---

## 10. Analytics y Reportes (Analytics & Reporting)

**Descripción:** Métricas, estadísticas y reportes estratégicos.

**Resumen:** Generación de métricas, estadísticas y reportes para la toma de decisiones estratégicas.

**Alcance:**
- Métricas de uso de beneficios
- Reportes para RRHH y dirección
- Análisis de satisfacción y engagement
- Identificación de beneficios más demandados
- Optimización del presupuesto de beneficios
- KPIs de negocio (retención, uso, conversión)
- Dashboards ejecutivos

**Estado:** En planificación

---

## 11. Compliance y Auditoría (Compliance & Audit)

**Descripción:** Cumplimiento normativo y trazabilidad.

**Resumen:** Cumplimiento normativo, auditoría y trazabilidad de operaciones sensibles.

**Alcance:**
- Registro de auditoría de transacciones
- Cumplimiento fiscal (manejo de impuestos)
- Trazabilidad de cambios en beneficios
- Protección de datos personales (GDPR, ISO 27001)
- Reportes regulatorios
- Logs inmutables para auditorías
- Control de accesos privilegiados

**Estado:** Parcialmente implementado (logs y trazabilidad)

---

---

## Prioridades de Implementación

**Fase 1 (Actual):**
1. Seguridad
2. Gestión Bancaria
3. Gestión de Usuarios
4. Infraestructura y Logging

**Fase 2 (Próxima):**
5. Servicios de Pago
6. Notificaciones
7. Beneficios Laborales
8. Integraciones Externas

**Fase 3 (Futura):**
9. Proveedores y Partnerships
10. Analytics y Reportes
11. Compliance y Auditoría (completar)

---

## Notas

- Los themes marcados como "En planificación" están documentados pero no implementados.
- Los themes "Parcialmente implementado" tienen funcionalidad básica que requiere expansión.
- Cada theme puede tener dependencias cruzadas con otros themes.
- La priorización sigue los objetivos de negocio definidos en el documento de requerimientos.
