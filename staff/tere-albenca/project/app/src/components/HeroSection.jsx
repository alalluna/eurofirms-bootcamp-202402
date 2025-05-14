import { TypeAnimation } from "react-type-animation"

const HeroSection = ({ onTurnPage }) => {
    return (
        <section className="relative w-full h-full flex flex-col justify-between pt-6 sm:pt-7 md:pt-8 lg:pt-9 xl:pt-10  bg-[whitesmoke]">

            <div className="flex-grow flex flex-col items-center justify-center space-y-3">
                {/* Hero: Welcome text - full width */}
                <div className=" mb-1 md:mb-2 text-center">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-cyan-700">
                        Welcome students
                    </h1>
                </div>

                {/* Div 2: Flex row container */}
                <div className="flex flex-column lg:flex-row justify-center ">
                    {/* Div typeanimations */}

                    <div className="text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-cyan-800">
                        <TypeAnimation
                            sequence={[
                                "Draw | Pencil",
                                1000,
                                "Draw | Pen",
                                1000,
                                "Paint | Gouache",
                                1000,
                                "Paint | Acuarel",
                                1000,
                                "Illustration | krita",
                                1000,
                                "Illustration | GIMP",
                                1000,
                                "Animation | Shotcut",
                                1000,
                                "Design | Canva",
                                1000,
                            ]}
                            speed={20}
                            repeat={Infinity}
                        />
                    </div>

                </div>
                <div className="flex flex-col justify-center text-center  text-gray-400 mt-2 md:mt-3 xl:mt-5">
                    <h2 className="text-sm md:text-base lg:text-lg" >Unleash your creativity.</h2>
                    <h3 className="text-xs md:text-sm lg:text-base"> Learn, create, and inspire from anywhere.</h3>
                </div>

                {/* Div hero image */}
                <div className="flex-column justify-items-center">
                    <div className=" relative w-[150px] h-[150px] sm:w-[160] sm:h-[160] md:w-[170] md:h-[170] lg:w-[170] lg:h-[170] xl:w-[180] xl:h-[180]">
                        <img
                            src="/images/hero-image.png"
                            alt="hero"
                        />
                    </div>
                </div>
            </div>


            <div>
                <button onClick={onTurnPage}
                    className="absolute bottom-0 right-0 md:bottom-2 md:right-0.5 lg:bottom-3 lg:right-1 w-12 h-12 hover:scale-110 transition-transform duration-300">
                    <img src="/images/next-page.png" alt="Next Page" className="w-full h-full object-contain" />
                </button>
            </div>
        </section>
    )
}

export default HeroSection
