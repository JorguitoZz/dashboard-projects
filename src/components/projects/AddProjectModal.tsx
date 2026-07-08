
import { useAddProjectModal } from "../../hooks/projects/useAddProjectModal";
import type { ModalProps, Project } from "../../types/interface";


interface EditModalProjectProps extends ModalProps {
  project?: Project | null;
}


export const AddProjectModal = ({ onSuccess, closeModal, project }: EditModalProjectProps) => {

  const { isLoading, error, creaProyecto } = useAddProjectModal({onSuccess, closeModal, projectID : project?.id})

  console.log(error)

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-background-dark/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="w-full max-w-lg bg-[#161E2E] border border-slate-800 rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/50">
          
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-sm">folder_managed</span>
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">Nuevo Proyecto</span>
          </div>
          
          <button 
            className="text-slate-500 hover:text-white transition-colors" 
            onClick={closeModal}
            type="button"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        
        </div>

        {/* Body del Formulario */}
        {isLoading ?
        <div className="flex items-center justify-center gap-3 py-10">
          {/* El círculo animado */}
          <svg className="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          
          {/* Texto de estado */}
          <span className="font-bold text-primary">Lanzando proyecto...</span>
        </div>
        :
        <form className="p-8 space-y-5 overflow-auto max-h-[80vh] custom-scroll" onSubmit={creaProyecto}>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-300">Nombre del Proyecto</label>
              <input  
                name="client_name"
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all" 
                placeholder="Ej: Dashboard Susy" 
                type="text"
                defaultValue={project?.client_name ?? ""}
              />
          </div>
          
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-300">Tipo de servicio</label>
              <div className="relative"> 
                <select 
                  name="project_type"
                  required
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all appearance-none cursor-pointer"
                  defaultValue={project?.project_type ?? "Funnels & Automation"}
                >
                  <option value="Funnels & Automation">Funnels & Automation</option>
                  <option value="Web Development">Web Development</option>
                  <option value="IT Support">IT Support</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
                {/* Opcional: un pequeño indicador visual de que es un select ya que usas appearance-none */}
                <span className="material-symbols-outlined absolute right-4 top-3 text-slate-500 pointer-events-none">
                  expand_more
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-300">Categoría</label>
              <div className="relative"> 
                <select 
                  name="category"
                  required
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all appearance-none cursor-pointer"
                  defaultValue={project?.category ?? "Full-time"}
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Freelance">Freelance</option>
                  <option value="On-demand">On-demand</option>
                </select>
                {/* Opcional: un pequeño indicador visual de que es un select ya que usas appearance-none */}
                <span className="material-symbols-outlined absolute right-4 top-3 text-slate-500 pointer-events-none">
                  expand_more
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-300">Descripción del Proyecto</label>
            <textarea 
              name="description"
              placeholder="Describe brevemente el alcance del proyecto..."
              rows={4}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all resize-none"
              defaultValue={project?.description ?? ""}
            />
          </div> 

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-300">Tipo de Pago</label>
              <select 
                name="payment_modality"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all appearance-none"
                defaultValue={project?.payment_modality ?? "Salary"}
              >
                <option value="Salary">Salary</option>
                <option value="Recurring">Recurring</option>
                <option value="Per Project">Per Project</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-300">Precio / Presupuesto ($)</label>
              <input  
                name="budget"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all" 
                placeholder="0.00" 
                type="number"
                defaultValue={project?.budget ?? ""}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-300">Tecnologías</label>
            <input  
              name="technologies"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all" 
              placeholder="React, Tailwind, Supabase..." 
              type="text"
              defaultValue={project?.technologies ?? ""}
            />
          </div>

          <div className="mt-4">
            <button 
              type="submit"
              className="group relative w-full overflow-hidden rounded-lg bg-primary px-8 py-4 text-background-dark font-bold text-lg shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-[0.98]"
            >
              <div className="relative z-10 flex items-center justify-center gap-2">
                <span>{project ? "Editar Proyecto" : "Crear Proyecto"}</span>
                <span className="material-symbols-outlined font-bold">send</span>
              </div>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </div>

        </form>
        }

        {error && <p>Error al enviar el formulario</p>}

      </div>
    </div>
  );
};