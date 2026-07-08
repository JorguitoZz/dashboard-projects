import { useEffect, useState } from "react"
import type { taskHistory } from "../../types/interface"
import { getTaskComplete } from "../../services/service"

export const useHistoryTask = (projectID: string, dataRefresh : number) => {
    const [taskHistory, setTaskHistory] = useState<taskHistory | null>(null)

    useEffect(() => {
        const handleTask = async () => {
            const response = await getTaskComplete(projectID)
            
          
            if (response.data) {
                setTaskHistory(response.data)
            }
        }

        handleTask()
    }, [projectID, dataRefresh])

    return taskHistory
}