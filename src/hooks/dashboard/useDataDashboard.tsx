import { useCallback, useState } from "react";
import type { ModalState } from "../../types/interface";



export const useDataDashboard = ()=>{
    
    const [modal, setModal] = useState<ModalState>({
        isOpen: false,
        type: null,
        data: null,
      });

    const closeModal = useCallback(() => {
      setModal({ isOpen: false, type: null, data: null });
    }, []);



    return {
            modal,
            setModal,
            closeModal
    }


}
