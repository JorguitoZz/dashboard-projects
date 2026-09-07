import { HistoryItem } from "./HistoryItem";
import { getTaskComplete } from "../../services/services";

interface TaskHistoryProps {
  projectID: string;
}

export const TaskHistory = async ({ projectID }: TaskHistoryProps) => {
  const response = await getTaskComplete(projectID);
  const taskHistory = response.data;

  return (
    <section className="flex flex-col">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight text-white">Historial</h2>
        <span className="text-slate-500 text-[10px] font-mono uppercase tracking-widest">
          Últimas 10 Completadas
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-card">
        <div className="max-h-72.5 overflow-y-auto divide-y divide-slate-800 custom-scrollbar">
          {taskHistory && taskHistory.length > 0 ? (
            taskHistory.map((task: any) => (
              <HistoryItem 
                key={task.title} 
                title={task.title} 
                completed_at={task.completed_at} 
              />
            ))
          ) : (
            <p className="p-4 text-sm text-slate-500 text-center">No hay tareas completadas todavía.</p>
          )}
        </div>      
        
        <div className="p-2 bg-slate-900/50 text-center border-t border-slate-800/60">
          <div className="text-slate-600 text-[10px] flex items-center justify-center gap-1 w-full font-mono uppercase tracking-wider select-none">
            <span className="material-symbols-outlined text-xs animate-bounce">keyboard_double_arrow_down</span>
            Desliza para ver más
          </div>
        </div>
      </div>
    </section>
  );
};