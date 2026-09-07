'use client'
import { useDataDashboard } from "@/hooks/dashboard/useDataDashboard"
import { TaskVagas } from "../dashboard/TaskVagas"
import { AddTaskModal } from "./AddTaskModal"
import { EditTaskModal } from "./EditTaskModal"
import { TaskModalComplete } from "./TaskModalComplete"
import type { TaskItemProps, TaskVagasProps } from "@/types/interface"

interface ProjectTasksManagerProps {
    projectID: string;
    initialTasks: TaskVagasProps[];
}

export const ProjectClientManager = ({ projectID, initialTasks }: ProjectTasksManagerProps) => {
    const { modal, setModal, closeModal } = useDataDashboard(); 

    return (
        <section className="flex flex-col">
            {/* Header con el botón de Add Task */}
            <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-bold tracking-tight text-white">Pending Tasks</h2>
                <button
                    className="flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary hover:text-background-dark transition-all duration-300 group"
                    onClick={() => setModal({ isOpen: true, type: "add", data: null })}
                >
                    <span className="material-symbols-outlined text-[18px] group-hover:rotate-90 transition-transform">add</span>
                    Add Task
                </button>
            </div>

            {/* Listado o estado vacío */}
            {initialTasks.length ? (
                <div className="custom-scrollbar max-h-87.5 overflow-y-auto pr-3 [mask-image:linear-gradient(to_bottom,white_85%,transparent)] flex flex-col gap-3">
                    {initialTasks.map(task => (
                        <TaskVagas key={task.title} {...task} setModal={setModal} />
                    ))}
                </div>
            ) : (
                <div className="py-10 text-center border-2 border-dashed border-slate-800 rounded-xl">
                    <p className="text-slate-500 italic">No hay tareas pendientes en este proyecto</p>
                </div>
            )}

            {/* Modales */}
            {modal.isOpen && modal.type === "add" && (
                <AddTaskModal 
                    closeModal={closeModal} 
                    projectID={projectID} 
                />
            )}

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
        </section>
    );
};