import React, { useEffect, useState } from 'react'

function AdminHomePage({account,contractData,electionState, setElectionState}) {
  const [stateText,setStateText] = useState({text:'',buttonText:<></>})
  useEffect(() => {
    getState()
    getStateText()
    // eslint-disable-next-line
  },[electionState])
  const getState=async () => {
    const state= await contractData.distributedVoting.methods.getState().call({from:account})
    setElectionState(state)
  }
  const startElection = async () => {
    console.log('decentralizedVoting', contractData)
    await contractData.distributedVoting.methods.startElection().send({from:account})
    getState()
  }
  const resetElectionState =async () => {
    await contractData.distributedVoting.methods.resetElection().send({from:account})
    getState()
  }
  const endElection = async () => {
    await contractData.distributedVoting.methods.endElection().send({from:account})
    getState()
  }
  const getStateText = () => {
    let text='error',buttonText
    if (electionState.toString()==='0'){
      text = 'Not Started' 
      buttonText = <button onClick={startElection} className='btn btn-primary'>Start Election </button>
    } else if (electionState.toString()==='1'){
      text = 'Running' 
      buttonText = <button onClick={endElection} className='btn btn-primary'>End Election</button> 
    } else if (electionState.toString()==='2'){
      text = 'Running' 
      buttonText = <></>
    }
    
    setStateText({text:text,buttonText:buttonText})
  }
  
  
  
  return (
    <div>
      <h1>Election State: {stateText.text}</h1>
      {stateText.buttonText}
      <br/><br/>
      <button className='btn btn-outline-danger' onClick={resetElectionState}>Reset</button>
    </div>
  )
}

export default AdminHomePage