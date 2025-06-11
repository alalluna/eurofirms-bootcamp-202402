import { useState } from "react";
import logic from "../logic"
import Button from "./Button";

function CreateCareer({ onCancelClick, onCreateCareer }){

    const handleCancelClick = () => onCancelClick();

    const handleSubmit = event => {
        event.preventDefault();

        const form = event.target;

        const title = form.name.value;
        const description = form.description.value;
        const certification = form.image.value;

        try{
            logic.createCareer(title, description, certification)
                .then(() => onCreateCareer())
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

    console.debug("CreateCareer render");

    return (
        <section className="container container--border-top create-post">
            <h2>Añadir estudio a tu perfil</h2>

            <form className="flex flex-col" onSubmit={handleSubmit}>
                <label htmlFor="name">Nombre:</label>
                <input className="input" type="text" id="name" />

                <label htmlFor="description">Descripción de la formación:</label>
                <input className="input" type="text" id="description" placeholder="Pequeño resumen de esta formación" />

                <label htmlFor="image">Certificado del estudio:</label>
                <input className="input" type="text" id="image" placeholder="Enlace a la imagen"/>

                <button className="button button--right" type="submit">Publicar</button>
            </form>

            <button className="button--center" onClick={handleCancelClick}>Cancel</button>
        </section>
    )
}

export default CreateCareer;