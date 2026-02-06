/* eslint-disable @typescript-eslint/no-explicit-any */
import { query } from '@/lib/db';
import Link from 'next/link';

export default async function Report2Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const page = typeof params.page === 'string' ? parseInt(params.page) : 1;
  const limit = 5; 
  const offset = (page - 1) * limit;

  const sql = `
    SELECT * FROM vw_teacher_load 
    ORDER BY teacher_name ASC
    LIMIT $1 OFFSET $2
  `;

  const result = await query(sql, [limit, offset]);
  const rows = result.rows;
  const countRes = await query('SELECT COUNT(*) FROM vw_teacher_load');
  const total = parseInt(countRes.rows[0].count);
  const totalPages = Math.ceil(total / limit);

  return (
    <main className="min-h-screen p-8 bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
            <Link href="/" className="px-4 py-2 bg-slate-800 rounded hover:bg-slate-700 transition">&larr; Volver</Link>
            <h1 className="text-3xl font-bold">Carga Docente</h1>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800 mb-6">
            <table className="w-full text-left text-sm text-slate-400">
                <thead className="bg-slate-900 text-slate-200 uppercase">
                    <tr>
                        <th className="px-6 py-4">Profesor</th>
                        <th className="px-6 py-4 text-center">Grupos</th>
                        <th className="px-6 py-4 text-center">Alumnos</th>
                        <th className="px-6 py-4 text-center">Promedio Global</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-slate-950">
                    {rows.map((row: any, i: number) => (
                        <tr key={i} className="hover:bg-slate-900/50">
                            <td className="px-6 py-4 text-white font-medium">{row.teacher_name}</td>
                            <td className="px-6 py-4 text-center">{row.total_groups}</td>
                            <td className="px-6 py-4 text-center">{row.total_students}</td>
                            <td className="px-6 py-4 text-center text-emerald-400 font-bold">{row.global_average}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <div className="flex justify-between items-center bg-slate-900 p-4 rounded-xl border border-slate-800">
            <span className="text-slate-500">Página {page} de {totalPages}</span>
            <div className="flex gap-2">
                {page > 1 && <Link href={`/reports/2?page=${page - 1}`} className="px-4 py-2 bg-slate-800 rounded">Anterior</Link>}
                {page < totalPages && <Link href={`/reports/2?page=${page + 1}`} className="px-4 py-2 bg-blue-600 rounded">Siguiente</Link>}
            </div>
        </div>
      </div>
    </main>
  );
}