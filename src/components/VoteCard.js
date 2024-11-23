import React from 'react'

function VoteCard({candidateName, handleSelectChange}) {
  return (
    <div>
      <div className='row m-2'>
        <div className='col-9 border border-2 rounded-start p-3'>
          {candidateName}
        </div>
        <div className='col-3 border border-2 rounded-end p-3'>
          <input type='radio' className="form-check-input" name='candidates' value={candidateName} onChange={handleSelectChange}/>
        </div>
      </div>
    </div>
  )
}

export default VoteCard