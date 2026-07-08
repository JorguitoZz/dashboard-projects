import { useState } from "react";
import { Badge } from "../ui/Badge";
import type { Project} from "../../types/interface";
import { Link } from "react-router-dom";
import { deleteProject } from "../../services/service";

export const ProjectCard = ({
  id,
  client_name,
  status,
  description,
  payment_modality,
  technologies,
  budget,
  category,
  modality_work,
  project_type,
  onSucces,
  handlerOpenModal,
}: Project) => {
  // Estado local para abrir/cerrar el menú
  const [showMenu, setShowMenu] = useState(false);

  // Lógica para que el color del pulso dependa del status
  const statusColor = status === "Active" ? "bg-[#10b981]" : "bg-amber-500";

  const handlerDelete = async () => {
    try {
      const { error } = await deleteProject(id);

      if (error) {
        console.log(error);
        return;
      }

      if (onSucces) {
        await onSucces();
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Error desconocido";
      return { success: false, error: message };
    }
  };
  

  const data: Project = {
    id,
    client_name,
    status,
    description,
    payment_modality,
    technologies,
    budget,
    category,
    modality_work,
    project_type
  }

  return (
    <Link
      to={`/dashboard/projects/${client_name.replaceAll(" ", "-").toLocaleLowerCase()}`}
      state={{ projectFromState: { id, client_name, description } }}
      className="flex flex-col w-full md:w-[46%] lg:w-[30%] transition-transform hover:-translate-y-1 relative"
    >
      <article className="flex flex-col h-full bg-fondo-2 p-6 rounded-2xl border border-stroke hover:border-resaltado/50 transition-all duration-300 shadow-sm group">
        {/* Top bar: Categoría y Menú */}
        <div className="flex justify-between items-center mb-5">
          <Badge text={category} variant={"pending"} />

          {/* Contenedor relativo del menú para que el absolute posicione bien */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation(); 
                setShowMenu(!showMenu);
              }}
              className="flex gap-1 items-center px-2 py-2 hover:bg-white/5 rounded-full transition-colors group/dots"
            >
              <div className="w-1 h-1 bg-secundary/40 rounded-full group-hover/dots:bg-resaltado transition-colors"></div>
              <div className="w-1 h-1 bg-secundary/40 rounded-full group-hover/dots:bg-resaltado transition-colors"></div>
              <div className="w-1 h-1 bg-secundary/40 rounded-full group-hover/dots:bg-resaltado transition-colors"></div>
            </button>

            {/* Dropdown del Tooltip con los botones */}
            {showMenu && (
              <>
                {/* Capa invisible para poder cerrar el menú haciendo clic fuera */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowMenu(false);
                  }}
                />

                <div className="absolute right-0 mt-2 w-32 bg-fondo-2 border border-stroke rounded-xl shadow-xl z-20 overflow-hidden">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setShowMenu(false);
                      handlerOpenModal?.({isOpen: true, data: data});
                    }}
                    className="flex items-center gap-2 w-full px-4 py-2.5 text-[13px] text-primary hover:bg-resaltado/10 hover:text-resaltado transition-colors border-b border-stroke/50 text-left"
                  >
                    {/* SVG de Edición */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="opacity-70"
                    >
                      <path d="M12 20h9"></path>
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                    </svg>
                    Editar
                  </button>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setShowMenu(false);
                      handlerDelete();
                    }}
                    className="flex items-center gap-2 w-full px-4 py-2.5 text-[13px] text-red-500 hover:bg-red-500/10 transition-colors text-left"
                  >
                    {/* SVG de Basura */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="opacity-70"
                    >
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                    Borrar
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <h3 className="text-primary text-[24px] font-bold leading-tight group-hover:text-white transition-colors">
            {client_name}
          </h3>
          <p className="text-secundary text-[15px] leading-relaxed line-clamp-3 h-17.5">
            {description}
          </p>
        </div>

        {/* Payment Type & Status Indicator */}
        <div className="flex items-center gap-2 mb-5">
          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-lg">
            {/* El color del pulso ahora es dinámico según el status */}
            <div
              className={`w-2 h-2 ${statusColor} rounded-full animate-pulse`}
            ></div>
            <span className="text-[#10b981] text-[11px] uppercase font-bold tracking-wider">
              {payment_modality}
            </span>
          </div>

          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-lg">
            {/* El color del pulso ahora es dinámico según el status */}
            <div
              className={`w-2 h-2 ${statusColor} rounded-full animate-pulse`}
            ></div>
            <span className="text-[#10b981] text-[11px] uppercase font-bold tracking-wider">
              {modality_work}
            </span>
          </div>
        </div>

        {/* Tecnologías */}
        <div className="flex gap-1.5 flex-wrap mb-6 min-h-7.5">
          {technologies.map((e) => (
            <Badge key={e} text={e} variant={"success"} />
          ))}
        </div>

        {/* Footer: Monto */}
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-stroke/40">
          <p className="text-secundary text-[14px] font-bold uppercase tracking-tighter">
            Total Proyecto
          </p>
          <div className="flex items-baseline gap-1">
            <span className="text-resaltado font-bold text-sm">$</span>
            <p className="text-primary text-[26px] font-black tracking-tight">
              {budget}
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
};
