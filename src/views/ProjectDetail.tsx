import { ProjectsMetrics } from "../components/projects/ProjectsMetrics";
import { TaskList } from "../components/projects/TaskList";
import { TaskHistory } from "../components/projects/TaskHistory";
import { useState } from "react";
import { useMetricsProjects } from "../hooks/projects/useMetricsProjects";
import Link from "next/link";
import { useParams } from "next/navigation";


export const ProjectDetail = () => {

  const params = useParams()
  const id = params?.id as string

  const [refreshTrigger, setRefreshTrigger] = useState<number>(0); 

  const { data, error, loading } = useMetricsProjects(id, refreshTrigger);

  if (error) {
    return (
      <div className="text-white p-10 text-center">
        <p>No se encontraron datos del proyecto. Vuelve al dashboard.</p>
        <Link href="/dashboard/projects" className="text-secundary underline mt-4 block">Ir a Proyectos</Link>
      </div>
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-6 py-8 lg:px-10">
      
      <div className="mb-8 flex flex-col gap-2">
        <Link href="/dashboard/projects" className="text-secundary text-[14px] font-semibold tracking-wider">
          Proyectos / {id?.replaceAll("-", " ")}
        </Link>
        <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl text-white">
          {data?.project.client_name}
        </h1>
        <p className="text-slate-400 max-w-2xl">{data?.project.description}</p>
      </div>

      {/* PASO 2: Renderizado Dinámico de las Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-10">
        {loading || !data ? (
          <div className="col-span-3 text-slate-500 text-sm animate-pulse">
            Calculando métricas en tiempo real...
          </div>
        ) : error ? (
          <div className="col-span-3 text-red-400 text-sm">
            Error al cargar métricas: {error}
          </div>
        ) : (
          <>
            {/* CARD 1: HORAS REALES */}
            <ProjectsMetrics 
              title="Horas" 
              data={`${data.metrics.total_hours}h`} 
              porcentaje="" // Opcional si no requieres variación en horas
              icon="schedule" 
              isPositive={true} 
            />

            {/* CARD 2: CONTEO DE TAREAS */}
            <ProjectsMetrics 
              title="Tareas" 
              data={`${data.metrics.completed_tasks} / ${data.metrics.total_tasks}`} 
              porcentaje="" 
              icon="task_alt" 
              isPositive={true} 
            />

            {/* CARD 3: EFICIENCIA DE ORGANIZACIÓN + BADGE DINÁMICO */}
            <ProjectsMetrics 
              title="Eficiencia" 
              data={`${data.metrics.efficiency_percentage}%`} 
              porcentaje={data.metrics.efficiency_change > 0 ? `+${data.metrics.efficiency_change}%` : `${data.metrics.efficiency_change}%`} 
              icon="query_stats" 
              isPositive={data.metrics.efficiency_change >= 0} 
            />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Al completar una tarea aquí, se dispara setRefreshTrigger y actualiza TODO el flujo */}
        <TaskList projectID={id} setRefreshTrigger={setRefreshTrigger} />
        <TaskHistory projectID={id} dataRefresh={refreshTrigger} />
      </div>

    </main>
  );
};