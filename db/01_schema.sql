-- Esto se usa para limpiar las tablas, es útil para cuando requiere reiniciarse.
DROP TABLE IF EXISTS attendance CASCADE;
DROP TABLE IF EXISTS grades CASCADE;
DROP TABLE IF EXISTS enrollments CASCADE;
DROP TABLE IF EXISTS groups CASCADE;
DROP TABLE IF EXISTS courses CASCADE;
DROP TABLE IF EXISTS teachers CASCADE;
DROP TABLE IF EXISTS students CASCADE;

CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    program VARCHAR(50) NOT NULL,
    enrollment_year INT NOT NULL
);

CREATE TABLE teachers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    credits INT NOT NULL CHECK (credits > 0)
);

--Relación. Materia-Profesor-Periodo.
CREATE TABLE groups (
    id SERIAL PRIMARY KEY,
    course_id INT NOT NULL REFERENCES courses(id),
    teacher_id INT NOT NULL REFERENCES teachers(id),
    term VARCHAR(20) NOT NULL, 
    UNIQUE(course_id, teacher_id, term) 
);

--Relación. Alumno-Grupo.
CREATE TABLE enrollments (
    id SERIAL PRIMARY KEY,
    student_id INT NOT NULL REFERENCES students(id),
    group_id INT NOT NULL REFERENCES groups(id),
    enrolled_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(student_id, group_id) 
);

--Detalle de la inscripción.
CREATE TABLE grades (
    id SERIAL PRIMARY KEY,
    enrollment_id INT NOT NULL REFERENCES enrollments(id),
    partial1 DECIMAL(4,2) CHECK (partial1 BETWEEN 0 AND 10),
    partial2 DECIMAL(4,2) CHECK (partial2 BETWEEN 0 AND 10),
    final DECIMAL(4,2) CHECK (final BETWEEN 0 AND 10)
);


CREATE TABLE attendance (
    id SERIAL PRIMARY KEY,
    enrollment_id INT NOT NULL REFERENCES enrollments(id),
    date DATE NOT NULL,
    present BOOLEAN NOT NULL DEFAULT FALSE
);