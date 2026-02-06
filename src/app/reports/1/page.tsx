/* eslint-disable @typescript-eslint/no-explicit-any */
import { query } from '@/lib/db';
import Link from 'next/link';

export default async function Report1Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams; 
  const term = typeof params.term === 'string' ? params.term : '2025-1';

  const sql = `
    SELECT * FROM vw_course_performance 
    WHERE term = $1
    ORDER BY course_name ASC
  `;
  
  const result = await query(sql, [term]);
  const rows = result.rows;

  const generalAvg = rows.length > 0 
    ? (rows.reduce((acc: number, row: any) => acc + parseFloat(row.average_score), 0) / rows.length).toFixed(2) 
    : "0";

  return (
    <main className="min-h-screen p-8 bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
            <Link href="/" className="px-4 py-2 bg-slate-800 rounded hover:bg-slate-700 transition">
                &larr; Volver
            </Link>
            <h1 className="text-3xl font-bold">Rendimiento por Materia</h1>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 mb-8">
            <form className="flex gap-4 items-end">
                <div className="flex flex-col gap-2">
                    <label className="text-sm text-slate-400">Periodo (Term)</label>
                    <select 
                        name="term" 
                        defaultValue={term}
                        className="bg-slate-800 border border-slate-700 rounded px-4 py-2 text-white"
                    >
                        <option value="2025-1">2025-1</option>
                        <option value="2025-2">2025-2</option>
                    </select>
                </div>
                <button type="submit" className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded font-medium transition">
                    Filtrar
                </button>
            </form>
        </div>

        <div className="mb-8 p-6 bg-slate-900 rounded-xl border border-slate-800 w-fit">
            <h3 className="text-slate-400 text-sm font-medium mb-1">Promedio General</h3>
            <p className="text-4xl font-bold text-white">{generalAvg}</p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left text-sm text-slate-400">
                <thead className="bg-slate-900 text-slate-200 uppercase font-medium">
                    <tr>
                        <th className="px-6 py-4">Materia</th>
                        <th className="px-6 py-4">Periodo</th>
                        <th className="px-6 py-4 text-center">Alumnos</th>
                        <th className="px-6 py-4 text-center">Promedio</th>
                        <th className="px-6 py-4 text-center">Reprobados</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-slate-950">
                    {rows.length === 0 ? (
                        <tr><td colSpan={5} className="p-8 text-center">Sin datos</td></tr>
                    ) : (
                        rows.map((row: any, index: number) => (
                            <tr key={index} className="hover:bg-slate-900/50">
                                <td className="px-6 py-4 font-medium text-white">{row.course_name}</td>
                                <td className="px-6 py-4">{row.term}</td>
                                <td className="px-6 py-4 text-center">{row.total_students}</td>
                                <td className={`px-6 py-4 text-center font-bold ${row.average_score < 6 ? 'text-red-400' : 'text-emerald-400'}`}>{row.average_score}</td>
                                <td className="px-6 py-4 text-center text-red-400">{row.failed_count > 0 ? row.failed_count : '-'}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
      </div>
    </main>
  );
}