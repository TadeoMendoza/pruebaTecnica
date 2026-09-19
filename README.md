# Prueba Técnica BaldeCash - Solicitudes de Financiamiento

Proyecto FullStack para el registro y gestión de solicitudes, compuesto por un backend en NestJS y un frontend en Next.js.

## Instrucciones para iniciar el proyecto desde cero

La aplicación está dockerizada para que su ejecución sea automática. Este proceso levantará la base de datos, aplicará las tablas necesarias, insertará datos de prueba y arrancará ambos servidores.

### Prerrequisitos
- Tener instalado [Docker](https://docs.docker.com/get-docker/) y Docker Compose.
- Tener instalado Git.

### Pasos de ejecución

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/TadeoMendoza/pruebaTecnica.git
   cd pruebaTecnica
   ```

2. **Levantar todos los servicios:**
   ```bash
   docker compose up --build
   ```

3. **Acceder a la aplicación:**
   - **Frontend (Interfaz de usuario):** http://localhost:3001
   - **Backend (API):** http://localhost:3000

---

## Decisiones Técnicas y Arquitectura
- **Stack:** Backend en NestJS (TypeScript) y Frontend en Next.js con Tailwind CSS.
- **Base de Datos:** PostgreSQL administrado mediante Prisma ORM.
---

## Uso de IA
Se utilizó Inteligencia Artificial para agilizar el desarrollo en los siguientes puntos:
- Consultas sobre sintaxis y convenciones de validación en NestJS (`class-validator`, `class-transformer`).
- Estructuración del filtro global de excepciones (`all-exceptions.filter.ts`).
- Elaboración paso a paso de los `Dockerfile`, el `docker-compose.yml` y la resolución de conflictos de entorno para que el proyecto levante automáticamente con un solo comando.
- Creación de las pruebas unitarias (tests) para la validación matemática de las cuotas.