import { IncomeItem } from "../components/dashboard/IncomeItem";
import { StatCard } from "../components/dashboard/StatCard";
import { IncomeBreakdownSection } from "../components/layout/IncomeBreakdownSection";
import { StatCardsSection } from "../components/layout/StatCardsSection";
import { TaskVagasSection } from "../components/layout/TaskVagasSection";
import { getDashboardMetrics, getTaskDashboard } from "@/services/server-services";
import type { StatCardProps, DashboardProjectMetric } from "@/types/interface";
import { DashboardClientManager } from "../components/dashboard/dashboardClientManager";

export const HomeView = async() => {

  const getTask = async () =>{
        try{
          const {data, error} = await getTaskDashboard()
  
          if (error) {
            console.error(error.message); 
            return [];   
          }
  
          if (data) {
            return data
          }
  
        }catch (error) {
          console.error(error);
          return []
        }
      }

  const DataTaskVagas = await getTask()    

  const getdataProjects = async () => {
        try {
          const { data, error } = await getDashboardMetrics();
          
          if (error) {
            console.error(error.message); 
            return []
          }

          return data

        } catch (error) {
          console.error(error);
          return []
        }
      }

  const dashboardMetrics = await getdataProjects()    
      
  const totalGoal =  dashboardMetrics?.reduce((acc: number, currValue: DashboardProjectMetric) => {
          return acc + currValue.budget;
        }, 0);

        

  const dataStatCard : StatCardProps[] = [
        {
          title: 'Total Mensual (USD)',
          icon: '💰',
          data: `${totalGoal}`,
          color: 'resaltado',
        },
        {
          title: 'Tareas',
          icon: '⏱️',
          data: `${DataTaskVagas && DataTaskVagas?.length} Pendientes`,
          color: 'resaltado',
        },
        {
          title: 'Proyectos',
          icon: '🚀',
          data: `${dashboardMetrics?.length} Activos`,
          color: 'resaltado',
        }
        ]

return (

    <div className="pb-24 lg:pb-8"> {/* Padding extra en mobile para que la Sidebar no tape el contenido */}
        <StatCardsSection>
          {dataStatCard.map((e, i) => (
            <StatCard key={i} title={e.title} icon={e.icon} data={e.data} color={e.color} />
          ))}
        </StatCardsSection>

        <div className="flex flex-col lg:flex-row lg:w-[90%] lg:mx-auto lg:gap-5">
          <TaskVagasSection>
            <DashboardClientManager dataTaskVagas={DataTaskVagas ?? []} />
          </TaskVagasSection>

          <IncomeBreakdownSection>
            <IncomeItem clientName={'Ingresos Totales'} amount={totalGoal as number} totalGoal={totalGoal} />
            {dashboardMetrics!.map(e => (
              <IncomeItem key={e.client_name} clientName={e.client_name} amount={e.budget} totalGoal={totalGoal} />
            ))}
          </IncomeBreakdownSection>
        </div>
        
              
      </div>
);}