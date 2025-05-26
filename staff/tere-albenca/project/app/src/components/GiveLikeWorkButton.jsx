import { IconButton } from '@material-tailwind/react'
import '@fortawesome/fontawesome-free/css/all.min.css'

function GiveLikeWorkButton({ isLiked, onClick }) {
    return isLiked ?
    (
        <IconButton onClick={onClick} color='cyan'>
            <i className='fas fa-heart' alt='Me gusta' />
        </IconButton>
    ) : (
        <IconButton variant='outlined' onClick={onClick}>
            <i className='fas fa-heart' alt='Me gusta' />
        </IconButton>
    )
}

export default GiveLikeWorkButton