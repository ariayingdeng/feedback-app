import { createContext, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)

  const [feedback, setFeedback] = useState([])

  const [itemEdit, setItemEdit] = useState({
    item: {},
    edit: false,
  })

  useEffect(() => {
    fetchData()
  }, [])

  // Fetch feedback from db.json
  const fetchData = async () => {
    const response = await fetch(
      `http://localhost:5000/feedback?_sort=id&_order=desc`
    )
    const data = await response.json()
    setFeedback(data)
    setIsLoading(false)
  }
  
  // Delete a feedback   
  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure to delete?')) {
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  // Add a new feedback
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4()
    setFeedback([newFeedback, ...feedback]) //...anArray: copy all objects from anArray
  }

  // Update a feedback
  const updateFeedback = (id, newItem) => {
    // console.log(id, newItem)
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...newItem } : item))
    )
    setItemEdit({
      item: {},
      edit: false,
    })
  }

  // Edit feedback item
  const editFeedback = (item) => {
    setItemEdit({
      item,
      edit: true,
    })
  }

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        itemEdit,
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}

export default FeedbackContext
