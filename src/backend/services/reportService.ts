// src/backend/services/reportService.ts
import { query } from '../db'; 

// --- REPORTE 1: Rendimiento ---
export async function getCoursePerformance(term: string) {
  const sql = `
    SELECT * FROM vw_course_performance 
    WHERE term = $1
    ORDER BY course_name ASC
  `;
  const result = await query(sql, [term]);
  return result.rows;
}

// --- REPORTE 2: Carga Docente ---
export async function getTeacherLoad(limit: number, offset: number) {
  const sql = `
    SELECT * FROM vw_teacher_load 
    ORDER BY teacher_name ASC
    LIMIT $1 OFFSET $2
  `;
  const result = await query(sql, [limit, offset]);
  
  // Consulta extra para saber el total de páginas
  const countRes = await query('SELECT COUNT(*) FROM vw_teacher_load');
  const total = parseInt(countRes.rows[0].count);

  return { rows: result.rows, total };
}

// --- REPORTE 3: Alumnos en Riesgo ---
export async function getStudentsAtRisk(q: string, limit: number, offset: number) {
  const sql = `
    SELECT * FROM vw_students_at_risk 
    WHERE name ILIKE $1 OR email ILIKE $1
    ORDER BY average ASC
    LIMIT $2 OFFSET $3
  `;
  const result = await query(sql, [`%${q}%`, limit, offset]);
  return result.rows;
}

// --- REPORTE 4: Asistencia ---
export async function getAttendanceByGroup() {
  const result = await query('SELECT * FROM vw_attendance_by_group');
  return result.rows;
}

// --- REPORTE 5: Ranking ---
export async function getRankStudents(program: string) {
  const sql = `SELECT * FROM vw_rank_students WHERE program = $1 ORDER BY academic_rank ASC`;
  const result = await query(sql, [program]);
  return result.rows;
}