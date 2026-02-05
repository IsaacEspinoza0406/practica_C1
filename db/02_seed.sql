
--Profesores.
INSERT INTO teachers (name, email) VALUES
('Ramses Camas', 'Ramses789@school.edu.mx'),
('Viviana Rojo', 'Vrojo889@school.edu.mx'),
('Diana Velazquez', 'Dianavel@school.edu.mx');

-- materias.
INSERT INTO courses (code, name, credits) VALUES
('AWOS-101', 'Aplicaciones Web Orientadas a Servicios', 5),
('BDA-202', 'Base de Datos Avanzadas', 4),
('PI-303', 'Proyecto Integrador', 6);

-- Insertar Estudiantes
INSERT INTO students (name, email, program, enrollment_year) VALUES
('Isaac Mendoza', 'isaac@student.edu.mx', 'Sistemas', 2023),
('Héctor Espinoza', 'Hespinoza@student.edu.mx', 'Sistemas', 2023),
('Ana Lara', 'alaura98@student.edu.mx', 'Biomedica', 2023),
('Sofía Lara', 'sofilara@student.edu.mx', 'Biomedica', 2024),
('Patito job', 'patjob@student.edu.mx', 'Industrial', 2025);

--Se crean los grupos y se le asigna el docente.
INSERT INTO groups (course_id, teacher_id, term) VALUES
(1, 1, '2025-1'), 
(2, 2, '2025-1'), 
(1, 3, '2025-2'); 

-- inscripciones.
INSERT INTO enrollments (student_id, group_id) VALUES
(1, 1), (2, 1), (3, 1), 
(1, 2), (2, 2),       
(4, 3), (5, 3);         

-- Meto las calificaciones, como parciales y finales.
INSERT INTO grades (enrollment_id, partial1, partial2, final) VALUES
(1, 9.5, 9.0, 9.2), 
(2, 8.0, 8.5, 8.2), 
(3, 5.0, 4.0, 4.5), 
(4, 9.0, 9.0, 9.0), 
(5, 6.0, 5.0, 5.5), 
(6, 10.0, 10.0, 10.0), 
(7, 7.0, 7.0, 7.0); 

--Asistencial.
INSERT INTO attendance (enrollment_id, date, present) VALUES
(1, '2025-01-10', true), (1, '2025-01-12', true), 
(3, '2025-01-10', false), (3, '2025-01-12', false); 