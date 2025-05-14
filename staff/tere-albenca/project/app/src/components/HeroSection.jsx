
import React from "react"
import { TypeAnimation } from "react-type-animation"
import { motion } from "framer-motion"
import { Button } from "@material-tailwind/react"

const HeroSection = ({ onTurnPage }) => {
    return (
      <section className="relative w-full h-full flex flex-col justify-between px-4 py-4 bg-gray-100">

            <div className="flex-grow flex flex-col items-center justify-center space-y-4">
                {/* Hero: Welcome text - full width */}
                <div className=" mb-3 md:mb-8 text-center">
                    <h1 className="text-2xl md:text-4xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-cyan-700">
                        Welcome students
                    </h1>
                </div>

                {/* Div 2: Flex row container */}
                <div className="flex flex-column lg:flex-row justify-center ">
                    {/* Div typeanimations */}

                    <div className="text-md text-cyan-800">
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
                <div className="flex flex-col justify-center text-center text-xs text-gray-400 mt-3 md:mt-6">
                    <p>Unleash your creativity.</p>
                    <p> Learn, create, and inspire from anywhere.</p>
                </div>

                {/* Div hero image */}
                <div className="flex-column justify-items-center mt:4 md:mt-8 py-2 md:py-6">
                    <div className=" relative w-[200px] h-[200px]">
                        <img
                            src="/images/hero-image.png"
                            alt="hero"
                        />
                    </div>
                </div>
            </div>


            <div>
                <button onClick={onTurnPage} 
                className="absolute bottom-2 right-0 md:bottom-3 md:right-0.5 lg:bottom-4 lg:right-1 w-12 h-12 hover:scale-110 transition-transform duration-300">
                    <img src="/images/next-page.png" alt="Next Page" className="w-full h-full object-contain" />
                </button>
            </div>
        </section>
    )
}

export default HeroSection
