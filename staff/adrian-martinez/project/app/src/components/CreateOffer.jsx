import { useState } from "react";
import logic from "../logic"
import Button from "./Button";


function onCreateOffer({ onCancelClick, onCreateOffer }){

    const handleCancelClick = () => onCancelClick();

    const handleSubmit = event => {
        event.preventDefault();

        const form = event.target;

        const title = form.name.value;
        const description = form.description.value;
        const minSalary = form.minSalary.value;
        const maxSalary = form.maxSalary.value;
        const fechaPublicacion = form.fechapublicacion.value;
        const fechaExpiracion = form.fechaexpiracion.value;

        try{
            logic.createOffer(title, description, minSalary, maxSalary, fechaPublicacion, fechaExpiracion)
                .then(() => onCreateOffer())
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
            <h2>Añadir oferta laboral a tu perfil</h2>

            <form className="flex flex-col" onSubmit={handleSubmit}>
                <label htmlFor="name">Título:</label>
                <input className="input" type="text" id="name" />

                <label htmlFor="description">Descripción de la oferta:</label>
                <input className="input" type="text" id="description" placeholder="Pequeño resumen de esta formación" />

                <label htmlFor="minSalary">Salario Bruto:</label>
                <input className="input" type="text" id="minSalary" placeholder=""/>

                <label htmlFor="maxSalary">Salario Máximo:</label>
                <input className="input" type="text" id="maxSalary" placeholder=""/>

                <label htmlFor="fechapublicacion">Fecha publicación de la oferta:</label>
                <input className="input" type="date" id="fechapublicacion" placeholder=""/>

                <label htmlFor="fechaexpiracion">Fecha expiración:</label>
                <input className="input" type="date" id="fechaexpiracion" placeholder=""/>

                <button className="button button--right" type="submit">Publicar</button>
            </form>

            <button className="button--center" onClick={handleCancelClick}>Cancel</button>
        </section>
    )
}

export default onCreateOffer;