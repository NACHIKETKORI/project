import React, { useEffect, useState } from 'react'
import UnverifiedVoters from '../components/UnverifiedVoters'

function VoterList({account,contractData}) {
  const [voterList,setVoterList] = useState([])
  const [verifiedVoters,setVerifiedVoter] = useState([])
  const [unverifiedVoters,setUnverifiedVoter] = useState([])
  useEffect(()=>{
    getVoters()
    getSeperateVoterList()
  },[voterList.length])


  useEffect(() => {
    getSeperateVoterList()
  },[verifiedVoters.length,unverifiedVoters.length,voterList.length])
  
  const getVoters=async () => {
    
      const voters = await contractData.distributedVoting.methods.getAllVoters().call({from:account})
      setVoterList(voters)
  }

  const getSeperateVoterList = () => {
    getVoters()
    if (!ListEmpty(voterList)){
      const verified = voterList.filter(x=>x.registered===true)
      setVerifiedVoter(verified)
      const unverified = voterList.filter(x=>!verified.includes(x))
      setUnverifiedVoter(unverified)
    }
  }
  const ListEmpty = (list) => {
    if(list.length===0){
      return true
    } else {
      return false
    }
  }
  
  return (
    <div>
      <div className='container mt-5'>
       {ListEmpty(unverifiedVoters) 
       ? <></> 
       : <UnverifiedVoters 
            contractData={contractData} 
            account={account} 
            unverifiedVoters={unverifiedVoters} 
            getVoters={getVoters} 
            getSeperateVoterList={getSeperateVoterList}
          />}
      <h1 className='mt-5'>Verified Voters</h1>
      <table className="table text-white">
        <thead>
            <tr>
                <th>
                    Voter Address
                </th>
                <th>
                    Voter Names
                </th>
            </tr>
        </thead>
        <tbody className='text-white'>
          {ListEmpty(verifiedVoters)? <tr><td colSpan='2'>Voter List Empty</td></tr>
            :verifiedVoters.map((v) => {
             return( 
              <tr key={v.voterAddress}>
                <td>{v.voterAddress}</td>
                <td>{v.voterName}</td>
              </tr>
            )})
          }
        </tbody>
      </table>    
    </div>
  </div>
  )
}

export default VoterList