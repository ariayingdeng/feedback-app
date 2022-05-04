import React from 'react'
import { useParams } from 'react-router-dom'

function Post() {
  const params = useParams()
  return (
    <div>
      <h2>Post {params.id}</h2>
      <p>Name: {params.name.toUpperCase()}</p>
    </div>
  )
}

export default Post
