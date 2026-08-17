import { useEffect, useState } from "react"
import { getProject, getProjectsMetrics } from "../../services/service"
import type { ProjectDashboardMetrics, ProjectBasicInfo } from "../../types/interface"

export interface ProjectDashboardMetricsHook {
  metrics: ProjectDashboardMetrics;
  project: ProjectBasicInfo;
}

export const useMetricsProjects = (projectID: string, refreshTrigger: number) =>{



    const [data, setData] = useState<ProjectDashboardMetricsHook | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        if (!projectID) return;

        const fetchMetrics = async () => {
            setLoading(true);
            setError(null);

            try {
            const [resMetrics, resProject] = await Promise.all([
                getProjectsMetrics(projectID),
                getProject(projectID)
            ]);

            if (resMetrics.error || resProject.error) {
                const errorMsg = resMetrics.error?.message || resProject.error?.message || 'Error al cargar la información';
                setError(errorMsg);
                setData(null);
                return;
            }


            if (resMetrics.data && resProject.data) {
                setData({
                metrics: resMetrics.data,
                project: resProject.data
                });
            }
            } catch (err: any) {
            setError(err.message || 'Error inesperado al conectar con el servidor');
            } finally {
            setLoading(false);
            }
        };

        fetchMetrics();
    }, [projectID, refreshTrigger]);


    return {data, error, loading}
    
}