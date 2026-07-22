import { memo } from "react";
import type { ProjectsMetricsProps } from "../../types/interface";

export const ProjectsMetrics = memo(({ title, data, porcentaje, icon, isPositive }: ProjectsMetricsProps) => {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-slate-800 bg-slate-card p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-slate-400 text-sm font-medium">{title}</p>
        <span className="material-symbols-outlined text-primary/40 text-[20px]">
          {icon}
        </span>
      </div>

      <div className="flex items-baseline gap-2">
        <p className="text-3xl font-bold text-white">{data}</p>
        
        {/* Solo renderizamos el badge si porcentaje tiene texto real */}
        {porcentaje && porcentaje !== "" && porcentaje !== "0%" && (
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
            isPositive ? "text-emerald-400 bg-emerald-400/10" : "text-rose-400 bg-rose-400/10"
          }`}>
            {porcentaje}
          </span>
        )}
      </div>
    </div>
  );
});