import { useCallback, useEffect, useState } from "react";
import { getDashboardMetrics, getTaskDashboard  } from "../../services/service";
import type { TaskVagasProps, StatCardProps, DashboardProjectMetric, ModalState } from "../../types/interface";



export const useDataDashboard = ()=>{
    
    const [dashboardMetrics, setDashboardMetrics] = useState<DashboardProjectMetric[]>([]);
    const [dataTaskVagas, setDataTaskVagas] = useState<TaskVagasProps[]>([])
    const [modal, setModal] = useState<ModalState>({
        isOpen: false,
        type: null,
        data: null,
      });

    const closeModal = () => {
      setModal({ isOpen: false, type: null, data: null });
    };

   
    //get Budget and Projects 
    const getdataProjects = useCallback(async () => {
      try {
        const { data, error } = await getDashboardMetrics();
        
        if (error) {
          console.error(error.message); 
          return; 
        }
    
        if (data) {
          setDashboardMetrics(data);
        }
      } catch (error) {
        console.error(error);
      }
    }, []); 

    const getTask = useCallback(async () =>{
      try{
        const {data, error} = await getTaskDashboard()

        if (error) {
          console.error(error.message); 
          return;   
        }

        if (data) {
          setDataTaskVagas(data)
        }

      }catch (error) {
        console.error(error);
      }
    }, [])
    
    useEffect(() => {
      const fetchDashboardData = async () => {
        getdataProjects(); 
        getTask();
      };

      fetchDashboardData();
    }, [getdataProjects, getTask]);
      
      const totalMensual = dashboardMetrics.reduce((acc, current) => acc + current.budget, 0)
    
    
      const dataStatCard: StatCardProps[] = [
      {
        title: 'Total Mensual (USD)',
        icon: '💰',
        data: `$${totalMensual}`,
        color: 'resaltado',
      },
      {
        title: 'Tareas',
        icon: '⏱️',
        data: `${dataTaskVagas.length} Pendientes`,
        color: 'resaltado',
      },
      {
        title: 'Proyectos',
        icon: '🚀',
        data: `${dashboardMetrics.length} Activos`,
        color: 'resaltado',
      }
      ]
    
      const totalGoal = dashboardMetrics.reduce((acc: number, currValue: DashboardProjectMetric) => acc + currValue.budget, 0)


    return {
        totalGoal,
        dataStatCard,
        dataTaskVagas,
        dashboardMetrics,
        modal,
        setModal,
        getTask,
        closeModal
    }


}