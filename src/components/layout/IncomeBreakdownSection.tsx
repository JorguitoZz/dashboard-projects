import { memo } from "react";
import type { LayoutProps } from "../../types/interface";


export const IncomeBreakdownSection = memo(({children}: LayoutProps) =>{

    return(
        <section className="w-[90%] mx-auto pb-6 lg:w-[30%]">
            <h2 className="text-primary font-bold text-[18px] mb-4">Income Breakdown</h2>
                <div className="flex flex-col gap-3">
                    <article className="flex flex-col overflow-hidden bg-fondo-2 rounded-2xl border border-stroke">
                        
                    {children}    
                        
                    <div className="flex gap-1.5 p-5 items-center bg-[#161f32]">
                        <img src="/icon.png" alt="Icono de descripción" className="w-4 h-4 object-cover" />
                        <p className="text-secundary text-[16px] font-semibold">Next payout scheduled for <span className="text-primary text-[14px] font-bold">Oct 30th</span></p>  
                    </div>      
        
                    </article>
                    
                </div>
        </section>
    )
})

IncomeBreakdownSection.displayName = "IncomeBreakdownSection"