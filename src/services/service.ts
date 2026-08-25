import { createClient } from "@/lib/supabase/client"



import type { 
  TaskItemProps, 
  ServiceResponse, 
  ServiceResponseData, 
  TaskHistoryItem, 
  ProjectDashboardMetrics,
  ProjectBasicInfo
} from "../types/interface"


export const getTask = async(projectID: string | null) => {
  try{
    const supabase = await createClient()

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

    const supabase = await createClient()

    const response = await supabase
    .from('tasks')
    .insert([dataTask])
    .select()

    return response
  } catch (error) {
    return {data: null, error}
  }
}



export const deleteTask = async (id: string) : Promise<ServiceResponse> =>{
  if(!id.trim()){
    return {success: false, error: 'el id es obligatorio'}
  }

  try {
    const supabase = await createClient()

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


// Get Historial limitado a las últimas 10 completadas
export const getTaskComplete = async (projectID: string): Promise<ServiceResponseData<TaskHistoryItem[]>> => {
  try {
    const supabase = await createClient()

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
    

    // data as TaskHistoryItem[] mapea el tipado de createClient() con tu interfaz
    return { data: (data as TaskHistoryItem[]) || [], error: null };

  } catch (error) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    return { data: null, error: { message } };
  }
};


export const getProjectsMetrics = async (projectID: string): Promise<ServiceResponseData<ProjectDashboardMetrics>> =>{
  
  try {
    const supabase = await createClient()

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

export const getProject = async(projectID: string) : Promise<ServiceResponseData<ProjectBasicInfo>>=>{
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
    .from('projects')
    .select('client_name, description')
    .eq('id', projectID)
    .single()

    if (error) {
      return { data: null, error: { message: error.message } };
    }  
    return { data: data as ProjectBasicInfo, error: null };
    
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    return { data: null, error: { message } };
  }
}
