'use server'
import { deleteProject } from "@/services/services";
import { ServiceResponse} from "@/types/interface";
import { revalidatePath } from "next/cache";



export const deleteProjectAction = async(projectID: string): Promise<ServiceResponse> =>{

    try {
        const {success, error} = await deleteProject(projectID)

        if(error){
            console.error(error)
            return{success, error}
        }

        
        revalidatePath('/projects')
        return {success}

    } catch (error) {
        const message = error instanceof Error ? error.message : "Error desconocido";
        return { success: false, error: message };   
    }

}