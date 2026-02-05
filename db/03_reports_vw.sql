--VISTA 1: vw_course_performance
-- Grain: 1 fila por Curso + Periodo
-- Requisito: uso el case para calclar la cantidad de reprobados.
-- ---------------------------------------------------------
CREATE OR REPLACE VIEW vw_course_performance AS
SELECT 
    c.name AS course_name,
    g.term,
    COUNT(e.id) AS total_students,
    ROUND(AVG(gr.final), 2) AS average_score,
    SUM(CASE WHEN gr.final < 6.0 THEN 1 ELSE 0 END) AS failed_count
FROM groups g
JOIN courses c ON g.course_id = c.id
JOIN enrollments e ON g.id = e.group_id
LEFT JOIN grades gr ON e.id = gr.enrollment_id
GROUP BY c.name, g.term;

-- VERIFY: SELECT * FROM vw_course_performance;


-- VISTA 2: vw_teacher_load
-- Grain: 1 fila por Profesor + Periodo
-- Requisito: aquí utilizo el HAVING porque quiero mostrar un profesor que al menos tenga un alumno.

CREATE OR REPLACE VIEW vw_teacher_load AS
SELECT 
    t.name AS teacher_name,
    g.term,
    COUNT(DISTINCT g.id) AS total_groups,
    COUNT(e.id) AS total_students,
    COALESCE(ROUND(AVG(gr.final), 2), 0) AS global_average
FROM teachers t
JOIN groups g ON t.id = g.teacher_id
JOIN enrollments e ON g.id = e.group_id
LEFT JOIN grades gr ON e.id = gr.enrollment_id
GROUP BY t.name, g.term
HAVING COUNT(e.id) > 0;

-- VERIFY: SELECT * FROM vw_teacher_load;

-- VISTA 3: vw_students_at_risk
-- Grain: 1 fila por Alumno
-- Requisito: 
CREATE OR REPLACE VIEW vw_students_at_risk AS
WITH StudentStats AS (
    SELECT 
        s.id,
        s.name,
        s.email,
        AVG(gr.final) as current_avg
    FROM students s
    JOIN enrollments e ON s.id = e.student_id
    JOIN grades gr ON e.id = gr.enrollment_id
    GROUP BY s.id, s.name, s.email
)
SELECT 
    id, name, email, ROUND(current_avg, 2) as average
FROM StudentStats
WHERE current_avg < 6.0; 

-- VERIFY: SELECT * FROM vw_students_at_risk;


-- VISTA 4: vw_attendance_by_group
-- Grain: 1 fila por Grupo
-- Requisito: aquí uso el COALESCE para evitar nulos si en dado caso no hay registro.

CREATE OR REPLACE VIEW vw_attendance_by_group AS
SELECT 
    c.name || ' - ' || g.term AS group_label,
    COALESCE(
        (COUNT(CASE WHEN a.present THEN 1 END) * 100.0) / NULLIF(COUNT(a.id), 0), 
    0) AS attendance_percentage
FROM groups g
JOIN courses c ON g.course_id = c.id
JOIN enrollments e ON g.id = e.group_id
LEFT JOIN attendance a ON e.id = a.enrollment_id
GROUP BY c.name, g.term;

-- VISTA 5: vw_rank_students
-- Grain: 1 fila por Alumno + Programa

CREATE OR REPLACE VIEW vw_rank_students AS
SELECT 
    s.program,
    s.name,
    ROUND(AVG(gr.final), 2) AS final_average,
    RANK() OVER (PARTITION BY s.program ORDER BY AVG(gr.final) DESC) as academic_rank
FROM students s
JOIN enrollments e ON s.id = e.student_id
JOIN grades gr ON e.id = gr.enrollment_id
GROUP BY s.program, s.name;