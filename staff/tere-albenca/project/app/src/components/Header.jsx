function Header({ onHomeClick, onCreateClick, onProfileClick, user, onNewTeacherClick }) {
    return (
        <header className='max-h-[50px] border-b border-black fixed top-0 left-0 w-full bg-blue-400 box-border z-50'>
            <div className='flex justify-between items-center'>
                <div>
                    <button onClick={onHomeClick} className='bg-transparent border-none p-0 cursor-pointer'>
                        <img src='../images/logo-cabecera-alalluna.png' alt='logo alalluna' className='max-h-[45px]' />
                    </button>
                </div>
                <div className='flex flex-row'>

                    {/* //new teacher instruction */}
                    <div>
                        {user && user.role === 'teacher' && (
                            <button onClick={onNewTeacherClick} className='w-10 h-10 mr-2.5 rounded-sm shadow cursor-pointer hover:bg-blue-300'>
                                <img src='../images/new-teacher.png' alt='new teacher' className='max-h-[45px]' />
                            </button>
                        )}
                    </div>

                    {/* //new teacher instruction */}

                    <button onClick={onCreateClick} className='w-10 h-10 mr-2.5 rounded-sm shadow cursor-pointer hover:bg-blue-300'>➕</button>
                    <button onClick={onProfileClick} className='w-10 h-10 mr-2.5 rounded-sm shadow cursor-pointer hover:bg-blue-300'>
                        <img src='../images/login.png' alt='perfil' className='max-h-[38px]' />
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header

