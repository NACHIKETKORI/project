import React, { useEffect, useState } from 'react'
import AddCandidateModal from '../components/AddCandidateModal'

function Candidates({contractData,account}) {
  const [modalState,setModalState] = useState(false)
  const [candidateList,setCandidateList] = useState([])

  useEffect(()=>{
    getCandidates()
     // eslint-disable-next-line
  },[modalState])
  const toggleModalState= () => { 
    setModalState(!modalState)
  }
  const getCandidates=async () => {
    if(!contractData.loading){
      const candidates = await contractData.distributedVoting.methods.getAllCandidates().call({from:account})
      setCandidateList({...candidateList,candidates})
    }
  }
  const ListEmpty = (candidateList.length===0)
  return (
    <div className='container mt-5'>
       <table className="table text-white">
        <thead>
            <tr>
                <th>
                    Candidate Names
                </th>
            </tr>
        </thead>
        <tbody className='text-white'>
          {ListEmpty? <tr><td>Loading...</td></tr>
            :candidateList.candidates.map((c) => {
             return( 
              <tr key={c.candidateName}>
                <td>{c.candidateName}</td>
              </tr>
            )})
          }
        </tbody>
      </table>

      <button className="btn btn-success" onClick={toggleModalState} style={{position:'fixed', right:'25px', bottom:'25px'}}>
          Add Candidate
      </button>
      {modalState ?<AddCandidateModal getCandidates={getCandidates} toggleModalState={toggleModalState} contractData={contractData} account={account}/>: <></>}
    </div>
  )
}

export default Candidates