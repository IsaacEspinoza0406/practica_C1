-- Aquí creo un usuario para aplicación, siempre y cuando no exista uno.
DO
$do$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_catalog.pg_roles
      WHERE  rolname = 'isaac') THEN
      CREATE ROLE isaac WITH LOGIN PASSWORD 'IsaacMD78';
   END IF;
END
$do$;

GRANT CONNECT ON DATABASE school_db TO isaac;

GRANT SELECT ON vw_course_performance TO isaac;
GRANT SELECT ON vw_teacher_load TO isaac;
GRANT SELECT ON vw_students_at_risk TO isaac;
GRANT SELECT ON vw_attendance_by_group TO isaac;
GRANT SELECT ON vw_rank_students TO isaac;

REVOKE SELECT ON students, teachers, courses, groups, enrollments, grades, attendance FROM isaac;