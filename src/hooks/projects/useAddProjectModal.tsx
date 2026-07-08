
import type { ModalProps } from "../../types/interface";
import type { DataProyectType } from "../../types/interface";
import { useState } from "react";
import { editProject, insertProject } from "../../services/service";

export const useAddProjectModal = ({ onSuccess, closeModal, projectID }: ModalProps) =>{

      const [isLoading, setIsloading] = useState<boolean>(false)
      const [error, setError] = useState<{ message: string; code?: string } | null>(null);
    
      const creaProyecto = async(e: React.FormEvent<HTMLFormElement>) =>{
    
        e.preventDefault()
    
        setIsloading(true)
    
        const formData = new FormData(e.currentTarget)
        
       const technologies = formData.get('technologies') as string || ""
    
       const dataProyect: DataProyectType = {
          client_name: formData.get('client_name') as string || "",
          project_type: formData.get('serviceType') as 'Funnels & Automation' | 'Web Development' | 'IT Support' | 'Maintenance',
          category: formData.get('category') as 'Full-time' | 'Freelance' | 'On-demand',
          description: formData.get('description') as string || "",
          modality_work: formData.get('modality_work') as string || "",
          payment_modality: formData.get('payment_modality') as 'Salary' | 'Recurring' | 'Per Project',
          budget: Number(formData.get('budget')) as number || 0,
          technologies: technologies ? technologies.split(',').map(t => t.trim()) as string[] || [] : [],
      }
    
       try{
        

        const {success, error} = projectID ? await editProject(projectID, dataProyect) : await insertProject(dataProyect)

    
        if (error) {
          setError({ message: error }); // Pasas el string 'error' a la propiedad 'message'
          return;
        }

    
        if (success) {
          
          if(onSuccess) await onSuccess()
          
          closeModal()
        }

    
       }catch(error){
        console.error(error)
       }finally{
        setIsloading(false)
       }
    
      }
      
      return{
        isLoading,
        error,
        creaProyecto
      }

}