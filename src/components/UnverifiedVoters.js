import React from 'react'

function UnverifiedVoters({contractData,account,unverifiedVoters,getVoters,getSeperateVoterList}) {
  const handleAccept = async (address) => {
    console.log('address', address)
    await contractData.distributedVoting.methods.verifyVoter(address).send({from:account})
    console.log('address', await contractData.distributedVoting.methods.getAllVoters().call({from:account}))
    getVoters()
    getSeperateVoterList()
  }
  return (
    <div>
      <h1>Unverified Voters</h1>
      <table className="table text-white">
        <thead>
            <tr>
                <th>
                    Voter Address
                </th>
                <th>
                    Voter Names
                </th>
                <th>
                  Age
                </th>
                <th>
                    Actions
                </th>
            </tr>
        </thead>
        <tbody className='text-white'>
            {unverifiedVoters.map((v) => {
             return( 
              <tr key={v.voterAddress}>
                <td>{v.voterAddress}</td>
                <td>{v.voterName}</td>
                <td>{v.voterAge}</td>
                <td>
                  <button className='btn btn-primary' onClick={()=>handleAccept(v.voterAddress)}>Accept</button>
                </td>
              </tr>
            )})
          }
        </tbody>
      </table> 
    </div>
  )
}

export default UnverifiedVoters