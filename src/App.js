import Header from './components/Header'
import FeedbackList from './components/FeedbackList'
import FeedbackStats from './components/FeedbackStats'
import FeedbackForm from './components/FeedbackForm'
import FeedbackData from './data/FeedbackData'
import { useState } from 'react'
import { v4 as uuidv4} from 'uuid'

function App() {
  const [feedback, setFeedback] = useState(FeedbackData)
  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure to delete?')) {
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  const addNewFeedback = (newFeedback) => {
    newFeedback.id = uuidv4()
    if (window.confirm('Are you sure to submit your review?')) {
      setFeedback([newFeedback, ...feedback]) //...anArray: copy all objects from anArray
    }
  }

  return (
    <>
      <Header text='Feedback App' />
      <div className='container'>
        <FeedbackForm addFeedback={addNewFeedback}/>
        <FeedbackStats feedback={feedback} />
        <FeedbackList feedback={feedback} handleDelete={deleteFeedback} />
      </div>
    </>
  )
}

export default App
