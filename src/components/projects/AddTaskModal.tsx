import { useCreateTask } from "../../hooks/tasks/useCreateTask";
import type { ModalProps} from "../../types/interface";

export const AddTaskModal = ({ closeModal, projectID, onSuccess }: ModalProps) => {
  

  const {isLoading, crearTarea} = useCreateTask({projectID, onSuccess, closeModal})

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-background-dark/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="w-full max-w-md bg-[#161E2E] border border-slate-800 rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/50">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-sm">add_task</span>
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">Nueva Tarea</span>
          </div>
          <button 
            className="text-slate-500 hover:text-white transition-colors" 
            onClick={closeModal}
            disabled={isLoading} // Deshabilitar si está cargando
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form className="p-8 space-y-5" onSubmit={crearTarea}>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-300">Nombre de la tarea</label>
            <input 
              className="w-full bg-slate-900 border border-slate-700 rounded-lg py-3 px-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all" 
              placeholder="Ej: Refactorizar cabecera..." 
              type="text"
              name="title"
              required
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-300">Descripción</label>
            <textarea 
              className="w-full bg-slate-900 border border-slate-700 rounded-lg py-3 px-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all min-h-25 resize-none" 
              placeholder="Detalles de lo que hay que hacer..." 
              name="description"
              disabled={isLoading}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-300">Categoría</label>
              <input 
                className="w-full bg-slate-900 border border-slate-700 rounded-lg py-3 px-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all" 
                placeholder="Ej: Frontend..." 
                type="text"
                name="category"
                disabled={isLoading}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-300">Prioridad</label>
              <div className="flex items-center h-full">
                <label className="relative flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    name="priority"
                    className="peer sr-only" 
                    disabled={isLoading}
                  />
                  <div className="h-6 w-11 rounded-full bg-slate-700 after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-red-500 peer-checked:after:translate-x-full peer-focus:ring-2 peer-focus:ring-red-500/20"></div>
                  <span className="text-sm font-medium text-slate-400 group-hover:text-white transition-colors">¿Urgente?</span>
                </label>
              </div>
            </div>
          </div>

          {/* Action Button con Feedback de Carga */}
          <div className="mt-6">
            <button 
              type="submit"
              disabled={isLoading}
              className={`group relative w-full overflow-hidden rounded-lg px-8 py-4 font-bold text-lg shadow-lg transition-all active:scale-[0.98]
                ${isLoading ? "bg-slate-700 text-slate-400 cursor-not-allowed" : "bg-primary text-background-dark shadow-primary/20 hover:shadow-primary/40"}`}
            >
              <div className="relative z-10 flex items-center justify-center gap-2">
                <span>{isLoading ? "Creando..." : "Crear Tarea"}</span>
                <span className={`material-symbols-outlined font-bold ${isLoading ? "animate-spin" : ""}`}>
                  {isLoading ? "progress_activity" : "send"}
                </span>
              </div>
              {!isLoading && (
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};