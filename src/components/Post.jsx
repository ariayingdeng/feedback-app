import React from 'react'
import { useParams, Navigate, useNavigate, Routes, Route } from 'react-router-dom'

function Post() {
  // const status = 200

  // if (status === 404) {
  //   return <Navigate to='/notfound' />
  // }

  const navigate = useNavigate()

  const onClick = () => {
    console.log('Hello')
    navigate('/about')
  }

  const params = useParams()
  return (
    <div>
      {/* <h2>Post {params.id}</h2>
      <p>Name: {params.name.toUpperCase()}</p> */}
      <button onClick={onClick}>Click</button>
      <Routes>
        <Route path='/show' element={<h1>Hi</h1>}/>
      </Routes>
    </div>
  )
}

export default Post
