 import React, {useState} from 'react'
 

function AddCandidateModal({toggleModalState,contractData,account,getCandidates}) {
  
  const [nameInput,setNameInput] = useState('')
  const AddCandidate = async () => {
    if(!contractData.loading){
      await contractData.distributedVoting.methods.addCandidate(nameInput).send({from:account})
      getCandidates()
    }
  }

  const handleChange = (event) => { 
    setNameInput(event.target.value)
  }
  return (
    <div>
      <div className='modal show fade' style= {{display:'block',backgroundColor:'rgba(0,0,0,0.8)'}}>
        <div className="modal-dialog " >
          <div className="modal-content bg-dark">
            <div className="modal-header">
              <h5 className="modal-title" >Add Candidate</h5>
              <button type="button" className="btn-close" onClick={toggleModalState}></button>
            </div>
            
            <div className="modal-body">
              <div className='row'>
                <div className="col-auto">
                  <label  className="col-form-label">Candidate Name: </label>
                </div>
                <div className="col-auto">
                  <input type="text" value={nameInput} onChange={handleChange} className="form-control"/>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={toggleModalState}>Close</button>
              <button type="button" className="btn btn-primary" onClick={AddCandidate}>Add Candidate</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddCandidateModal