import { createContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: 'This item is from context 1',
      rating: 10,
    },
    {
      id: 2,
      text: 'This item is from context 2',
      rating: 9,
    },
    {
      id: 3,
      text: 'This item is from context 3',
      rating: 7,
    },
  ])

  const [itemEdit, setItemEdit] = useState({
    item: {},
    edit: false,
  })

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
