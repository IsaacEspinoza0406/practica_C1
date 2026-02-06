DO
$do$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_catalog.pg_roles
      WHERE  rolname = 'isaac') THEN
      CREATE ROLE isaac WITH LOGIN PASSWORD '123';
      GRANT CONNECT ON DATABASE school_db TO isaac;
      GRANT SELECT ON ALL TABLES IN SCHEMA public TO isaac;
   END IF;
END
$do$;