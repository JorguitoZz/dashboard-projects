'use server'
import { deleteTask } from "@/services/service";
import { ServiceResponse } from "@/types/interface";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";


export const deleteTaskAction = async(id: string) : Promise<ServiceResponse>  =>{

    try{
        const res = await deleteTask(id);
        
        if (res.success) {
            const headerList = await headers()
            const referer = headerList.get("referer")
            
            if (referer) {
                const url = new URL(referer)
                const currenPath = url.pathname
                revalidatePath(currenPath)
            }
            
            return {success: true}

        } else {
            return {success: false, error : res.error}
        }    
    }catch(error){
        const message = error instanceof Error ? error.message : "Error desconocido";
        return { success: false, error: message };           
    }
}