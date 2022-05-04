import Header from './components/Header'
import FeedbackList from './components/FeedbackList'
import FeedbackStats from './components/FeedbackStats'
import FeedbackForm from './components/FeedbackForm'
import FeedbackData from './data/FeedbackData'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import AboutPage from './pages/AboutPage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AboutIconLink from './components/AboutIconLink'
import Post from './components/Post'

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
    <Router>
      <Header text='Feedback App' />
      <div className='container'>
        <Routes>
          <Route
            exact
            path='/'
            element={
              <>
                <FeedbackForm addFeedback={addNewFeedback} />
                <FeedbackStats feedback={feedback} />
                <FeedbackList
                  feedback={feedback}
                  handleDelete={deleteFeedback}
                />
              </>
            }
          ></Route>
          <Route path='/about' element={<AboutPage />} />
          <Route path='/post/:name/:id' element={<Post />} />
        </Routes>
        <AboutIconLink />
      </div>
    </Router>
  )
}

export default App
