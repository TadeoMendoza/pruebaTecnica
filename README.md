# pruebaTecnica

### Uso de IA
* Consultas generales sobre NestJS.
* Consultas de validación de datos usando `class-validator` y `class-transformer`.
* Creación de `all-exceptions.filter.ts` para manejo global de errores.
* Configuración de base de datos con Prisma y Docker.

---

# Base de Datos, Prisma y Docker Setup

### 1. Levantar Contenedor PostgreSQL
```bash
docker run --name baldecash_postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgrespassword -e POSTGRES_DB=baldecash_db -p 5432:5432 -d postgres:16-alpine
```

### 2. Instalación de Dependencias
Ejecutar dentro de `prueba-tecnica-back`:
```bash
npm install @prisma/client@5.22.0
npm install -D prisma@5.22.0 ts-node @types/node
```

### 3. Archivos de Configuración
* Variables de entorno: `prueba-tecnica-back/.env` (ver `.env.example`)
* Esquema de base de datos: `prueba-tecnica-back/prisma/schema.prisma`
* Datos iniciales (Seeder): `prueba-tecnica-back/prisma/seed.ts`
* Configuración del script de seed: `prueba-tecnica-back/package.json` (`prisma.seed`)

### 4. Comandos de Ejecución y Migración

Generar cliente de Prisma:
```bash
npx prisma generate
```

Crear y aplicar migración versionada:
```bash
npx prisma migrate dev --name init_request
```

Ejecutar seeder:
```bash
npx prisma db seed
```

Abrir visor de base de datos (Prisma Studio):
```bash
npx prisma studio
```

Resetear base de datos y reaplicar seed:
```bash
npx prisma migrate reset
```

Utilizacion de Antigravity para crear el docker-compose para levantar el proyecto