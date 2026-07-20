import { useCallback, useEffect, useState } from "react";
import { getProjects } from "../../services/service";
import type { Project, ModalState } from "../../types/interface";


export const useGetProjects = () =>{
      const [projectList, setProjectList] = useState<Project[]>([])
    
      const [openModal, setOpenModal] = useState<ModalState >({
            isOpen: false,
            data: null,
      });
    
      const handlerOpenModal = useCallback(({isOpen, data}: ModalState) =>{
        setOpenModal({
          isOpen,
          data
        })
      }, [])
    
      const [isLoading, setLoading] = useState<boolean>(true)
    
    
      const fetchProjects = useCallback(async () => {
      
      setLoading(true);
      try {
        const { data, error } = await getProjects();
          
        if (!error) {
          setProjectList((data as Project[]) || []);
        }
    
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, []);
    
    useEffect(() => {
      const loadData = async () => {
        await fetchProjects();
      };
    
      loadData();
    }, [fetchProjects]);

    return{
        projectList,
        openModal,
        handlerOpenModal,
        isLoading,
        setOpenModal, 
        fetchProjects
    } 
}