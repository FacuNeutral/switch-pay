# Requerimientos de negocio para SwitchPay

## Versión: 1.0.0

# 

# Guía

[Historial de revisiones](#historial-de-revisiones)

[1\. Requerimientos del negocio](#1.-requerimientos-del-negocio)

[1.1 Situación actual](#1.1-situación-actual)

[1.2 Oportunidad del negocio](#1.2-oportunidad-del-negocio)

[1.3 Objetivos de negocio y Criterios de éxito](#1.3-objetivos-de-negocio-y-criterios-de-éxito)

[1.4 Riesgos](#1.4-riesgos)

[2\. Visión de la solución](#2.-visión-de-la-solución)

[2.1 Declaración de la visión de la solución](#2.1-declaración-de-la-visión-de-la-solución)

[2.2 Funciones principales](#2.2-funciones-principales)

[2.3 Suposiciones y dependencias](#2.3-suposiciones-y-dependencias)

[2.4 Limitaciones y exclusiones](#2.4-limitaciones-y-exclusiones)

[3\. Contexto del negocio](#3.-contexto-del-negocio)

[3.1 Perfil de los interesados (Stakeholders)](#3.1-perfil-de-los-interesados-\(stakeholders\))

[3.2 Ambiente de operación](#3.2-ambiente-de-operación)

# Historial de revisiones {#historial-de-revisiones}

| Autor | Fecha | Comentarios | Versión |
| :---- | :---- | :---- | :---- |
| Facundo Alvarez | 02/10/2025 | Primera versión completa | 1.0.0 |
|  |  |  |  |
|  |  |  |  |

# 

# 1\. Requerimientos del negocio {#1.-requerimientos-del-negocio}

## 1.1 Situación actual {#1.1-situación-actual}

Sabemos que las empresas ofrecen a sus empleados beneficios (bonos alimenticios, viáticos, gimnasio, entre otros.) como parte de la compensación para atraer y retener talento. 

Estos beneficios suelen gestionarse de forma rígida: están predefinidos por recursos humanos o por convenios corporativos, con poca capacidad de personalización por parte del empleado.

Con el tiempo, las prioridades de los empleados cambian: quienes hoy en día necesitan un apoyo en transporte y bonos alimenticios, en el futuro, esto puede dejar de ser una opción atractiva y necesaria cuando el empleado ya no necesite prescindir de ello. Sin embargo, actualmente no existe un sistema que permita modificar o personalizar esos beneficios de forma dinámica y sencilla.

### Esta falta de flexibilidad genera diversas limitaciones:

* Los empleados no pueden adaptar sus beneficios a su situación actual, lo que reduce la percepción de bienestar y pertenencia.

* En situaciones como empresa, se requiere una ardua investigación para proponer una propuesta de valor personalizada ideal para cada tipo de empleado.

* Los cambios en las necesidades sociales, familiares o económicas de los empleados no se reflejan oportunamente en los beneficios otorgados.

* La gestión manual o centralizada de beneficios impide una experiencia ágil, moderna y enfocada en la persona.

## 1.2 Oportunidad del negocio {#1.2-oportunidad-del-negocio}

Hoy en día, las empresas manejan los beneficios laborales mediante sistemas de Recursos Humanos y nómina que ofrecen paquetes fijos, según el puesto o nivel del empleado. Estos beneficios rara vez pueden modificarse y suelen mantenerse iguales durante todo el año.

El problema en los modelos tradicionales es que estos no se adaptan del todo a las necesidades reales de cada persona, o los tiempos para solicitar un cambio se vuelven lentos y laboriosos, o directamente no se tiene un plan de cambio. Inlcuso, hay quienes terminan sin llegar a usar todos los beneficios que reciben, produciendo como consecuencia, inversiones que no generan valor y una menor satisfacción de utilidad actual o futura.

La oportunidad se encuentra en ofrecer una aplicación que permita a los empleados la posibilidad de elegir y cambiar una gran parte de sus beneficios laborales de manera flexible. Así, la empresa optimiza su inversión y los colaboradores obtienen beneficios que realmente les sirva según sus necesidades acutales.

## 1.3 Objetivos de negocio y Criterios de éxito {#1.3-objetivos-de-negocio-y-criterios-de-éxito}

* ON1: Incrementar la retención de talento y la satisfacción de los empleados mediante la personalización de beneficios, como objetivo, al menos 30% de empleados modifiquen 1 beneficio durante el P2.

* ON2: Aumentar en un 40% el uso general de beneficios internos durante el P2 en comparación al P1.

* CE1: La mitad de usuarios invierten en beneficios internos (dentro de la aplicación) al comenzar el P1.

* CE2: Al menos 1 beneficio modificado de la mitad de usuarios, se vuelve a solicitar más de 3 veces a partir del P1, reflejando valor real en el cambio.

***Aclaración:***

*“P1: Primer período que concierne los primeros 3 meses de implementación de la aplicación.”*  
*“P2: Tercer período que concierne los primeros 5 meses de implementación de la aplicación.”*

## 1.4 Riesgos {#1.4-riesgos}

* La adaptación del software para los proveedores externos puede provocar retrasos de tiempo y costes extras de infraestructura.

* Se revele indirectamente el valor monetario de la mayoría de los beneficios brindados.

* No regular adecuadamente los impuestos al extraer dinero puede generar sensación de abuso o manipulación hacia los empleados.

# 2\. Visión de la solución {#2.-visión-de-la-solución}

## 2.1 Declaración de la visión de la solución {#2.1-declaración-de-la-visión-de-la-solución}

### 

Para compañías IT que quieren potenciar el valor de sus beneficios de trabajo y ofrecer a sus empleados una flexibilidad distinta a lo establecido, SwitchPay es una aplicación bancaria para uso interno exclusivo, enfocada en que cada usuario pueda personalizar sus beneficios según sus prioridades actuales y situación económica.

A diferencia de los sistemas actuales, donde los beneficios pueden perder relevancia con el tiempo y los cambios requieren negociaciones exhaustivas, SwitchPay facilita este proceso, adaptándose a las necesidades de cada persona y utilizando estrategias que priorizan y aprovechan al máximo los beneficios internos ofrecidos por la empresa.

## 2.2 Funciones principales {#2.2-funciones-principales}

* FE1: Gestionar beneficios de trabajo según sea la necesidad del usuario.

* FE2: Establecer un sistema de pago con funciones bancarias para el control de fondos.

* FE3: Brindar un sistema de comprobación de acceso rápido para utilizar un beneficio.

* FE4: Permitir a las asociaciones vinculadas crear y ajustar sus beneficios brindados.

* FE5: Conocer los beneficios más demandados.

## 2.3 Suposiciones y dependencias {#2.3-suposiciones-y-dependencias}

* SU1: Los proveedores que quieran ofrecer sus beneficios cuentan con los dispositivos e infraestructura necesaria para la utilización de la plataforma.

* SU2: La organización cuenta con personal para administrar  el uso de los fondos de los usuarios.

* SU3: La organización asume la responsabilidad ante cualquier cambio de valor monetario sobre beneficios que pertenezcan a proveedores.

* DEP1: Se utilizarán aplicaciones de pago externas como paypal y mercadopago para realizar extracciones de dinero.

* DEP2: Se debe mantener la información actualizada para los beneficios ofrecidos por los proveedores.

* DEP3: Los empleados dependen exclusivamente de contar con acceso a la plataforma para poder utilizar la mayoría de beneficios otorgados por este medio.

## 2.4 Limitaciones y exclusiones {#2.4-limitaciones-y-exclusiones}

* EX1: No se desarrollará una aplicación móvil nativa; la versión inicial será PWA. Una aplicación desarrollada en web que permite instalarse y usarse desde mobile.

* EX2: No se incluirá la opción de canje o transferencia de beneficios entre usuarios.

* LI1: El alcance del sistema se restringe a beneficios con valor económico tangible, quedando fuera aquellos que no puedan ser valorados o adquiridos mediante compensación monetaria, como lo son vacaciones, obras sociales, seguros o beneficios familiares.

* LI2: La disponibilidad de cada beneficio depende de los convenios internos de la empresa o proveedores involucrados.

* LI3: Solo se podrán elegir beneficios previamente aprobados por el área de RRHH.

* LI4: Inicialmente el único idioma disponible será inglés.

# 3\. Contexto del negocio {#3.-contexto-del-negocio}

## 3.1 Perfil de los interesados (Stakeholders) {#3.1-perfil-de-los-interesados-(stakeholders)}

* ***Dirección de la Empresa / Ejecutivos***

  * ***Beneficio y valor percibido:***  
    ▪ Mayor aprovechamiento de beneficios internos.  
    ▪ Retención de talento de empleados.  
    ▪ Optimización del presupuesto.

  * ***Actitudes:***  
    ▪ Interés activo por el avance del proyecto y su impacto en resultados.

  * ***Funciones de interés mayor:***  
    ▪ Control de métricas de uso (especialmente de beneficios internos).

  * ***Restricciones:***  
    ▪ Presupuesto limitado.  
    ▪ Necesidad de justificar funcionalidades adicionales.

* **Empleados**

  * ***Beneficio y valor percibido:***  
    ▪ Flexibilidad para cambiar sus beneficios según sean sus necesidades actuales.

  * ***Actitudes:***  
    ▪ Receptivos a soluciones que simplifiquen procesos.  
    ▪ Pueden mostrar resistencia inicial si el sistema se percibe complejo.

  * ***Funciones de interés mayor:***  
    ▪ Gestionar beneficios según sea su conveniencia.  
    ▪ Facilitar los pagos y acceso del beneficio.  
    ▪ Contar con una amplia variedad de servicios integrados en el sistema.  
      
  * ***Restricciones:***  
    ▪ Dependencia de la comunicación interna para feedback.

* **Proveedores**

  * ***Beneficio y valor percibido:***  
    ▪ Mayor visibilidad de sus productos y servicios.  
    ▪ Incremento en el uso y fidelización de clientes corporativos.

  * ***Actitudes:***  
    ▪ Interesados en integrarse y mantener presencia constante.  
    ▪ Esperan soporte técnico y claridad en la comunicación.

  * ***Funciones de interés mayor:***  
    ▪ Administrar beneficios que poseen y promociones.  
    ▪ Acceso a estadísticas tanto de participación como generales.

  * ***Restricciones:***  
    ▪ Tiempos limitados para pruebas de integración.  
    ▪ Dependencia de aprobaciones jerárquicas.

* **Recursos Humanos (RRHH)**

  * ***Beneficio y valor percibido:***  
    ▪ Simplificación de la gestión de beneficios con ofertas atractivas.  
    ▪ Datos centralizados para seguimiento y evaluación de impacto.

  * ***Actitudes:***  
    ▪ Muy receptivos ante soluciones que reduzcan tareas manuales.  
    ▪ Pueden priorizar estabilidad y soporte continuo.

  * ***Funciones de interés mayor:***  
    ▪ Generación automática de reportes y métricas.

  * ***Restricciones:***  
    ▪ Ninguna hasta el momento.

***Aclaración:***

*“Las Actitudes y Restrcciones se declaran en base al periodo de desarrollo, no contemplan la etapa posterior al lanzamiento.”*

## 3.2 Ambiente de operación {#3.2-ambiente-de-operación}

* ***¿Los usuarios están concentrados en un área geográfica cercana o dispersos ampliamente?***  
  Los usuarios se encuentran mayormente cerca de las sedes de la empresa. Sin embargo, la aplicación también contempla el acceso remoto para empleados que trabajen bajo modalidad híbrida o fuera de la oficina en determinados días.

* ***¿En qué momentos del día los usuarios necesitan acceder más al sistema?***  
  El acceso es posible las 24 horas, aunque el uso principal ocurre durante las jornadas laborales (8:00 a 18:00, horario local).

* ***¿Dónde se generan los datos? ¿Qué tan alejadas están estas ubicaciones? ¿Necesitamos combinar la información de las diferentes ubicaciones?***  
  Los datos se generan tanto en los servidores de la aplicación como en los sistemas internos de las empresas y proveedores de beneficios. La información se centraliza automáticamente en una base de datos principal, combinando los registros de distintas sedes bajo un mismo entorno seguro.

* ***¿Qué equipos y sistemas existen actualmente o se usarán para el sistema nuevo?***  
  Los usuarios accederán mayormente con dispositivos móviles y también desde el navegador web en computadoras personales. El sistema se integrará con plataformas corporativas existentes mediante API (como nómina, recursos humanos y proveedores externos).

* ***¿Qué controles de seguridad son implementados o son necesarios?***  
  Se aplica una autenticación mediante 2 pasos (usuario y contraseña corporativa \+ un “código de pin” propio) con soporte para OAuth (Google).  
  Toda la información se transmite de forma cifrada y los datos se almacenan en servidores con cumplimiento de estándares ISO 27001 y GDPR.   
  Cualquier transacción o acción de gran importancia para el usuario requiere algún tipo de validación adicional. El usuario puede aplicar estrictamente TOTP (ejemplo google authenticator).

* ***¿El producto debe ser utilizado continuamente o hay momentos de interrupción?***  
  El sistema debe estar disponible de forma continua, salvo en casos de mantenimiento programado o actualizaciones planificadas. Se espera una alta disponibilidad y tiempos de respuesta mínimos durante las operaciones.

* ***¿Qué equipos y sistemas existen actualmente o se usarán para el sistema nuevo?***  
  Actualmente, la gestión de beneficios se realiza de forma manual mediante planillas internas. Con el nuevo sistema, gran parte de los beneficios medibles en factor monetario serán digitalizados y gestionados desde la aplicación.

* ***¿Cuántos usuarios se espera que utilicen el sistema?***  
  El estimado de usuario teniendo un uso constante entre 200 a 300 activos y más de 13 mil registrados, según el tamaño actual dentro de la empresa.

Eslogan: Work perks that fit your life (beneficios laborales que se adaptan a tu vida).