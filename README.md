#  Dashboard de Coordinación Académica

Plataforma web desarrollada con **Next.js 15** y **PostgreSQL** para la gestión y visualización de reportes académicos. Este proyecto implementa una arquitectura segura utilizando Vistas SQL, roles de usuario con permisos limitados (Principio de Menor Privilegio) y optimización mediante índices.

##  Tecnologías Utilizadas (Stack)
- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS.
- **Base de Datos:** PostgreSQL 15 (Dockerizado).
- **Infraestructura:** Docker Compose.
- **Validación:** Zod.

---

##  Guía de Instalación y Ejecución

Sigue estos pasos para levantar el proyecto desde cero.

### 1. Requisitos Previos
- Docker Desktop (corriendo).
- Node.js (v18 o superior).

### 2. Configurar Variables de Entorno
Crea un archivo `.env.local` en la raíz del proyecto con la siguiente credencial (ajustada al puerto configurado en Docker):

```ini
DATABASE_URL=postgres://isaac:123@127.0.0.1:5435/school_db

El proyecto utiliza Docker Compose para orquestar la base de datos. Se recomienda usar el flag -v la primera vez para asegurar que los scripts de inicialización (schema, seed, roles, etc.) se ejecuten correctamente.

# Detener contenedores previos y limpiar volúmenes
docker compose down -v

# Levantar el contenedor en segundo plano
docker compose up -d

# Instalar dependencias
npm install

# Correr servidor de desarrollo
npm run dev

La aplicación NO utiliza el superusuario postgres. Se ha configurado un rol específico llamado isaac que posee permisos estrictamente limitados

 Permitido: SELECT sobre VISTAS.

Denegado: SELECT/INSERT/UPDATE sobre TABLAS físicas.

##Evidencia de Seguridad.

El usuario `isaac` tiene permisos restringidos. A continuación se muestra la evidencia de la terminal donde se intenta leer una tabla protegida y el sistema lo impide.

**Prueba realizada:**
```bash
isaac@DESKTOP-NLG3BH8 MINGW64 ~/AWOS/EP_C1/evaluacion-practica (main)
$ docker exec -it awos_school_db psql -U isaac -d school_db -c "SELECT * FROM students;"
ERROR:  permission denied for table students

Resultado obtenido.
ERROR:  permission denied for table students
LINE 1: SELECT * FROM students;

isaac@DESKTOP-NLG3BH8 MINGW64 ~/AWOS/EP_C1/evaluacion-practica (main)
$ docker exec -it awos_school_db psql -U isaac -d school_db -c "SELECT * FROM vw_course_performance LIMIT 2;"
               course_name               |  term  | total_students | average_score | failed_count 
-----------------------------------------+--------+----------------+---------------+--------------
 Aplicaciones Web Orientadas a Servicios | 2025-2 |              2 |          8.50 |            0
 Base de Datos Avanzadas                 | 2025-1 |              2 |          7.25 |            1
(2 rows)

Se crearon índices estratégicos en el archivo db/05_indexes.sql para optimizar búsquedas por texto y filtrado por periodos.

Prueba de rendimiento con EXPLAIN ANALYZE.

EXPLAIN ANALYZE SELECT * FROM students WHERE email = 'Hespinoza@student.edu.mx';

Resultado:
Index Scan using idx_students_search on students ... (Esto confirma que la base de datos usa el índice y no hace un escaneo secuencial lento).

