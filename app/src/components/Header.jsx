import HeaderButton from './HeaderButton'
import React, { useState } from 'react'

function Header({ onHomeClick, onLoginClick, onDashboardClick, onShopClick, onCreateClick, onCoursesClick, onContactClick, onProfileClick, user, onNewUserClick, isHome }) {

    const [menuOpen, setMenuOpen] = useState(false)

    const toggleMenu = () => setMenuOpen(prev => !prev)

    const renderButtons = () => (
        <>
            {isHome ? (
                <>
                    <HeaderButton onClick={onLoginClick} imgSrc='../images/login.png' alt='login' />
                    <HeaderButton onClick={onShopClick} imgSrc='../images/shop.png' alt='shop' />
                    <HeaderButton onClick={onCoursesClick} imgSrc='../images/courses.png' alt='courses' />
                    <HeaderButton onClick={onContactClick} imgSrc='../images/contact.png' alt='contact' />
                </>
            ) : (
                <>
                    {user?.role === 'teacher' && (
                        <HeaderButton onClick={onNewUserClick} imgSrc='../images/new-teacher.png' alt='new user' />
                    )}
                    <HeaderButton onClick={onDashboardClick} imgSrc='../images/dashboard.png' alt='dashboard' />
                    <HeaderButton onClick={onCreateClick} imgSrc='../images/create.png' alt='create' />
                    <HeaderButton onClick={onProfileClick} imgSrc='../images/profile.png' alt='profile' />
                </>
            )}
        </>
    )

    return (
        <header className='h-[45px] sm:h-[50px] border-b border-black fixed top-0 left-0 w-full bg-cyan-600 box-border z-50'>
            <div className='flex justify-between items-center h-full px-1'>
                <div className='flex items-center h-full'>
                    <button onClick={onHomeClick} className='bg-transparent border-none p-0 cursor-pointer h-full'>
                        <img src='../images/logo-cabecera-alalluna.png' alt='logo alalluna' className='h-[80%] object-contain' />
                    </button>
                </div>

                {/* botones pc */}

                <div className='hidden md:flex flex-row items-center h-full'>
                    {renderButtons()}
                </div>

                {/* Movil menu boton hamburguesa */}

                <div className='md:hidden'>
                    <button onClick={toggleMenu} className='w-8 h-8 flex items-center justify-center'>
                        <img src='../images/menu.png' alt='menu' className='h-[100%]' />
                    </button>
                </div>
            </div>

            {/* menu desplegable moviles */}

            {menuOpen && (
               <div className='absolute top-full right-1 mt-1 bg-gray-300 border border-black rounded px-1 py-1 flex flex-col space-y-1 z-50'>
                    {renderButtons()}
                </div>
            )}

        </header>
    )
}

export default Header
