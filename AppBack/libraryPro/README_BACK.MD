# Backend - Sistema de Gestión Bibliotecaria

Este es el backend desarrollado en **Spring Boot**.

## Estructura de Paquetes
- **Model**: Entidades JPA que mapean a las tablas de la DB.
- **Repository**: Interfaces que extienden JpaRepository.
- **Service**: Clases `@Service` donde reside la lógica de negocio.
- **Controller**: Clases `@RestController` que exponen los endpoints de la API.

## Configuración Inicial
Asegúrate de configurar tu `application.properties` con las credenciales de tu base de datos (PostgreSQL17).