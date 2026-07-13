import { useCallback, useEffect, useMemo, useState } from "react";
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

    const closeModal = useCallback(() => {
      setModal({ isOpen: false, type: null, data: null });
    }, []);


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
    
    const totalGoal = useMemo(() => {
      return dashboardMetrics.reduce((acc: number, currValue: DashboardProjectMetric) => {
        return acc + currValue.budget;
      }, 0);
    }, [dashboardMetrics]);
    
      const dataStatCard = useMemo((): StatCardProps[] => [
      {
        title: 'Total Mensual (USD)',
        icon: '💰',
        data: `$${totalGoal}`,
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
      ], [totalGoal, dataTaskVagas.length, dashboardMetrics.length])
    



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