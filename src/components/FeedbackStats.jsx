import React from 'react'
import PropTypes from 'prop-types'

function FeedbackStats({ feedback }) {
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

FeedbackStats.propTypes = {
  feedback: PropTypes.array.isRequired,
}

export default FeedbackStats
