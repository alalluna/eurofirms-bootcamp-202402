import { errors } from 'com'
import Header from '../components/Header'
import Footer from '../components/Footer'
import PageTurner from '../components/PageTurner'

const { ContentError, TypeError, RangeError, MatchError } = errors

function Home ({onHomeClick,onLoginClick, onContactClick, onCoursesClick, onShopClick, onPrivacyClick}){
  const handleHomeClick = (event) => {
    event.preventDefault()
    onHomeClick()
  }
  const handleLoginClick = (event) => {
    event.preventDefault()
    onLoginClick()
  }
  const handleContactClick = (event) => {
    event.preventDefault()
    onContactClick()
  }
  const handleCoursesClick = (event) => {
    event.preventDefault()
    onCoursesClick()
  }
  const handleShopClick = (event) => {
    event.preventDefault()
    onShopClick()
  }
  const handlePrivacyClick = (event) => {
    event.preventDefault()
    onPrivacyClick()
  }
  return(
        <div className='flex flex-col relative w-full max-h-[calc(100vh-50px)]  bg-gray-100'>
      <div className='w-full'>
        <Header
          isHome={true} 
          onHomeClick={handleHomeClick}
          onLoginClick={handleLoginClick}
          onContactClick={handleContactClick}
          onCoursesClick={handleCoursesClick}
          onShopClick={handleShopClick}
        />
        <main className='w-[100%] bg-[whitesmoke] mt-6 py-1'>
          <div className='flex justify-center'>   
          <PageTurner />
            </div>
      


        </main>
        <Footer isHome={true}  onPrivacyClick={handlePrivacyClick} />
      </div>
    </div>
  )
}

export default Home


