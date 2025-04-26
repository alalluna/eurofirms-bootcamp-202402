import React from 'react'

function Footer({ onLogout, isHome, onPrivacyClick }) {
    return (
        <footer className='w-full bg-blue-400 p-2 px-1 fixed bottom-0 flex justify-between items-center left-0'>
            <div className='flex space-x-4 px-2'>
                <a href='https://portfolio-alallunas-projects.vercel.app/' target="_blank" rel='noopener noreferrer'>
                    <img src='../images/portfolio.png' alt='portfolio' className='max-h-[38px] w-auto transition-transform duration-300 ease-in-out hover:scale-110' /></a>
                <a href='https://github.com/alalluna' target="_blank" rel='noopener noreferrer'>
                    <img src='../images/github.png' alt='github' className='max-h-[38px] w-auto transition-transform duration-300 ease-in-out hover:scale-110' /></a>
                <a href='https://behance.net/alalluna' target="_blank" rel='noopener noreferrer'>
                    <img src='../images/behance.png' alt='behance' className='max-h-[38px] w-auto transition-transform duration-300 ease-in-out hover:scale-110' /></a>
                <a href='https://www.linkedin.com/in/alalluna/' target="_blank" rel='noopener noreferrer'>
                    <img src='../images/linkedin.png' alt='linkedin' className='max-h-[38px] w-auto transition-transform duration-300 ease-in-out hover:scale-110' /></a>
            </div>
            <div className="flex justify-end px-3">
                {isHome ? (

                    <button className='bg-[white] hover:bg-gray-200 text-{#333333} border-0 px-[10px] py-1 rounded-xl' onClick={onPrivacyClick} >
                        Politicas
                    </button>

                ) : (

                    <button className='bg-[white] hover:bg-gray-200 text-{#333333} border-0 px-[10px] py-1 rounded-xl' onClick={onLogout}>
                        Logout
                    </button>

                )}
            </div>

        </footer>
    )
}

export default Footer

