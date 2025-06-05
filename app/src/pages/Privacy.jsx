import logic from '../logic'
import React, { useState, useEffect } from 'react'
import { errors } from 'com'
import Header from '../components/Header'
import Footer from '../components/Footer'

const { ContentError, TypeError, RangeError, MatchError } = errors

function Privacy({ onHomeClick, onLoginClick, onContactClick, onCoursesClick, onShopClick, onPrivacyClick }) {
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
  return (
    <div className='flex justify-center m-0 p-0 bg-gray-100'>
      <div className='w-full sm:w-1/2 md:w-1/3 px-4'>
        <Header
          isHome={true}
          onHomeClick={handleHomeClick}
          onLoginClick={handleLoginClick}
          onContactClick={handleContactClick}
          onCoursesClick={handleCoursesClick}
          onShopClick={handleShopClick}
        />
        <main className='w-[100%] bg-[whitesmoke]'>
          <h1 className='text-3xl font-bold text-center mb-6'>Política de Privacidad</h1>

          <section className='mb-6'>
            <h2 className='text-xl font-semibold mb-2'>1. Información que recopilamos</h2>
            <p>
              En la Academia Alalluna, recopilamos información mínima de los estudiantes con el propósito de mejorar la experiencia de aprendizaje.
              Los datos públicos solo incluyen el **nombre del estudiante y las ilustraciones que publica**.
              Toda la demás información, como correos electrónicos y datos de contacto, es privada y solo accesible por los profesores y el equipo de informática.
            </p>
          </section>

          <section className='mb-6'>
            <h2 className='text-xl font-semibold mb-2'>2. Uso de la información</h2>
            <p>
              La información de los estudiantes se usa exclusivamente para fines educativos, comunicación entre alumnos y profesores, y gestión de la plataforma.
              No compartimos ni vendemos datos personales a terceros.
            </p>
          </section>

          <section className='mb-6'>
            <h2 className='text-xl font-semibold mb-2'>3. Privacidad y acceso a la información</h2>
            <p>
              - Solo los profesores y el equipo informático pueden ver información privada.
              - El nombre y las ilustraciones publicadas son visibles para todos los estudiantes en la plataforma.
              - Los comentarios o mensajes privados dentro de la academia no son accesibles públicamente.
            </p>
          </section>

          <section className='mb-6'>
            <h2 className='text-xl font-semibold mb-2'>4. Seguridad</h2>
            <p>
              Implementamos medidas de seguridad para proteger la información almacenada. Los accesos están restringidos y protegidos con autenticación.
            </p>
          </section>

          <section className='mb-6'>
            <h2 className='text-xl font-semibold mb-2'>5. Derechos de los estudiantes</h2>
            <p>
              Los estudiantes pueden solicitar la eliminación o modificación de su información personal en cualquier momento enviando una solicitud al equipo de soporte.
            </p>
          </section>

          <p className='text-center mt-6 text-gray-600'>Última actualización: [Fecha]</p>


        </main>
        <Footer isHome={true} onPrivacyClick={handlePrivacyClick} />
      </div>
    </div>
  )
}
export default Privacy