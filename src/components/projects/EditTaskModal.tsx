import { useEditTaskModal } from "../../hooks/tasks/useEditTaskModal";
import type { ModalProps, TaskItemProps } from "../../types/interface";

interface EditModalProps extends ModalProps {
  task: TaskItemProps | null;
}

export const EditTaskModal = ({ closeModal, task, onSuccess }: EditModalProps) => {

  
  const {handleSubmit} = useEditTaskModal({taskID: task?.id, closeModal, onSuccess})
  
  if (!task) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-background-dark/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="w-full max-w-md bg-[#161E2E] border border-slate-800 rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/50">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-400 text-sm">edit_note</span>
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Editar Tarea: <span className="text-slate-200 italic lowercase">{task!.id?.slice(0,5)}...</span>
            </span>
          </div>
          <button className="text-slate-500 hover:text-white transition-colors" onClick={closeModal}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Campo Título con validación nativa HTML5 */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-300">Título de la Tarea</label>
              <input 
                name="title"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-amber-400/50 transition-all" 
                defaultValue={task!.title}
                placeholder="Ej: Refactor Auth Middleware"
                type="text"
                required // Validación de navegador
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-300">Descripción</label>
              <textarea 
                name="description"
                rows={4}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-amber-400/50 transition-all resize-none" 
                defaultValue={task!.description || ""}
                placeholder="Detalla los pasos..."
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-300">Estatus</label>
              <div className="relative">
                <select 
                  name="status"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-amber-400/50 transition-all appearance-none cursor-pointer"
                  defaultValue={task!.status || "pending"}
                >
                  <option value="pending">Pendiente</option>
                  <option value="inProgress">En Progreso</option>
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                  expand_more
                </span>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-3">
              <button type="submit" className="w-full bg-amber-400 text-background-dark font-bold py-4 rounded-lg shadow-lg hover:bg-amber-300 transition-all active:scale-[0.98]">
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};