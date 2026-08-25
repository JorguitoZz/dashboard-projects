'use client'
import { useDataDashboard } from "@/hooks/dashboard/useDataDashboard"
import { TaskVagas } from "./TaskVagas"
import { EditTaskModal } from "../projects/EditTaskModal"
import { TaskModalComplete } from "../projects/TaskModalComplete"
import type { TaskItemProps, TaskVagasProps } from "@/types/interface"


interface DashboardClientManagerProps {
    dataTaskVagas: TaskVagasProps[];
}

export const DashboardClientManager = ({ dataTaskVagas }: DashboardClientManagerProps) => {


    const {
            modal,
            setModal,
            closeModal
     } = useDataDashboard() 

    return(
        <>
            {dataTaskVagas.map(task => (
                <TaskVagas key={task.id} {...task} setModal={setModal} />
            ))}

            {modal.isOpen && modal.type === "edit" && (
                <EditTaskModal 
                  closeModal={closeModal} 
                  task={modal.data as TaskItemProps | null}
                />
            )}
        
            {modal.isOpen && modal.type === "complete" && (
                <TaskModalComplete 
                  closeModal={closeModal} 
                  task={modal.data as TaskItemProps | null} 
                />
            )}
        </>
    )
}