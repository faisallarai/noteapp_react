import React from 'react'

const Button = ({handleClick,type,text}) => <button onClick={handleClick} type={type}>{text}</button>

export default Button