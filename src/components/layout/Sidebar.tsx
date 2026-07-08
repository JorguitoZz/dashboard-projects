import { HomeIcon } from "../ui/HomeIcon";
import { ProjectsIcon } from "../ui/ProjectsIcon";
import { FinancesIcon } from "../ui/FinancesIcon";
import { Link } from "react-router-dom";


export const Sidebar = () => {
  const menuOptions = [
    { name: 'Home', Icon: HomeIcon, ruta: "/dashboard"},
    { name: 'Projects', Icon: ProjectsIcon, ruta: "/dashboard/projects" },
    { name: 'Finances', Icon: FinancesIcon, ruta: "/dashboard/finances" },
  ];

  return (
    <aside className="
      /* MOBILE: Barra inferior fija */
      fixed bottom-0 left-0 z-50 w-full h-16 bg-fondo-2 border-t border-stroke 
      /* DESKTOP: Sidebar lateral fija a la izquierda */
      lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:flex-col lg:border-r lg:border-t-0
    ">
      <nav className="
        grid h-full grid-cols-3 mx-auto 
        /* DESKTOP: De Grid a Flex-Col */
        lg:flex lg:flex-col lg:justify-start lg:p-6 lg:gap-4 lg:max-w-none
      ">
        {/* En Desktop, querrás un Logo arriba que en móvil no se ve */}
        <div className="hidden lg:block mb-8 px-4">
          <h1 className="text-primary font-bold text-xl">JORGE.DEV</h1>
        </div>

        {menuOptions.map(({ name, Icon, ruta }) => (
          <Link
            key={name}
            to={ruta}
            className="
              flex flex-col items-center justify-center group
              /* DESKTOP: Icono al lado del texto */
              lg:flex-row lg:justify-start lg:gap-4 lg:px-4 lg:py-3 lg:rounded-xl lg:hover:bg-fondo transition-all
            "
          >
            <Icon className="w-5 h-5 text-secundary group-hover:text-resaltado transition-colors lg:w-6 lg:h-6" />
            <span className="
              text-[10px] text-secundary group-hover:text-primary font-semibold mt-1
              /* DESKTOP: Texto más grande y sin margen arriba */
              lg:text-[16px] lg:mt-0
            ">
              {name}
            </span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};