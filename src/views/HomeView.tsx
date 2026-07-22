import { useCallback } from "react";
import { IncomeItem } from "../components/dashboard/IncomeItem";
import { StatCard } from "../components/dashboard/StatCard";
import { TaskVagas } from "../components/dashboard/TaskVagas";
import { IncomeBreakdownSection } from "../components/layout/IncomeBreakdownSection";
import { StatCardsSection } from "../components/layout/StatCardsSection";
import { TaskVagasSection } from "../components/layout/TaskVagasSection";
import { EditTaskModal } from "../components/projects/EditTaskModal";
import { TaskModalComplete } from "../components/projects/TaskModalComplete";
import { useDataDashboard } from "../hooks/dashboard/useDataDashboard";
import type { TaskItemProps} from "../types/interface";


export const HomeView = () => {

const {
        totalGoal,
        dataStatCard,
        dataTaskVagas,
        dashboardMetrics,
        modal,
        setModal,
        getTask,
        closeModal
 } = useDataDashboard()  
 
 const onSuccess = useCallback( async() =>{
        await getTask()
  }, [getTask])

return (

    <div className="pb-24 lg:pb-8"> {/* Padding extra en mobile para que la Sidebar no tape el contenido */}
        <StatCardsSection>
          {dataStatCard.map((e, i) => (
            <StatCard key={i} title={e.title} icon={e.icon} data={e.data} color={e.color} />
          ))}
        </StatCardsSection>

        <div className="flex flex-col lg:flex-row lg:w-[90%] lg:mx-auto lg:gap-5">
          <TaskVagasSection>
            {dataTaskVagas.map(task => (
              <TaskVagas key={task.id} {...task} setModal={setModal} onSuccess={onSuccess} />
            ))}
          </TaskVagasSection>

          <IncomeBreakdownSection>
            <IncomeItem clientName={'Ingresos Totales'} amount={totalGoal} totalGoal={totalGoal} />
            {dashboardMetrics.map(e => (
              <IncomeItem key={e.client_name} clientName={e.client_name} amount={e.budget} totalGoal={totalGoal} />
            ))}
          </IncomeBreakdownSection>
        </div>
        
              {modal.isOpen && modal.type === "edit" && (
                <EditTaskModal 
                  closeModal={closeModal} 
                  task={modal.data as TaskItemProps | null} 
                  onSuccess={getTask} 
                />
              )}
        
              {modal.isOpen && modal.type === "complete" && (
                <TaskModalComplete 
                  closeModal={closeModal} 
                  task={modal.data as TaskItemProps | null} 
                  onSuccess={getTask} 
        
                />
              )}
      </div>
);
};