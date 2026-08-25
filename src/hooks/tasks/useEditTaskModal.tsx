import { editTaskAction } from "@/serverActions/EdiTasks";
import type { useSubmitTaskProps, TaskItemProps } from "../../types/interface";

export const useEditTaskModal = ({taskID, closeModal = () => {}} : useSubmitTaskProps)  =>{

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dataForm = new FormData(e.currentTarget);
    
    try {
      // 4. VERIFICACIÓN DE ID: Solo intentamos si tenemos el ID
      if (taskID) {
        const response = await editTaskAction({formData: dataForm, taskID});
        
        if (!response || !response.success) {
          console.error("Error de Supabase:", response?.error);
          return alert("No se pudo actualizar la tarea en la base de datos.");
        }

        closeModal();
      }
    } catch (error) {
      console.error("Error crítico en el submit:", error);
    }
  };    

  return {handleSubmit}

}