import { createContext, useState, useEffect } from 'react'
// import { v4 as uuidv4 } from 'uuid'

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
    const response = await fetch(`/feedback?_sort=id&_order=desc`)
    const data = await response.json()
    setFeedback(data)
    setIsLoading(false)
  }

  // Delete a feedback
  const deleteFeedback = async (id) => {
    if (window.confirm('Are you sure to delete?')) {
      const response = await fetch(`/feedback/${id}`, {
        method: 'DELETE',
      })
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  // Add a new feedback
  const addFeedback = async (newFeedback) => {
    const response = await fetch('/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFeedback),
    })
    // newFeedback.id = uuidv4()
    const data = await response.json()
    setFeedback([data, ...feedback]) //...anArray: copy all objects from anArray
  }

  // Update a feedback
  const updateFeedback = async (id, newItem) => {
    // console.log(id, newItem)
    const response = await fetch(`/feedback/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem)
    })
    const data = await response.json()
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...data } : item))
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
