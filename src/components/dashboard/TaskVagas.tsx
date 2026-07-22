import { Badge } from "../ui/Badge";
import type { TaskVagasProps } from "../../types/interface";
import { memo } from "react";
interface ExtendedTaskVagasProps extends TaskVagasProps {
  handlerDeleteTask: (id: string) => Promise<void>;
}

export const TaskVagas = memo(({
  id,
  title, 
  status, 
  description, 
  category,
  setModal, 
<<<<<<< HEAD
  handlerDeleteTask
}: ExtendedTaskVagasProps) => {
=======
  onSuccess, 
}: TaskVagasProps & { onSuccess: () => void }) => {
>>>>>>> main


  const isCompleted = status === 'success';
  

  return (
    <article className={`flex flex-col gap-3 bg-fondo-2 p-5 rounded-2xl border transition-all duration-300 group
      ${isCompleted ? "border-stroke opacity-60" : "border-stroke hover:border-resaltado/40 shadow-sm"}`}
    >
      {/* 1. Header: Checkbox + Título + Icono de Cambio de Estado */}
      <div className="flex justify-between items-start gap-4">
        <div className="flex gap-3 items-start flex-1">
          <input 
            type="checkbox" 
            checked={isCompleted}
            onChange={() => setModal?.({
              isOpen: true, 
              type: "complete", 
              data: { id, title, status, description }
            })}
            className="h-5 w-5 rounded border-stroke bg-transparent text-resaltado focus:ring-resaltado cursor-pointer transition-all checked:bg-resaltado mt-1"
          />
          
          <div className="flex flex-col gap-1">
            <h3 className={`text-primary text-[16px] font-bold leading-tight transition-all
              ${isCompleted ? "line-through text-secundary" : "group-hover:text-white"}`}>
              {title}
            </h3>
            
            {/* 2. Descripción justo debajo del nombre */}
            {description && (
              <p className={`text-secundary text-[12px] leading-relaxed ${isCompleted && "opacity-50"}`}>
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Icono para cambiar estatus (abre el selector de estado) */}
        <button 
          onClick={() => setModal?.({ isOpen: true, type: "status_change", data: { id, title, status }})}
          className="p-1.5 hover:bg-stroke rounded-lg transition-colors text-secundary hover:text-resaltado flex items-center justify-center"
          title="Cambiar estatus"
        >
          <span className="material-symbols-outlined text-[20px]">sync_alt</span>
        </button>
      </div>
        
      {/* Footer: Horas y Acciones rápidas */}
      <div className="flex justify-between items-center mt-2 pt-3 border-t border-stroke/30">
        
        <div className="flex gap-2 items-center">
          <Badge text={status as string} variant={status || 'pending'} />
        </div>

        {/* Acciones de edición y borrado */}
        <div className="flex gap-1">
          <button 
            onClick={() => setModal?.({ isOpen: true, type: "edit", data: { id, title, description, category, status }})}
            className="p-2 hover:bg-stroke rounded-xl transition-colors text-secundary hover:text-white flex items-center justify-center"
            title="Editar"
          >
            <span className="material-symbols-outlined text-[19px]">edit</span>
          </button>
          
          <button 
            onClick={() => id && handlerDeleteTask(id!)} 
            className="p-2 hover:bg-red-500/10 rounded-xl transition-colors text-secundary hover:text-red-500 flex items-center justify-center"
            title="Borrar"
          >
            <span className="material-symbols-outlined text-[19px]">close</span>
          </button>
        </div>
          
      </div>
    </article>
  );
})

TaskVagas.displayName = "TaskVagas";

