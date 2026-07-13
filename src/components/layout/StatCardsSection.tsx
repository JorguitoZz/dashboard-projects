import { memo } from "react";
import type { LayoutProps } from "../../types/interface";

export const StatCardsSection = memo(({children}: LayoutProps) => {

    return (
        <section className="w-[95%] ml-auto pt-6 pb-6 lg:mx-auto lg:w-[90%]">          
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 no-scrollbar lg:justify-between">
                {children}
            </div>    
        </section>
    );
});

StatCardsSection.displayName = "StatCardsSection";