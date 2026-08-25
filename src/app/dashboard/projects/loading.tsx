// src/app/dashboard/projects/loading.tsx
import { SkeletonProjectCard } from "@/components/skeletons/SkeletonProjectCard";

export default function Loading() {
  return (
    <section className="w-[95%] py-5 m-auto">
      {/* Contenedor del encabezado con el esqueleto del botón y textos */}
      <div className="flex justify-between items-end mb-6">
        <div>
          {/* Esqueleto para el título "Projects Dashboard" */}
          <div className="h-9 w-64 bg-primary/10 rounded-md animate-pulse mb-2" />
          {/* Esqueleto para el párrafo descriptivo */}
          <div className="h-5 w-96 bg-primary/10 rounded-md animate-pulse" />
        </div>

        {/* Esqueleto para el botón "Add Project" */}
        <div className="h-10 w-32 bg-primary/10 rounded-lg animate-pulse" />
      </div>
      
      {/* Contenedor de las tarjetas en estado de carga */}
      <div className="flex flex-col gap-5 pb-20 pt-5 md:flex-row flex-wrap">
        <SkeletonProjectCard />
        <SkeletonProjectCard />
        <SkeletonProjectCard />
      </div>
    </section>
  );
}