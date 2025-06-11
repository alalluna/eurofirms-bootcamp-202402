import logic from "../logic";
import Career from "./Career";
import { useState, useEffect } from "react";

function CareersStudent({ refreshStamp, targetUserId}){

    console.log("refreshStamp", refreshStamp);

    const [careers, setCareers] = useState([]);

    const refreshCareers = () => {

        try{
            logic.retrieveCareersFromStudent(targetUserId)
                .then(careers => setCareers(careers))
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

        refreshCareers();
    }, [refreshStamp])

    const handleDeleteCareer = () => {

        refreshCareers();
    }

    const handleUpdateCareer = () => {

        refreshCareers();
    }

    console.log("Careers render");
    
    return (
        <section id="">
            <h2 className="p-10 font-semibold text-3xl">Perfil laboral</h2>

            <div id="">
                { careers.map(career => <Career career={ career } onCareerDeleted={handleDeleteCareer} onCareerUpdate={handleUpdateCareer} />)}
            </div>
        </section>
    )
}

export default CareersStudent;