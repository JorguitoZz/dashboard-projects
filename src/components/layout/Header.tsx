export const Header = () =>{

    return(
        <section className=" bg-fondo py-4 border-b border-stroke">
            <div className="flex justify-between w-[90%] mx-auto">
                <div className="flex gap-3">
                            <picture>
                                <img 
                                    src="./profile.webp"
                                    alt="Jorge Garcia"
                                    className="w-full object-cover"
                                />
                            </picture>
                            <div>
                                <p className="text-primary font-bold text-[14px] ">Jorge Garcia</p>
                                <p className="text-secundary text-[10px] font-semibold">FRONTEND DEVELOPER</p>
                            </div>
                </div>
                <div>
                    <picture className="w-10 h-10">
                        <img
                        src="./Button.png"
                        className="w-full object-cover"
                        >
                        </img>
                    </picture>
                </div>
            </div>
        </section>
    )
}