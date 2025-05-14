import Links from './Links'
import FooterButton from './FooterButton'

function Footer({ onLogout, isHome, onPrivacyClick }) {
    return (
        <footer className='h-[42px] sm:h-[46px] lg:h-[50px] w-full bg-cyan-600 p-2 px-1 fixed bottom-0 flex justify-between items-center left-0'>
            <div className='flex space-x-2 px-2 items-center h-full'>
                <Links href='https://portfolio-alallunas-projects.vercel.app/' imgSrc='../images/portfolio.png' alt='portfolio alalluna' />
                <Links href='https://github.com/alalluna' imgSrc='../images/github.png' alt='alalluna on github' />
                <Links href='https://behance.net/alalluna' imgSrc='../images/behance.png' alt='alalluna on behance' />
                <Links href='https://www.linkedin.com/in/alalluna/' imgSrc='../images/linkedin.png' alt='alalluna on linkedin' />
            </div>
            <div className='flex justify-end px-3'>
                {isHome ? (
                    <FooterButton onClick={onPrivacyClick} alt='politica'> Politicas </FooterButton>

                ) : (
                    <FooterButton onClick={onLogout} alt='logout'> Logout </FooterButton>

                )}
            </div>

        </footer>
    )
}

export default Footer

