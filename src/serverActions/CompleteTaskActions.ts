'use server'

import { completeTask } from "@/services/server-services";
import { ServiceResponse } from "@/types/interface";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";


export const complateTaskAction = async({formData, taskID} : {formData: FormData, taskID: string}) : Promise<ServiceResponse>  =>{

        const hours = Number(formData.get('time-spent'))

    try {
      
      if (taskID) {
        
        const { error } = await completeTask(hours, taskID!)
    
        if(error){
            return {success: false, error: error}
        }

        const headerList = await headers()
        const referer = headerList.get("referer")

        if (referer) {
            const url = new URL(referer)
            const currenPath = url.pathname
            revalidatePath(currenPath)
        }
        
        return{success: true}
      }

      return {success: false, error: "Id es indefinido"}

    } catch (error) {
      const message = error instanceof Error ? error.message : "Error desconocido";
      return { success: false, error: message };   
    }
}
