# Dashboard de Coordinación Académica

Plataforma web desarrollada con **Next.js** y **PostgreSQL** para la gestión y visualización de reportes académicos. Este proyecto implementa una arquitectura segura utilizando Vistas SQL, roles de usuario con permisos limitados y optimización mediante índices.

## Tecnologías Utilizadas (Stack)
- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS.
- **Base de Datos:** PostgreSQL (Dockerizado).
- **Infraestructura:** Docker Compose.
- **Validación:** Zod.


## Guía de Instalación y Ejecución

Sigue estos pasos para levantar el proyecto desde cero.

### 1. Requisitos Previos
- Docker Desktop.
- Node.js.

### 2. Configurar Variables de Entorno
El repositorio incluye un archivo `.env.example` por seguridad para no filtrar credenciales sensibles. 
Crea una copia de este archivo, renómbralo a `.env.local` y asigna las credenciales correspondientes a tu entorno local:

```ini
# Formato esperado en .env.local
DATABASE_URL=postgres://<tu_usuario>:<tu_contraseña>@db:5432/school_db

Levantar la Infraestructura

El proyecto utiliza Docker Compose para orquestar la base de datos. Se recomienda usar el flag -v la primera vez para asegurar que los scripts de inicialización se ejecuten correctamente.

# Detener contenedores previos y limpiar volúmenes
docker compose down -v

# Levantar el contenedor en segundo plano
docker compose up -d

# Instalar dependencias
npm install

# Correr servidor de desarrollo
npm run dev


Evidencia de Seguridad
La aplicación NO utiliza el superusuario postgres. Se ha configurado un rol específico llamado isaac que posee permisos estrictamente limitados:

Permitido: SELECT sobre VISTAS.

Denegado: SELECT/INSERT/UPDATE sobre TABLAS físicas.

A continuación se muestra la evidencia de la terminal donde se intenta leer una tabla protegida y el sistema lo impide.

Prueba de acceso bloqueado:

isaac@DESKTOP-NLG3BH8 MINGW64 ~/AWOS/EP_C1/evaluacion-practica (main)
$ docker exec -it awos_school_db psql -U isaac -d school_db -c "SELECT * FROM students;"

ERROR:  permission denied for table students

Prueba de acceso a vistas (Permitido):

isaac@DESKTOP-NLG3BH8 MINGW64 ~/AWOS/EP_C1/evaluacion-practica (main)
$ docker exec -it awos_school_db psql -U isaac -d school_db -c "SELECT * FROM vw_course_performance LIMIT 2;"

               course_name               |  term  | total_students | average_score | failed_count 
-----------------------------------------+--------+----------------+---------------+--------------
 Aplicaciones Web Orientadas a Servicios | 2025-2 |              2 |          8.50 |            0
 Base de Datos Avanzadas                 | 2025-1 |              2 |          7.25 |            1
(2 rows)


Pruebas de Rendimiento
Se crearon índices estratégicos en el archivo db/05_indexes.sql para optimizar búsquedas por texto y filtrado por periodos. A continuación, se demuestra su uso mediante EXPLAIN ANALYZE:

Consulta 1: Búsqueda por Email (Reporte 3).

$ docker exec -it awos_school_db psql -U postgres -d school_db -c "SET enable_seqscan = off; EXPLAIN ANALYZE SELECT * FROM students WHERE email = 'Hespinoza@student.edu.mx';"

                                                  QUERY PLAN
-------------------------------------------------------------------------------------------------------------------------------
 Index Scan using students_email_key on students  (cost=0.13..8.15 rows=1 width=562) (actual time=0.060..0.060 rows=1 loops=1)
   Index Cond: ((email)::text = 'Hespinoza@student.edu.mx'::text)
 Planning Time: 0.801 ms
 Execution Time: 0.101 ms
(4 rows)

Resultado: Se confirma el uso de Index Scan, demostrando que la base de datos utiliza el índice para localizar rápidamente al estudiante sin realizar un escaneo secuencial.


Consulta 2: Filtrado por Periodo (Reporte 1)

$ docker exec -it awos_school_db psql -U postgres -d school_db -c "SET enable_seqscan = off; EXPLAIN ANALYZE SELECT * FROM groups WHERE term = '2025-1';"

                                                       QUERY PLAN
-------------------------------------------------------------------------------------------------------------------------       
 Index Scan using idx_groups_term on groups  (cost=0.13..8.15 rows=1 width=70) (actual time=0.024..0.025 rows=2 loops=1)        
   Index Cond: ((term)::text = '2025-1'::text)
 Planning Time: 0.662 ms
 Execution Time: 0.067 ms
(4 rows)

Se verifica que el índice idx_groups_term creado específicamente para este filtro está funcionando correctamente con un tiempo de ejecución de apenas 0.067 ms.