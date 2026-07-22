
import { useTaskProjects } from "../../hooks/projects/useTaskProjects";
import { TaskVagas } from "../dashboard/TaskVagas";
import { AddTaskModal } from "./AddTaskModal";
import { EditTaskModal } from "./EditTaskModal";
import { TaskModalComplete } from "./TaskModalComplete";
import type { TaskItemProps } from "../../types/interface"
import { memo } from "react";

export const TaskList = memo(({ projectID, setRefreshTrigger }: { projectID: string, setRefreshTrigger: React.Dispatch<React.SetStateAction<number>>; }) => {
  
  const { closeModal, isLoading, tasks, modal, setModal, fetchTask } = useTaskProjects(projectID)

  const handleActualizacion = () =>{
    fetchTask()
    setRefreshTrigger(prev => prev + 1)
  }

  return (
    <section className="flex flex-col">
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

      {/* Uso de isLoading para feedback visual */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-3">
            <span className="material-symbols-outlined animate-spin text-primary text-4xl">progress_activity</span>
            <p className="text-slate-400 text-sm font-medium">Cargando tareas...</p>
          </div>
        </div>
      ) : tasks.length ? (
        <div className="custom-scrollbar max-h-87.5 overflow-y-auto pr-3 [mask-image:linear-gradient(to_bottom,white_85%,transparent)] flex flex-col gap-3">
          {tasks.map((task) => (
            <TaskVagas key={task.id} {...task} setModal={setModal} onSuccess={handleActualizacion} />
          ))}
        </div>
      ) : (
        <div className="py-10 text-center border-2 border-dashed border-slate-800 rounded-xl">
          <p className="text-slate-500 italic">No hay tareas pendientes en este proyecto</p>
        </div>
      )}

      {/* Renderizado condicional de Modales */}
      {modal.isOpen && modal.type === "add" && (
        <AddTaskModal 
          closeModal={closeModal} 
          projectID={projectID} 
          onSuccess={handleActualizacion} 
        />
      )}

      {modal.isOpen && modal.type === "edit" && (
        <EditTaskModal 
          closeModal={closeModal} 
          task={modal.data as TaskItemProps | null} 
          onSuccess={handleActualizacion} 
        />
      )}

      {modal.isOpen && modal.type === "complete" && (
        <TaskModalComplete 
          closeModal={closeModal} 
          task={modal.data as TaskItemProps | null} 
          onSuccess={handleActualizacion} 

        />
      )}
    </section>
  );
});

TaskList.displayName = "TaskList";