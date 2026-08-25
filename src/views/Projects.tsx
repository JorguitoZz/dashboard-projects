'use client'
import { ProjectCard } from "../components/projects/ProjectCard";
import { AddProjectModal } from "../components/projects/AddProjectModal";
import { SkeletonProjectCard } from "../components/skeletons/SkeletonProjectCard";
import type { Project, ModalState } from "../types/interface";
import { memo, useCallback, useState } from "react";


interface ProjectsProps {
  projects: Project[];
}

export const Projects = ({ projects }: ProjectsProps) => {
  
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

  const handlerModalClose = useCallback(() =>{
    handlerOpenModal({isOpen: false, data: null})
  }, [handlerOpenModal])

  const handlerModalOpen = useCallback(() =>{
    handlerOpenModal({isOpen: true, data: null})
  },[handlerOpenModal])
   

  return (
    <section className="w-[95%] py-5 m-auto">
      {/* Contenedor del encabezado con el botón */}
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-primary font-bold text-[30px]">
            Projects Dashboard
          </h1>
          <p className="text-secundary text-[16px]">Manage and monitor your active development workflow.</p>
        </div>

        <button 
          className="flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-4 py-2 rounded-lg text-sm font-bold  hover:text-background-dark transition-all duration-300 group" 
          onClick={()=>{handlerModalOpen()}}
          >
          <span className="material-symbols-outlined text-[18px] group-hover:rotate-90 transition-transform">add</span>
          Add Project
        </button>
      </div>
      
      <div className="flex flex-col gap-5 pb-20 pt-5 md:flex-row flex-wrap">
        
       {projects.length < 1 ? (
        [1, 2, 3].map((e) => <SkeletonProjectCard key={e} />)
        ) : projects.length > 0 ? (
          projects.map((proyecto) => (
            <ProjectCard key={proyecto.id} {...proyecto} handlerOpenModal={handlerOpenModal}/>
          ))
        ) : (
          <div className="col-span-full py-10 text-center">
            <p className="text-gray-500 text-lg">No existen proyectos todavía.</p>
            <span className="text-sm">¡Crea el primero usando el botón de arriba! 🚀</span>
          </div>
        )
      }
        
      </div>

      {openModal.isOpen && <AddProjectModal project={openModal.data as Project | null} closeModal={()=>{handlerModalClose()}}/>}  

    </section>
  )
}