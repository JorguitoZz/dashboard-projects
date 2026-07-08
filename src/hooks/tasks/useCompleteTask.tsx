import { completeTask } from "../../services/service"
import type { useSubmitTaskProps } from "../../types/interface"


export const useCompleteTask =({onSuccess, closeModal, taskID}: useSubmitTaskProps) =>{

    const handlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    
    const hours = Number(formData.get('time-spent'))
    console.log('empezando')

    try {
      
      const { error } = await completeTask(hours, taskID!)

      if(error){
        console.log('malo')
        console.error(error)
        return
      }
        
      console.log('fino')
      if (onSuccess) {
        await onSuccess()
      }
      closeModal()

    } catch (error) {
      const message = error instanceof Error ? error.message : "Error desconocido";
      return { success: false, error: message };   
    }

  }

  return{
    handlerSubmit
  }

}