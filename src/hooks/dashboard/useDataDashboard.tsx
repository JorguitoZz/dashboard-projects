import { useCallback, useEffect, useMemo, useState } from "react";
import { getDashboardMetrics, getTaskDashboard  } from "../../services/service";
import type { TaskVagasProps, StatCardProps, DashboardProjectMetric, ModalState } from "../../types/interface";



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
