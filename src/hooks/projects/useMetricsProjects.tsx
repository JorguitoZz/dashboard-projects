import { useEffect, useState } from "react"
import { getProjectsMetrics } from "../../services/service"
import type { ProjectDashboardMetrics } from "../../types/interface"

export const useMetricsProjects = (projectID: string, refreshTrigger: number) =>{

    const [metrics, setMetrics] = useState<ProjectDashboardMetrics | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(()=>{

        const fetchMetrics = async()=>{
            setLoading(true)

            const response = await getProjectsMetrics(projectID)

            if (response.error) {
                setError(response.error.message)
                setMetrics(null)
            } else {
                setMetrics(response.data)
                setError(null)
            }

            setLoading(false)
        }

        if (projectID) {
            fetchMetrics()
        }

    }, [projectID, refreshTrigger])


    return {metrics, error, loading}
    
}