import React from 'react'
import useAuth from '../hooks/useAuth'

function Review({review}) {
    console.log(review

    )
    const {user} = useAuth()
  return (
    <div>
        <div className="mb-6">

  
          <div  className="mb-4 p-4 bg-gray-100 rounded-lg">
            <p className="font-bold">{review.userName}</p>
            <p className="text-yellow-500">{review.rating}★</p>

            <p>{review.comment}</p>
            <small className="text-gray-500">
              {new Date(review.timestamp).toLocaleString()}
            </small>
          </div>
       
      </div>
    </div>
  )
}

export default Review
