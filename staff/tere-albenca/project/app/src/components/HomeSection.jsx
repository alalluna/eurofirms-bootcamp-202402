import React from "react"

const HomeSection = ({ onTurnPage }) => {
    return (
        <div className="w-full h-full  bg-whitesmoke flex items-center justify-center">
            <h2 className="text-3xl font-bold text-gray-700">
                This is the main Home section
            </h2>

            <div>
                <button onClick={onTurnPage} className="flex items-center justify-end w-12 h-12 hover:scale-110 transition-transform duration-300">
                    <img src="/images/previous-page.png" alt="Previous Page" className="w-full h-full object-contain" />
                </button>
            </div>
        </div>
    )
}

export default HomeSection
