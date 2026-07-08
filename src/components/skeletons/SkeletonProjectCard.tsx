export const SkeletonProjectCard = () => {
  return (
    <div className="flex flex-col w-full md:w-[46%] lg:w-[30%] animate-pulse">
      <article className="flex flex-col h-full bg-fondo-2 p-6 rounded-2xl border border-stroke">
        
        {/* Top bar: Badge y Menú */}
        <div className="flex justify-between items-center mb-5">
          <div className="h-6 w-24 bg-stroke/50 rounded-lg"></div> {/* Badge */}
          <div className="flex gap-1 items-center px-1">
            <div className="w-1 h-1 bg-secundary/20 rounded-full"></div>
            <div className="w-1 h-1 bg-secundary/20 rounded-full"></div>    
            <div className="w-1 h-1 bg-secundary/20 rounded-full"></div>
          </div>
        </div>
        
        {/* Info Principal */}
        <div className="space-y-3 mb-4">
          <div className="h-3 w-20 bg-resaltado/20 rounded"></div> {/* Service Type */}
          <div className="h-8 w-3/4 bg-stroke/60 rounded-lg"></div> {/* Client Name */}
          <div className="space-y-2">
            <div className="h-4 w-full bg-stroke/40 rounded"></div> {/* Description Line 1 */}
            <div className="h-4 w-5/6 bg-stroke/40 rounded"></div> {/* Description Line 2 */}
          </div>
        </div>
        
        {/* Payment Type Indicator */}
        <div className="flex items-center gap-2 mb-5">
          <div className="h-7 w-32 bg-emerald-500/10 border border-emerald-500/10 rounded-lg"></div>
        </div>    
        
        {/* Tecnologías (Simulamos 3 badges) */}
        <div className="flex gap-1.5 flex-wrap mb-6 min-h-7.5">
          <div className="h-6 w-16 bg-stroke/50 rounded-lg"></div>
          <div className="h-6 w-20 bg-stroke/50 rounded-lg"></div>
          <div className="h-6 w-14 bg-stroke/50 rounded-lg"></div>
        </div>

        {/* Footer: Monto */}
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-stroke/40">
          <div className="h-4 w-24 bg-stroke/40 rounded"></div> {/* Label Total */}
          <div className="h-8 w-20 bg-stroke/60 rounded-lg"></div> {/* Amount */}
        </div>
      
      </article>
    </div>
  );
};