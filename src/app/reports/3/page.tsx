/* eslint-disable @typescript-eslint/no-explicit-any */
import { query } from '@/lib/db';
import Link from 'next/link';

export default async function Report3Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const q = typeof params.q === 'string' ? params.q : ''; 
  const page = typeof params.page === 'string' ? parseInt(params.page) : 1;
  const limit = 5;
  const offset = (page - 1) * limit;

  const sql = `
    SELECT * FROM vw_students_at_risk 
    WHERE name ILIKE $1 OR email ILIKE $1
    ORDER BY average ASC
    LIMIT $2 OFFSET $3
  `;

  const result = await query(sql, [`%${q}%`, limit, offset]);
  const rows = result.rows;

  return (
    <main className="min-h-screen p-8 bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
            <Link href="/" className="px-4 py-2 bg-slate-800 rounded hover:bg-slate-700 transition">&larr; Volver</Link>
            <h1 className="text-3xl font-bold text-red-500">Alumnos en Riesgo</h1>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 mb-8">
            <form className="flex gap-4">
                <input 
                    name="q" 
                    defaultValue={q}
                    placeholder="Buscar por nombre o email..." 
                    className="bg-slate-800 border border-slate-700 rounded px-4 py-2 text-white w-full focus:outline-none focus:border-red-500"
                />
                <button type="submit" className="px-6 py-2 bg-red-600 hover:bg-red-500 rounded font-medium">Buscar</button>
            </form>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800 mb-6">
            <table className="w-full text-left text-sm text-slate-400">
                <thead className="bg-slate-900 text-slate-200 uppercase">
                    <tr>
                        <th className="px-6 py-4">ID</th>
                        <th className="px-6 py-4">Alumno</th>
                        <th className="px-6 py-4">Email</th>
                        <th className="px-6 py-4 text-center">Promedio General</th>
                        <th className="px-6 py-4 text-center">Estado</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-slate-950">
                    {rows.length === 0 ? <tr><td colSpan={5} className="p-8 text-center">No se encontraron alumnos en riesgo.</td></tr> :
                    rows.map((row: any, i: number) => (
                        <tr key={i} className="hover:bg-slate-900/50">
                            <td className="px-6 py-4 font-mono text-xs">{row.id}</td>
                            <td className="px-6 py-4 font-medium text-white">{row.name}</td>
                            <td className="px-6 py-4">{row.email}</td>
                            <td className="px-6 py-4 text-center font-bold text-red-400">{row.average}</td>
                            <td className="px-6 py-4 text-center"><span className="px-2 py-1 bg-red-900/30 text-red-400 rounded text-xs">RIESGO ACADÉMICO</span></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
        <div className="flex justify-end gap-2">
            {page > 1 && <Link href={`/reports/3?q=${q}&page=${page - 1}`} className="px-4 py-2 bg-slate-800 rounded">Anterior</Link>}
            {rows.length === limit && <Link href={`/reports/3?q=${q}&page=${page + 1}`} className="px-4 py-2 bg-slate-800 rounded">Siguiente</Link>}
        </div>
      </div>
    </main>
  );
}