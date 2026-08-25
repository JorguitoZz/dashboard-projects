import { useCallback, useEffect, useState } from "react";
import type { Project, ModalState } from "../../types/interface";


export const useGetProjects = () =>{
    
      


    return{
        openModal,
        handlerOpenModal,
        isLoading,
        setLoading,
        setOpenModal,
    } 
}