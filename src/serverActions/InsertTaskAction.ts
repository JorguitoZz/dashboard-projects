'use server'
import { ServiceResponse} from "@/types/interface";
import { revalidatePath } from "next/cache";
import type { TaskItemProps } from '../types/interface'
import { insertTask } from "@/services/services";

export const insertTaskAction = async(dataTask: TaskItemProps): Promise<ServiceResponse> =>{

    if (dataTask) {
        try {
            const response = await await insertTask(dataTask)
    
            if(response.error){
                return{success: false, error: `${response.error}`}
            }
    
            
            revalidatePath(`/projects-${dataTask.project_id}`)
            return {success: true}
    
        } catch (error) {
            const message = error instanceof Error ? error.message : "Error desconocido";
            return { success: false, error: message };   
        }
    }

    return {success: false, error: 'Envia los datos de la tarea'}


}