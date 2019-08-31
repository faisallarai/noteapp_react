import React from 'react'

const Notification = ({messages}) => {
  
    if(messages.length === 0 ){
      return []
    }
  
    const newMessages = () => {
      return messages.map(message => {
        console.log(message)
        if(message.success !== ''){
          return(
            <div>
              <div className='success'>{message.success}</div>
            </div>
          )
        }
        if(message.error !== ''){
          return(
            <div>
              <div className='error'>{message.error}</div>
            </div>
          )
        }
      })
    }
  
    return(
      <div>
        {newMessages()}
      </div>
    )
  
  }

export default Notification