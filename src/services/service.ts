import { supabase } from "../lib/supabase"

import type { 
  DataProyectType, 
  TaskItemProps, 
  ServiceResponse, 
  ServiceResponseData, 
  TaskHistoryItem, 
  ProjectDashboardMetrics,
  DashboardProjectMetric,
  TaskVagasProps
} from "../types/interface"

export const insertProject = async(dataProyect: DataProyectType ) : Promise<ServiceResponse>=>{
  try {
    const { error } = await supabase
    .from('projects')
    .insert([dataProyect])
    .select()

    if (error) {
      return { success: false, error: error.message}
    }
    
    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error Desconocido"
    return { success: false, error: message}
  }
}

export const editProject = async (id: string, dataActualizar: Omit<DataProyectType, 'status'>): Promise<ServiceResponse> => {
  try {
    const { error } = await supabase
      .from('projects')
      .update(dataActualizar)
      .eq('id', id);

    if (error) {
      return { success: false, error: error.message}
    }

    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error Desconocido"
    return { success: false, error: message}
  }
}

export const getProjects = async()=>{
  try {
    const response = await supabase
    .from('projects')
    .select('*')
    .order('inserted_at', {ascending: false})

    return response
  } catch (error) {
    return {data: null, error}    
  }
}

export const getTask = async(projectID: string | null) => {
  try{

    if (projectID) {
      const response = await supabase
      .from('tasks')
      .select('*')
      .eq('project_id', projectID)
      .eq('is_completed', false)
      .order('inserted_at', { ascending: false })
  
      return response
    }
    
    
      const response = await supabase
      .from('tasks')
      .select('*')
      .eq('is_completed', false)
      .order('inserted_at', { ascending: false })
  
      return response

  }catch(error){
    return {data: null, error}  
  }
}


export const insertTask = async(dataTask: TaskItemProps )=>{
  try {
    const response = await supabase
    .from('tasks')
    .insert([dataTask])
    .select()

    return response
  } catch (error) {
    return {data: null, error}
  }
}

export const editTask = async (id: string, dataActualizar: Omit<TaskItemProps, 'id'>): Promise<ServiceResponse> => {
  try {
    const { error } = await supabase
      .from('tasks')
      .update(dataActualizar)
      .eq('id', id);

    if (error) {
      return { success: false, error: error.message}
    }

    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error Desconocido"
    return { success: false, error: message}
  }
}

export const deleteTask = async (id: string) : Promise<ServiceResponse> =>{
  if(!id.trim()){
    return {success: false, error: 'el id es obligatorio'}
  }

  try {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);

    if(error) return {success: false, error: error.message}

    return {success: true}
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    return { success: false, error: message };
  }
}

export const completeTask = async(hours: number, id: string): Promise<ServiceResponse> =>{
  if (!hours && hours !== 0) {
    return {success: false, error: 'Las horas son obligatorias'}
  }

  const dataActualizar = {
    hours_spent: hours,
    is_completed: true,
  }

  try {
    const { error } = await supabase
    .from('tasks')
    .update(dataActualizar)
    .eq('id', id)

    if(error) return {success: false, error: error.message}

    return {success: true}
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    return { success: false, error: message };    
  }
}

export const deleteProject = async(id: string) : Promise<ServiceResponse> =>{
  try {
    const { error } = await supabase
    .from("projects")
    .delete()
    .eq('id', id)

    if(error){
      return { success: false, error: error.message }
    }

    return {success: true}
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    return { success: false, error: message };
  }
}

// Get Historial limitado a las últimas 10 completadas
export const getTaskComplete = async (projectID: string): Promise<ServiceResponseData<TaskHistoryItem[]>> => {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .select('title, completed_at')
      .eq('project_id', projectID)
      .eq('is_completed', true)
      .order('completed_at', { ascending: false })
      .limit(10);

    if (error) {
      // Ahora este objeto calza perfecto con ServiceResponseData
      return { data: null, error: { message: error.message } };
    }

    // data as TaskHistoryItem[] mapea el tipado de Supabase con tu interfaz
    return { data: (data as TaskHistoryItem[]) || [], error: null };

  } catch (error) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    return { data: null, error: { message } };
  }
};


export const getProjectsMetrics = async (projectID: string): Promise<ServiceResponseData<ProjectDashboardMetrics>> =>{
  
  try {

    const { data, error } = await supabase
      .from('project_dashboard_metrics')
      .select('*')
      .eq('project_id', projectID)
      .single();

    if (error) {
      return { data: null, error: { message: error.message } };
    }  

    return { data: data as ProjectDashboardMetrics, error: null };
    
  } catch (error) {
      const message = error instanceof Error ? error.message : "Error desconocido";
      return { data: null, error: { message } };
  }

}


export const getDashboardMetrics = async (): Promise<ServiceResponseData<DashboardProjectMetric[]>> => {
  try {
    const {data, error} = await supabase
    .from('projects')
    .select('client_name, budget')

    if(error){
      return { data: null, error: { message: error.message } }; 
    }

    return { data: data, error: null };

  } catch (error) {
      const message = error instanceof Error ? error.message : "Error desconocido";
      return { data: null, error: { message } };
  }
}

export const getTaskDashboard = async (): Promise<ServiceResponseData<TaskVagasProps[]>> => {
  try{
    
      const {data, error} = await supabase
      .from('tasks')
      .select('*')
      .eq('is_completed', false)
      .order('inserted_at', { ascending: false })
    
      if(error){
      return { data: null, error: { message: error.message } }; 
    }

      return { data: data, error: null };

  }catch(error){
      const message = error instanceof Error ? error.message : "Error desconocido";
      return { data: null, error: { message } };
  }
}