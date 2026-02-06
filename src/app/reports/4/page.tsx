/* eslint-disable @typescript-eslint/no-explicit-any */
import { query } from '@/lib/db';
import Link from 'next/link';

export default async function Report4Page() {
  const result = await query('SELECT * FROM vw_attendance_by_group');
  const rows = result.rows;

  return (
    <main className="min-h-screen p-8 bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
            <Link href="/" className="px-4 py-2 bg-slate-800 rounded hover:bg-slate-700 transition">&larr; Volver</Link>
            <h1 className="text-3xl font-bold text-amber-500">Asistencia por Grupo</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rows.map((row: any, i: number) => {
                const pct = parseFloat(row.attendance_percentage);
                let color = "text-emerald-400";
                if(pct < 80) color = "text-amber-400";
                if(pct < 60) color = "text-red-400";

                return (
                    <div key={i} className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                        <h3 className="text-slate-400 text-sm font-medium mb-2 uppercase tracking-wider">Grupo</h3>
                        <p className="text-lg font-medium text-white mb-4">{row.group_label}</p>
                        
                        <div className="flex items-end justify-between">
                            <span className="text-slate-500 text-sm">Asistencia Promedio</span>
                            <span className={`text-3xl font-bold ${color}`}>{parseFloat(row.attendance_percentage).toFixed(1)}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-800 rounded-full mt-4 overflow-hidden">
                            <div className={`h-full ${pct < 60 ? 'bg-red-500' : pct < 80 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${pct}%` }}></div>
                        </div>
                    </div>
                )
            })}
        </div>
      </div>
    </main>
  );
}