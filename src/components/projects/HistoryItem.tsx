import type { TaskHistoryItem } from "../../types/interface";
import { formatHistoryDate } from "../../utils/formatDate"; // Ajusta la ruta a donde guardes la función

export const HistoryItem = ({ title, completed_at }: TaskHistoryItem) => {
  return (
    <div className="flex items-center justify-between p-4 hover:bg-slate-800/50 transition-colors group">
      <div className="flex items-center gap-3">
        <span className="material-symbols-outlined text-emerald-400 text-sm">
          check_circle
        </span>
        <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
          {title}
        </span>
      </div>
      {/* Pasamos la fecha de Supabase por la función de parseo */}
      <span className="text-[10px] font-mono text-slate-500">
        {formatHistoryDate(completed_at)}
      </span>
    </div>
  );
};