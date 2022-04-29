import Header from './components/Header'
import FeedbackList from './components/FeedbackList'
import FeedbackData from './data/FeedbackData'
import { useState } from 'react'

function App() {
  const [feedback, setFeedback] = useState(FeedbackData)

  return (
    <>
      <Header text='Feedback App' />
      <div className='container'>
        <FeedbackList feedback={feedback}/>
      </div>
    </>
  )
}

export default App
