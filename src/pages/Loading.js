import React from 'react'

function Loading() {
  return (
    <div className='container-fluid min-vh-100 d-flex flex-column'>
      <div className="row mt-5">
        <div className="col">
        </div>
      </div>
      <div className="row flex-grow-1 bg-dark">
        <div className='text-white text-center' style={{marginTop:'10%'}}>
          <h1>
            Loading...
          </h1>
        </div>
      </div>
    </div>
  )
}

export default Loading