import logic from "../logic";
import Offer from "./Offer";
import { useState, useEffect } from "react";

function OffersCompany({ refreshStamp, targetUserId }){

    console.log("refreshStamp", refreshStamp);

    const [offers, setOffers] = useState([]);

    const refreshScreen = () => {

        try{
            logic.retrieveOffersFromCompany(targetUserId)
                .then(offers => setOffers(offers))
                .catch(error => {

                    console.error(error);
                    alert(error.message);
            })
        }
        catch(error){
    
            console.error(error);
            alert(error.message);
        }
    }
    useEffect(() => {

        refreshScreen();
    }, [refreshStamp])

    const handleDeleteOffer = () => {

        refreshScreen();
    }

    const handleUpdateOffer = () => {

        refreshScreen();
    }


    console.log("Offer render");
    
    return (
        <section id="">
            <h2 className="p-10 font-semibold text-3xl">Ofertas publicadas</h2>

            <div id="">
                { offers.map(offer => <Offer offer={ offer } onOfferDeleted={handleDeleteOffer} onOfferUpdate={handleUpdateOffer}/>)}
            </div>
        </section>
    )
}

export default OffersCompany;