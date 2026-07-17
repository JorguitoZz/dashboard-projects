import type { StatCardProps } from "../../types/interface";

export const StatCard = ({title, icon, data}: StatCardProps)=>{


    return(
        <article className="min-w-70 snap-center bg-fondo-2 p-5 rounded-2xl border border-stroke lg:w-[33%] hover:border-resaltado/50 transition-colors">
            <div className="mb-7 flex justify-between items-start">
                <p className="uppercase font-semibold text-secundary text-[10px]">{title}</p>
                <span className="p-2 bg-emerald-500/10 rounded-lg text-resaltado">{icon}</span>
            </div>
              
            <p className="text-primary text-[28px] font-bold">{data}</p>
        </article>
    )
}