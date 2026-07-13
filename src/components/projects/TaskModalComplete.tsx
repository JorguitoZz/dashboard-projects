import { useCompleteTask } from "../../hooks/tasks/useCompleteTask";
import type { ModalProps } from "../../types/interface";

export const TaskModalComplete = ({ closeModal, onSuccess, task }: ModalProps) => {
  
  const {handlerSubmit} = useCompleteTask({closeModal, onSuccess, taskID : task?.id})
  
  if (!task) return null;
  

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-background-dark/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
      
     
      <div className="w-full max-w-md bg-[#161E2E] border border-slate-800 rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/50">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-sm">timer</span>
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">Control de Tiempo</span>
          </div>
          <button 
            className="text-slate-500 hover:text-white transition-colors" 
            onClick={closeModal}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Cuerpo de la Modal */}
        <form onSubmit={handlerSubmit} className="p-8">
          
          <div className="mb-8 p-4 rounded-lg bg-slate-800/30 border border-slate-700/50 flex items-center gap-4">
            <div className="size-16 shrink-0 rounded-lg bg-slate-700 flex items-center justify-center overflow-hidden border border-slate-600">
                <span className="material-symbols-outlined text-slate-500 text-3xl">terminal</span>
            </div>
            
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-primary uppercase tracking-tighter">Tarea Actual</span>
              
              <h3 className="text-lg font-bold text-white leading-tight">{task!.title}</h3>
              
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-300" htmlFor="time-spent">
                Tiempo real invertido (Horas)
              </label>
              <div className="relative group">
                <input 
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg py-4 px-5 text-white text-xl font-semibold placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all" 
                  id="time-spent" 
                  placeholder="0.0" 
                  type="text"
                  name="time-spent"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 flex items-center gap-2">
                  <span className="text-sm font-medium">hrs</span>
                  <span className="material-symbols-outlined text-primary">schedule</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <button className="group relative w-full overflow-hidden rounded-lg bg-primary px-8 py-4 text-background-dark font-bold text-lg shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-[0.98]">
              <div className="relative z-10 flex items-center justify-center gap-2">
                <span>Confirmar y Completar</span>
                <span className="material-symbols-outlined font-bold">check_circle</span>
              </div>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
            
            <button type="button" className="w-full mt-4 text-slate-500 hover:text-slate-300 text-sm font-medium transition-colors" onClick={closeModal}>
                Cancelar y seguir rastreando
            </button>
          </div>
        </form>

        <div className="px-8 pb-6 flex items-center gap-3">
          <div className="h-1 flex-1 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-primary w-3/4 rounded-full"></div>
          </div>
          <span className="text-[10px] text-slate-500 font-bold whitespace-nowrap uppercase tracking-widest">75% del Sprint completado</span>
        </div>

      </div>
    </div>
  );
};