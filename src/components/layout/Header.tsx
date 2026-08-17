import { createClient } from "@/lib/supabase/server";
import { signOutAction } from "@/serverActions/signOutAction";


export const Header = async() => {

  const supabase = await createClient()
  
  const {data: {user}, error} = await supabase.auth.getUser()


  return (
    <section className="bg-fondo py-4 border-b border-stroke">
      <div className="flex justify-between items-center w-[90%] mx-auto">
        <div className="flex items-center gap-3">
          <picture className="w-10 h-10 rounded-full overflow-hidden block">
            <img 
              src="./profile.webp"
              alt="Jorge Garcia"
              className="w-full h-full object-cover"
            />
          </picture>
          <div>
            <p className="text-primary font-bold text-[14px]">{user?.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">

          {/* Formulario estático sin lógica */}
          <form action={signOutAction}>
            <button 
              type="submit" 
              className="px-3 py-1.5 text-xs font-semibold text-red-500 hover:text-white border border-red-500/30 hover:bg-red-500 rounded-lg transition-colors cursor-pointer"
            >
              Cerrar Sesión
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}