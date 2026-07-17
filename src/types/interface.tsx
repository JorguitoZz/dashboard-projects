import type { Dispatch, SetStateAction } from 'react'; // Importación tipo para evitar errores de compilación

export type ServiceResponse = { success: boolean, error?: string}


export interface TaskHistoryItem {
  title: string;
  completed_at: string;
}

export type taskHistory = TaskHistoryItem[];

export interface ServiceResponseData<T> {
  data: T | null;
  error: { message: string } | null;
}

export type ModalType = 'add' | 'edit' | 'complete' | 'status_change' | 'delete' | null;

export interface TaskItemProps {
  id?: string;
  title: string;
  description?: string; // El "?" hace que sea opcional, arreglando el error de 'missing property'
  category?: string;    // Opcional para que el spread {...task} no falle
  status?: 'inProgress' | 'success' | 'pending'; // Agregado para que TaskVagas pueda usarlo
  priority?: boolean | string | null;
  project_id?: string;
}

export type TaskPreviewProps = Pick<TaskItemProps, 'id' | 'title' | 'description' | 'status'>;

export interface ModalState {
  isOpen: boolean;
  type?: ModalType;
  data: TaskItemProps | Project | null; 
}

// 3. Props para el componente TaskVagas
export interface TaskVagasProps extends TaskItemProps {
  setModal: Dispatch<SetStateAction<ModalState>>; 
}

// --- Interfaces de UI ---

export interface BadgeProps {
  text: string;
  variant: 'inProgress' | 'success' | 'pending' | 'urgent' | 'technology';
}

export interface StatCardProps {
  title: string;
  icon: React.ReactNode;
  data: string;
  color?: 'resaltado' | 'blue-400' | 'amber-400';
}

export interface IncomeItemProps {
  clientName: string;
  amount: number;
  totalGoal?: number;
}

export interface LayoutProps {
  children: React.ReactNode;
}

export interface ModalProps {
  closeModal: () => void;
  projectID?: string | null;
  onSuccess?: () => void;
  task?: TaskItemProps | null;
}

// --- Interfaces de Proyectos ---

export interface Project {
  id: string;
  client_name: string;
  project_type: 'Funnels & Automation' | 'Web Development' | 'IT Support' | 'Maintenance';
  category: 'Full-time' | 'Freelance' | 'On-demand';
  description: string;
  technologies: string[];
  payment_modality: 'Salary' | 'Recurring' | 'Per Project';
  budget: number;
  status: 'Active' | 'Completed';
  modality_work: string;
  onSucces?: () => void;
  handlerOpenModal?: (state: ModalState) => void 
}

// Omitimos los campos que la base de datos genera solos para la creación
export type DataProyectType = Omit<Project, 'id' | 'status' >;

export interface useSubmitTaskProps {
    projectID? : string,
    taskID?: string,
    onSuccess?: () => void,
    closeModal: () => void,
}

export interface ProjectDashboardMetrics {
  project_id: string;
  total_hours: number;
  completed_tasks: number;
  total_tasks: number;
  efficiency_percentage: number;
  efficiency_change: number;
}


export interface ProjectsMetricsProps {
  title: string;
  data: string;
  porcentaje: string;
  icon: string;
  isPositive: boolean;
}

export interface DashboardProjectMetric {
  client_name: string;
  budget: number;
}