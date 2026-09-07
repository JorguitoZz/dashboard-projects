'use server'
import { insertProject } from "@/services/services";
import { ServiceResponse, DataProjectType  } from "@/types/interface";
import { revalidatePath } from "next/cache";


export const CreateProjectAction = async(dataProject: DataProjectType): Promise<ServiceResponse> =>{

    try {
        const {success, error} = await insertProject(dataProject)

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
