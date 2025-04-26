import React from 'react'
import logic from '../logic'
import Form from './Form'
import Button from './Button'
import Input from './Input'
import { errors } from 'com'
import Htwo from './Htwo'


const { MatchError, ContentError } = errors

function CreateLesson({ onCancelLessonClick, onLessonCreated }) {
  const handleCancelLessonClick = () => {
    if (onCancelLessonClick) {
      onCancelLessonClick()
    }
  }

  const handleSubmit = event => {
    event.preventDefault()

    const form = event.target
    const title = form.title.value
    const image = form.image.value
    const description = form.description.value
    const link = form.link.value
    const video = form.video.value

    try {
      logic.createLesson(title, image, description, link, video)
        .then(() => onLessonCreated())
        .catch(error => {
          console.error(error)

          let feedback = error.message

          if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
            feedback = `${feedback},please correct it`

          else if (error instanceof MatchError)
            feedback = `${feedback}, use valid data`

          else
            feedback = 'sorry, there was an error, please try again later'

          alert(feedback)
        })


    } catch (error) {
      console.error(error)

      let feedback = error.message

      if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
        feedback = `${feedback},please correct it`
      else
        feedback = 'sorry, there was an error, please try again later'

      alert(feedback)
    }

  }

  return (
    <>
      <section className='mb-12 fixed bottom-0 left-0 bg-white w-full pb-2 border-t-2 border-black flex flex-col box-border px-2'>
        <Htwo className='font-bold text-xl py-2'>CREATE LESSON</Htwo>
        <Form onSubmit={handleSubmit}>
          <Input type="text" placeholder="Title" id="title" required />
          <Input type="text" placeholder="Image URL (optional)" id="image" />
          <Input type="text" placeholder="Description" id="description" required />
          <Input type="text" placeholder="Prezi link(optional)" id="link" />
          <Input type="text" placeholder="Video URL" id="video (optional)" />
          <Button type="submit">Create</Button>

          <Button type='submit'>create</Button>
        </Form>

        <Button onClick={handleCancelLessonClick}>cancel</Button>
      </section>
    </>
  )
}

export default CreateLesson
