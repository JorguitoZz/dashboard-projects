'use server'
import { editProject} from "@/services/server-services";
import { ServiceResponse, DataProjectType  } from "@/types/interface";
import { revalidatePath } from "next/cache";



export const editProjectAction = async({projectID, dataProject}: {projectID: string, dataProject: DataProjectType}): Promise<ServiceResponse> =>{

    try {
        const {success, error} = await editProject(projectID, dataProject)

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