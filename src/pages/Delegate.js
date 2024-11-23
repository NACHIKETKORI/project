
import React, {useEffect, useState} from 'react'


function Delegate({contractData, account}) {
  const [electionState, setElectionState] = useState(0)
  useEffect(() => {
    getElectionState()
  }, [])
  

  const getElectionState = async () => {
    if (!contractData.loading){
      const state = await contractData.distributedVoting.methods.getState().call({from:account})
      setElectionState(state)

    }
  }

  

  

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
        <div className="container  d-flex align-items-center justify-content-center" style={{ width: '75%', marginTop: '10%' }}>
        {console.log('electionState', electionState, typeof(electionState))}
        
            <div className="row d-flex align-items-center justify-content-center">
                <div className="col-md-8 mb-3">
                    <input type="text" className="form-control form-control-lg" id="exampleInput" placeholder="address" />
                </div>
                <div className="col-md-4 mb-3">
                    <button className="btn btn-outline-primary btn-lg w-100" type="submit">
                        Delegate
                    </button>
                </div>
            </div>
       
    </div>
    
    )
  }
  
}

export default Delegate