import { editTask } from "../../services/service";
import type { useSubmitTaskProps, TaskItemProps } from "../../types/interface";

export const useEditTaskModal = ({taskID, closeModal = () => {}, onSuccess} : useSubmitTaskProps)  =>{

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dataForm = new FormData(e.currentTarget);
    
    // 2. VALIDACIÓN DE DATOS: Obtenemos los valores limpiando espacios
    const title = dataForm.get('title')?.toString().trim();
    const description = dataForm.get('description')?.toString().trim();
    const status = dataForm.get('status') as TaskItemProps['status'];

    // 3. VÁLVULA DE SEGURIDAD: Si el título está vacío, detenemos el envío.
    if (!title) {
      return alert("El título es obligatorio para actualizar la tarea.");
    }

    const camposAEditar: Omit<TaskItemProps, 'id'> = {
      title,
      description: description || "", // Si es nulo, mandamos string vacío
      status: status || 'pending',
    };

    try {
      // 4. VERIFICACIÓN DE ID: Solo intentamos si tenemos el ID
      if (taskID) {
        const { error } = await editTask(taskID, camposAEditar);
        
        if (error) {
          console.error("Error de Supabase:", error);
          return alert("No se pudo actualizar la tarea en la base de datos.");
        }

        closeModal();
        if (onSuccess) await onSuccess();
      }
    } catch (error) {
      console.error("Error crítico en el submit:", error);
    }
  };    

  return {handleSubmit}

}