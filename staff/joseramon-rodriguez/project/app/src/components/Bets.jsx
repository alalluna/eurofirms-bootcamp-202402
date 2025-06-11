import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { errors } from 'com'
import logic from '../logic'

const { MatchError, ContentError } = errors

function Bets() {
    const [bets, setBets] = useState(null)

    const [error, setError] = useState(null)

    const navigate = useNavigate()

    const params = useParams()

    const errorHandler = error => {
        console.error(error)

        let feedback = error.message

        if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
            feedback = `${feedback}, please correct it`
        else if (error instanceof MatchError)
            feedback = 'sorry there was an error, please try again later'

        setError({ message: feedback })
    }

    useEffect(() => {
        try {
            logic.retrieveBetsFromUser(params.userId)
                .then(bets => setBets(bets))
                .catch(error => errorHandler(error))
        } catch (error) {
            errorHandler(error)
        }
    }, [])

    const handleBetClick = betId => {
        navigate(`/bet/${betId}`)
    }
    return <>

        <h2 className=' text-xl'>Your bets</h2>
        {bets ? bets.map(bet => {
            return <section key={bet.id} className={` border-black border-2 ${bet.event.status === 'open' ? 'bg-cyan-100' : 'bg-rose-200'}`}>
                <h3><a className=' underline cursor-pointer text-lg' onClick={() => handleBetClick(bet.id)}>{bet.event.name}</a></h3>
                <p>{bet.event.description}</p>
                <span>BET AMOUNT :{bet.amount}</span>
                <h4>Status: {bet.event.status}</h4>
            </section>

        }
        ) : error && <span className='text-red-500'>{error.message}</span>}
    </>

}

export default Bets