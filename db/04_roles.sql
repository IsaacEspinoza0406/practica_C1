DO
$do$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_catalog.pg_roles
      WHERE  rolname = 'isaac') THEN
      CREATE ROLE isaac WITH LOGIN PASSWORD '123';
      GRANT CONNECT ON DATABASE school_db TO isaac;
      GRANT SELECT ON vw_course_performance, vw_teacher_load, vw_students_at_risk, vw_attendance_by_group, vw_rank_students TO isaac;
   END IF;
END
$do$;