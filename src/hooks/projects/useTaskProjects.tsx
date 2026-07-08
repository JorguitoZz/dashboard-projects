import { useCallback, useEffect, useState } from "react"; 
import type { ModalState, TaskItemProps } from "../../types/interface"; // Usamos solo una interfaz consistente
import { getTask } from "../../services/service";

// 1. Corregido el nombre a useTaskProjects para que coincida con tu import externo
export const useTaskProjects = (
  projectID: string | null, 
  setRefreshTrigger: React.Dispatch<React.SetStateAction<number>>
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

      // Tipamos correctamente usando la interfaz que maneja tu estado local
      setTasks((data as TaskItemProps[]) || []);
      console.log('Tareas cargadas con éxito');
      
      // Se eliminó setRefreshTrigger de aquí para evitar re-renders infinitos al leer datos.

    } catch (error) {
      console.error("Error en la petición:", error);
    } finally {
      setIsLoading(false);
    }
  }, [projectID]); // Ya no necesita setRefreshTrigger en las dependencias

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