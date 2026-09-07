import { ProjectsMetrics } from "../components/projects/ProjectsMetrics";
import { TaskHistory } from "../components/projects/TaskHistory";
import { ProjectClientManager } from "../components/projects/ProjectClientManager";
import Link from "next/link";
import { getTask, getProject, getProjectsMetrics } from "@/services/services";
interface ProjectDetailProps {
  id: string;
}

export const ProjectDetail = async ({ id }: ProjectDetailProps) => {
  const [resMetrics, resProject, resTasks] = await Promise.all([
    getProjectsMetrics(id),
    getProject(id),
    getTask(id), 
  ]);

  if (resMetrics.error || resProject.error || !resProject.data || !resMetrics.data) {
    const errorMsg =
      resMetrics.error?.message ||
      resProject.error?.message ||
      "No se encontraron datos del proyecto. Vuelve al dashboard.";

    return (
      <div className="text-white p-10 text-center">
        <p>{errorMsg}</p>
        <Link href="/dashboard/projects" className="text-secundary underline mt-4 block">
          Ir a Proyectos
        </Link>
      </div>
    );
  }

  const project = resProject.data;
  const metrics = resMetrics.data;
  const projectTasks = resTasks.data || [];

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-6 py-8 lg:px-10">
      <div className="mb-8 flex flex-col gap-2">
        <Link href="/dashboard/projects" className="text-secundary text-[14px] font-semibold tracking-wider">
          Proyectos / {id?.replaceAll("-", " ")}
        </Link>
        <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl text-white">
          {project.client_name}
        </h1>
        <p className="text-slate-400 max-w-2xl">{project.description}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-10">
        <ProjectsMetrics 
          title="Horas" 
          data={`${metrics.total_hours}h`} 
          porcentaje="" 
          icon="schedule" 
          isPositive={true} 
        />

        <ProjectsMetrics 
          title="Tareas" 
          data={`${metrics.completed_tasks} / ${metrics.total_tasks}`} 
          porcentaje="" 
          icon="task_alt" 
          isPositive={true} 
        />

        <ProjectsMetrics 
          title="Eficiencia" 
          data={`${metrics.efficiency_percentage}%`} 
          porcentaje={metrics.efficiency_change > 0 ? `+${metrics.efficiency_change}%` : `${metrics.efficiency_change}%`} 
          icon="query_stats" 
          isPositive={metrics.efficiency_change >= 0} 
        />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <ProjectClientManager projectID={id} initialTasks={projectTasks} />
        <TaskHistory projectID={id} />
      </div>
    </main>
  );
};