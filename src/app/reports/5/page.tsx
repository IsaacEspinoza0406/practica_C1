/* eslint-disable @typescript-eslint/no-explicit-any */
import { query } from '@/lib/db';
import Link from 'next/link';

export default async function Report5Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  
  const validPrograms = ['Sistemas', 'Industrial', 'Biomedica'];
  const program = (typeof params.program === 'string' && validPrograms.includes(params.program)) 
    ? params.program 
    : 'Sistemas';

  const sql = `SELECT * FROM vw_rank_students WHERE program = $1 ORDER BY academic_rank ASC`;
  const result = await query(sql, [program]);
  const rows = result.rows;

  return (
    <main className="min-h-screen p-8 bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
            <Link href="/" className="px-4 py-2 bg-slate-800 rounded hover:bg-slate-700 transition">&larr; Volver</Link>
            <h1 className="text-3xl font-bold text-purple-500">Ranking Académico</h1>
        </div>

        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {validPrograms.map(p => (
                <Link 
                    key={p} 
                    href={`/reports/5?program=${p}`}
                    className={`px-4 py-2 rounded-full border transition ${program === p ? 'bg-purple-600 border-purple-600 text-white' : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-purple-500'}`}
                >
                    {p}
                </Link>
            ))}
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left text-sm text-slate-400">
                <thead className="bg-slate-900 text-slate-200 uppercase">
                    <tr>
                        <th className="px-6 py-4 text-center">Rank</th>
                        <th className="px-6 py-4">Alumno</th>
                        <th className="px-6 py-4">Programa</th>
                        <th className="px-6 py-4 text-center">Promedio Final</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-slate-950">
                    {rows.length === 0 ? <tr><td colSpan={4} className="p-8 text-center">Sin datos.</td></tr> :
                    rows.map((row: any, i: number) => (
                        <tr key={i} className="hover:bg-slate-900/50">
                            <td className="px-6 py-4 text-center">
                                <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold ${row.academic_rank === 1 ? 'bg-yellow-500 text-black' : 'bg-slate-800 text-white'}`}>
                                    {row.academic_rank}
                                </span>
                            </td>
                            <td className="px-6 py-4 font-medium text-white">{row.name}</td>
                            <td className="px-6 py-4">{row.program}</td>
                            <td className="px-6 py-4 text-center font-bold text-purple-400">{row.final_average}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </main>
  );
}