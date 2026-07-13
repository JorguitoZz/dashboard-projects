import type { LayoutProps } from "../../types/interface";
import { memo } from "react";

export const TaskVagasSection = memo(({children}:LayoutProps) =>{

    return(
        <section className="w-[90%] mx-auto pb-6 lg:w-[70%]">
            <h2 className="text-primary font-bold text-[18px] mb-4">Task & Vagas</h2>
            <div className="flex flex-col gap-3">
                {children}    
            </div>
        </section>
    )
})

TaskVagasSection.displayName = "TaskVagasSection";