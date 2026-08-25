import { getProjects } from "@/services/server-services";
import type { Project } from "@/types/interface";
import { Projects, Projects as ProjectView } from "@/views/Projects";

export default async function ProjectsPage() {
  const fetchProjects = async (): Promise<Project[]> => {
    try {
      const { data, error } = await getProjects();
          
      if (error) {
        console.error("Error al obtener proyectos:", error);
        return [];
      }

      return (data as Project[]) || [];
    
    } catch (error) {
      console.error("Error inesperado:", error);
      return []; 
    }
  };
  
  const projectList = await fetchProjects();

  return <Projects projects={projectList} />;
}