import Link from 'next/link';

export default function Home() {
  const reports = [
    {
      id: 1,
      title: "Rendimiento por Materia",
      desc: "Promedios y reprobados por curso y periodo.",
      link: "/reports/1",
      color: "bg-blue-600"
    },
    {
      id: 2,
      title: "Carga Docente",
      desc: "Grupos y alumnos totales por profesor.",
      link: "/reports/2",
      color: "bg-emerald-600"
    },
    {
      id: 3,
      title: "Alumnos en Riesgo",
      desc: "Estudiantes con promedio bajo (< 6.0).",
      link: "/reports/3",
      color: "bg-red-600"
    },
    {
      id: 4,
      title: "Asistencia por Grupo",
      desc: "% de asistencia promedio por grupo.",
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
    <main className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        🎓 Dashboard Académico
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <Link href={report.link} key={report.id} className="block group">
            <div className={`h-full p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow bg-white border border-gray-100`}>
              <div className={`w-12 h-12 rounded-lg ${report.color} mb-4 flex items-center justify-center text-white font-bold text-xl`}>
                {report.id}
              </div>
              <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 mb-2">
                {report.title}
              </h2>
              <p className="text-gray-500">
                {report.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}