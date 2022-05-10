import React from 'react'
import { useContext } from 'react'
import FeedbackContext from '../context/FeedbackContext'

function FeedbackStats() {
  const { feedback } = useContext(FeedbackContext)

  //Calculate ratings average
  let avg =
    feedback.reduce((total, current) => {
      return total + current.rating
    }, 0) / feedback.length

  //set 1 decimal place & replace .0 with ''
  avg = avg.toFixed(1).replace(/[.,]0$/, '')

  return (
    <div className='feedback-stats'>
      <h4>{feedback.length} Reviews</h4>
      <h4>Average Rating: {isNaN(avg) ? 0 : avg}</h4>
    </div>
  )
}

export default FeedbackStats
