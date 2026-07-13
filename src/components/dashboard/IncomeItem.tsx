import { memo } from "react";
import type { IncomeItemProps } from "../../types/interface";

export const IncomeItem = memo(({clientName, amount, totalGoal = 1}: IncomeItemProps) =>{

    const procentage = (amount / totalGoal) * 100
    const clampedPercentage = Math.min(procentage, 100)

    return(
        <div className="p-5 border-b border-stroke flex flex-col gap-3">
            <div className="flex justify-between">
                <div className="text-primary font-bold text-[14px]">{clientName}</div>
                    <div className="text-resaltado text-[14px] font-bold ">${amount}</div>
                </div>
            <div className="w-full h-1.5 bg-stroke rounded overflow-hidden"><div style={{ width: `${clampedPercentage}%`}} className=" h-full bg-resaltado"></div></div>
        </div>    
    )
})

IncomeItem.displayName = "IncomeItem"