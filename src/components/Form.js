import React from 'react'
import Button from './Button'
import Input from './Input'

const Form = ({handleSubmit,handleNoteChange,note}) => {

    return(
      <form onSubmit={handleSubmit}>
        <Input value={note} handleNoteChange={handleNoteChange} />
        <Button type={'submit'} text={'Save'} />
      </form>
    )
  }

export default Form