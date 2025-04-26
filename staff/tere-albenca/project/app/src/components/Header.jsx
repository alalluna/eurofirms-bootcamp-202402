import HeaderButton from './HeaderButton'

function Header({ onHomeClick, onLoginClick, onDashboardClick, onShopClick, onCreateClick, onCoursesClick, onContactClick, onProfileClick, user, onNewTeacherClick, isHome }) {
    return (
        <header className='h-[45px] sm:h-[50px] border-b border-black fixed top-0 left-0 w-full bg-blue-400 box-border z-50'>
            <div className='flex justify-between items-center h-full px-1'>
                <div className='flex items-center h-full'>
                    <button onClick={onHomeClick} className='bg-transparent border-none p-0 cursor-pointer h-full'>
                        <img src='../images/logo-cabecera-alalluna.png' alt='logo alalluna' className='h-[80%] object-contain' />
                    </button>
                </div>

                {/* Botones */}
                {isHome ? (
                    <div className='flex flex-row items-center h-full'>
                        <HeaderButton onClick={onLoginClick} imgSrc='../images/login.png' alt='login' />
                        <HeaderButton onClick={onShopClick} imgSrc='../images/shop.png' alt='shop' />
                        <HeaderButton onClick={onCoursesClick} imgSrc='../images/courses.png' alt='courses' />
                        <HeaderButton onClick={onContactClick} imgSrc='../images/contact.png' alt='contact' />
                    </div>
                ) : (
                    <div className='flex flex-row items-center h-full'>
                        {user && user.role === 'teacher' && (
                            <HeaderButton onClick={onNewTeacherClick} imgSrc='../images/new-teacher.png' alt='new teacher' />
                        )}
                        <HeaderButton onClick={onDashboardClick} imgSrc='../images/dashboard.png' alt='dashboard' />
                        <HeaderButton onClick={onCreateClick} imgSrc='../images/create.png' alt='create' />
                        <HeaderButton onClick={onProfileClick} imgSrc='../images/profile.png' alt='profile' />
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header