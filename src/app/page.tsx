import Link from 'next/link';

export default function Home() {
  const reports = [
    {
      id: 1,
      title: "Rendimiento por Materia",
      desc: "Aprobados y reprobados por curso.",
      link: "/reports/1",
      color: "bg-blue-600"
    },
    {
      id: 2,
      title: "Carga Docente",
      desc: "Análisis de grupos y alumnos por profesor.",
      link: "/reports/2",
      color: "bg-emerald-600"
    },
    {
      id: 3,
      title: "Alumnos en Riesgo",
      desc: "Estudiantes con promedio crítico.",
      link: "/reports/3",
      color: "bg-red-600"
    },
    {
      id: 4,
      title: "Asistencia Grupal",
      desc: "Porcentaje de asistencia por grupo.",
      link: "/reports/4",
      color: "bg-amber-600"
    },
    {
      id: 5,
      title: "Ranking Académico",
      desc: "Top estudiantes por programa.",
      link: "/reports/5",
      color: "bg-purple-600"
    }
  ];

  return (
    <main className="min-h-screen p-8 bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 tracking-tight">
          Panel de Control
        </h1>
        <p className="text-slate-400 mb-10">
          Selecciona un reporte para visualizar las métricas en tiempo real.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => (
            <Link href={report.link} key={report.id} className="block group">
              <div className="h-full p-6 rounded-xl border border-slate-800 bg-slate-900 hover:border-slate-600 hover:bg-slate-800 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-lg ${report.color} flex items-center justify-center text-white font-bold shadow-lg shadow-${report.color}/20`}>
                    {report.id}
                  </div>
                  <span className="text-slate-500 text-sm group-hover:text-slate-300 transition-colors">Ver reporte &rarr;</span>
                </div>
                
                <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                  {report.title}
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {report.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}