'use server'

import { editTask } from "@/services/server-services";
import type { ServiceResponse, TaskItemProps } from "@/types/interface";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export const  editTaskAction = async ({formData, taskID} :{formData: FormData, taskID: string} ): Promise<ServiceResponse> =>{

    
    const dataForm = formData

    const title = dataForm.get('title')?.toString().trim();
    const description = dataForm.get('description')?.toString().trim();
    const status = dataForm.get('status') as TaskItemProps['status'];


    if (!title) {
        return { success: false, error: "El título es obligatorio para actualizar la tarea." };
    }

    const camposAEditar: Omit<TaskItemProps, 'id'> = {
      title,
      description: description || "", 
      status: status || 'pending',
    };

    try {
      if (taskID) {
        const { error } = await editTask(taskID, camposAEditar);
        
        if (error) {
          console.error("Error de Supabase:", error);
          return {success: false, error: error};
        }

        const headerList = await headers();
        const referer = headerList.get("referer");

        if (referer) {
          const url = new URL(referer);
          const currentPath = url.pathname; 
          revalidatePath(currentPath)
        }

        return {success: true};

      }

      return {success: false, error: 'el ID es indefinido'};

    } catch (error) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    return { success: false, error: message };

    }
};    
  
