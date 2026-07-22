import { useCallback, useEffect, useState } from "react"; 
import type { ModalState, TaskItemProps } from "../../types/interface"; // Usamos solo una interfaz consistente
import { getTask } from "../../services/service";

export const useTaskProjects = (
  projectID: string | null, 
) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tasks, setTasks] = useState<TaskItemProps[]>([]);
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    type: null,
    data: null,
  });

  const fetchTask = useCallback(async () => {
    if (!projectID) return; // Validación temprana antes de activar loaders innecesarios

    console.log('Ejecutando fetch de tareas...');
    setIsLoading(true);
    try {
      const response = await getTask(projectID);
      
      if (!response) {
        console.error('No se recibió respuesta de la base de datos');
        return;
      }

      const { data, error } = response;
      if (error) {
        console.error("Error de Supabase:", error);
        return;
      }

      setTasks((data as TaskItemProps[]) || []);
      console.log('Tareas cargadas con éxito');


    } catch (error) {
      console.error("Error en la petición:", error);
    } finally {
      setIsLoading(false);
    }
  }, [projectID]);

  useEffect(() => {
    fetchTask();
  }, [projectID, fetchTask]);

  const closeModal = () => {
    setModal({ isOpen: false, type: null, data: null });
  };

  return {
    closeModal,
    isLoading,
    tasks,
    modal,
    setModal,
    fetchTask
  };
};