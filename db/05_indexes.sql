-- 1. Optimización para Reporte 3.
-- Acelera WHERE name ILIKE '...' OR email ILIKE '...'
CREATE INDEX idx_students_search ON students(name, email);

-- 2. Optimización para Reporte 1 y 5.
-- Acelera WHERE term= '2025-1' en la tabla groups.
CREATE INDEX idx_groups_term ON groups(term);

-- 3. Optimización para JOINs.
-- Acelera la conexión entre Calificaciones e Inscripciones.
CREATE INDEX idx_grades_enrollment ON grades(enrollment_id);

-- 4. Optimización para Reporte 5.
-- Acelera: WHERE program = 'Sistemas'
CREATE INDEX idx_students_program ON students(program);