function Header({ onHomeClick,onLoginClick,onDashboardClick, onShopClick,onCreateClick, onCoursesClick,onContactClick,onProfileClick, user, onNewTeacherClick , isHome}) {
    return (
        <header className='max-h-[50px] border-b border-black fixed top-0 left-0 w-full bg-blue-400 box-border z-50'>
            <div className='flex justify-between items-center'>
                <div>
                    <button onClick={onHomeClick} className='bg-transparent border-none p-0 cursor-pointer'>
                        <img src='../images/logo-cabecera-alalluna.png' alt='logo alalluna' className='max-h-[45px]' />
                    </button>
                </div>
                 {/* Si estamos en Home */}
                 {isHome ? (
                    <div className='flex flex-row'>
                        <button onClick={onLoginClick} className='w-10 h-10 mr-2.5 rounded-sm shadow cursor-pointer hover:bg-blue-300'>
                            <img src='../images/login.png' alt='login' className='max-h-[38px]' />
                        </button>
                        <button onClick={onShopClick} className='w-10 h-10 mr-2.5 rounded-sm shadow cursor-pointer hover:bg-blue-300'>
                        <img src='../images/shop.png' alt='login' className='max-h-[38px]' />
                        </button>
                        <button onClick={onCoursesClick} className='w-10 h-10 mr-2.5 rounded-sm shadow cursor-pointer hover:bg-blue-300'>
                        <img src='../images/courses.png' alt='login' className='max-h-[38px]' />
                        </button>
                        <button onClick={onContactClick} className='w-10 h-10 mr-2.5 rounded-sm shadow cursor-pointer hover:bg-blue-300'>
                        <img src='../images/contact.png' alt='login' className='max-h-[38px]' />
                        </button>
                    </div>
                ) : (
                    <div className='flex flex-row'>
                        {/* El header estándar */}
                        {user && user.role === 'teacher' && (
                            <button onClick={onNewTeacherClick} className='w-10 h-10 mr-2.5 rounded-sm shadow cursor-pointer hover:bg-blue-300'>
                                <img src='../images/new-teacher.png' alt='new teacher' className='max-h-[45px]' />
                            </button>
                        )}
                        <button onClick={onDashboardClick} className='w-10 h-10 mr-2.5 rounded-sm shadow cursor-pointer hover:bg-blue-300'>
                        <img src='../images/dashboard.png' alt='panel' className='max-h-[38px]' />
                        </button>
                        <button onClick={onCreateClick} className='w-10 h-10 mr-2.5 rounded-sm shadow cursor-pointer hover:bg-blue-300'>
                        <img src='../images/create.png' alt='crear' className='max-h-[38px]' />
                        </button>
                        <button onClick={onProfileClick} className='w-10 h-10 mr-2.5 rounded-sm shadow cursor-pointer hover:bg-blue-300'>
                            <img src='../images/profile.png' alt='perfil' className='max-h-[38px]' />
                        </button>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header

