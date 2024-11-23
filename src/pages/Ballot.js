
import React, {useEffect, useState} from 'react'
import VoteCard from '../components/VoteCard'

function Ballot({contractData, account}) {
  const [candidateList,setCandidateList] = useState([])
  const [select,setSelect] =useState()
  const [electionState, setElectionState] = useState(0)
  useEffect(() => {
    getCandidates()
    getElectionState()
  }, [])
  
  const getCandidates=async () => {
    if(!contractData.loading){
      const candidates = await contractData.distributedVoting.methods.getAllCandidates().call({from:account})
      setCandidateList(candidates)
    }
  }
  const getElectionState = async () => {
    if (!contractData.loading){
      const state = await contractData.distributedVoting.methods.getState().call({from:account})
      setElectionState(state)

    }
  }
  const handleSelectChange = (event) => {
    setSelect(event.target.value)
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    await contractData.distributedVoting.methods.castVote(select).send({from:account})
  }
  

  const ListEmpty = (candidateList.length===0)

  //Checking Election State
  if(electionState.toString()==='0'){
    return(
      <h1 className='mt-3'>{console.log('electionState', electionState)}Election Not Started</h1>
      
    )
  } else if(electionState.toString()==='2'){
    return(
      
      <h1 className='mt-3'>{console.log('electionState', electionState,typeof(electionState))}Election Ended</h1>
    )
  } else if (electionState.toString()==='1'){
    return (
      <div className='container mt-3 border border-5 p-5 rounded'>{console.log('electionState', electionState,typeof(electionState))}
            
            <div className='row'>
              <div className='col-9'>
                <h1>Candidates</h1>
              </div>
              <div className='col-3'>
                <h1>Select</h1>
              </div>
            </div>
            {ListEmpty
              ? <div className='row '>Loading...</div>
              :<form onSubmit={handleSubmit}>{console.log('select', select)}
                {candidateList.map((c) => {
                  return( 
                    <VoteCard key={c.candidateName} candidateName={c.candidateName} handleSelectChange={handleSelectChange}/>
                )})}
                <button className='btn btn-outline-primary' type='submit'>
                  Vote
                </button>
              </form>
            }
            
      </div>
    )
  }
  
}

export default Ballot