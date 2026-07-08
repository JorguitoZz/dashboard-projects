import { useState } from "react"; // 1. Importamos useState
import { insertTask } from "../../services/service";
import type { TaskItemProps, useSubmitTaskProps } from "../../types/interface";


export const useCreateTask = ({projectID, onSuccess = () => {}, closeModal }: useSubmitTaskProps) =>{

const [isLoading, setIsLoading] = useState(false);

  const crearTarea = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true); 
    
    const formData = new FormData(e.currentTarget);

    
    const dataTarea: TaskItemProps = { 
        project_id: projectID,
        title: formData.get('title') as string || "",
        description: formData.get('description') as string || "",
        category: formData.get('category') as string || "",
        priority: formData.get('priority') ? true : null,
        status: 'pending', // Ahora esto sí será válido
    };

    try {
      const response = await insertTask(dataTarea);

      if (!response) {
        console.log('error, la base de datos no ha respondido');
        return;
      }

      const { data, error } = response;

      if (error) {
        console.error(error);
        return;
      }

      console.log("Tarea creada:", data);
      
      if(onSuccess){
        await onSuccess()
      }
      closeModal();

    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // 5. Terminamos el loading pase lo que pase
    }
  };

  return{
    isLoading,
    crearTarea
  }


}  