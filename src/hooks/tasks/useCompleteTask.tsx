import { complateTaskAction } from "@/serverActions/CompleteTaskActions"
import type { useSubmitTaskProps } from "../../types/interface"


export const useCompleteTask =({closeModal, taskID}: useSubmitTaskProps) =>{

    const handlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    

      try{
  
        if (taskID) {
          const {error} = await complateTaskAction({formData, taskID})
  
          if (error) {
            console.error(error)
            return error
          }
           
          closeModal()
        }
  
      }catch(error){
        const message = error instanceof Error ? error.message : "Error desconocido";
        return { success: false, error: message };
    
      }
    }
    
  return{
    handlerSubmit
  }
}
