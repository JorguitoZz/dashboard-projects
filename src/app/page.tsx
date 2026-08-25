import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-[#080d1a] text-slate-200 font-sans flex flex-col justify-between p-6 lg:p-12 selection:bg-emerald-500 selection:text-black">
      {/* Header / Navbar */}
      <header className="flex justify-between items-center py-4 border-b border-slate-800/80 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <span className="font-extrabold text-xl tracking-wider text-white">
            JORGE<span className="text-emerald-400">.DEV</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-sm transition-all shadow-lg shadow-emerald-500/10"
          >
            Ir al Dashboard
          </Link>
        </div>
      </header>

      {/* Hero & Preview */}
      <main className="max-w-7xl mx-auto w-full my-10 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 bg-[#131b2e] border border-slate-800 px-3.5 py-1.5 rounded-full mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-xs font-semibold text-slate-300 tracking-wide uppercase">
            Sistema de Gestión de Proyectos
          </span>
        </div>

        <h1 className="text-4xl lg:text-6xl font-extrabold text-white tracking-tight max-w-3xl leading-tight">
          Control total de tus tareas e ingresos en USD.
        </h1>

        <p className="mt-4 text-slate-400 text-base lg:text-lg max-w-2xl">
          Consola centralizada para monitorear presupuestos activos, pendientes y métricas de clientes en tiempo real.
        </p>

        {/* Preview de Tarjetas (Estilo exacto a tu imagen) */}

        {/* CTA Button */}
        <div className="mt-12">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-500/20"
          >
            Abrir Mi Dashboard →
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 pt-6 text-center text-slate-500 text-xs max-w-7xl mx-auto w-full">
        <p>© {new Date().getFullYear()} JORGE.DEV - Todos los derechos reservados.</p>
      </footer>
    </div>
        
  );
}
