import React,{useState} from 'react'

function Register({contractData,account}) {
  const [nameInput,setNameInput] = useState('')
  const [ageInput,setAgeInput] = useState()
  const handleNameChange = (event) => {
    setNameInput(event.target.value)
  }
  const handleAgeChange=(event) =>{
    setAgeInput(event.target.value)
  }
  const registerVoter = async () => {
    if(parseInt(ageInput)<18)
      alert("under age cannot vote ");
    else if(!ageInput||!nameInput)
      alert("please fill every details");
    else
    await contractData.distributedVoting.methods.registerVoter(nameInput,ageInput).send({from:account})
  }
  return (
    <div className='container'>
      <div className="form-row">
        <div className="mx-auto" style={{width:'25%',marginTop:'20%'}}>
          <input type="text" value={nameInput} onChange={handleNameChange} className="form-control" placeholder="First name"/>
        </div>
        <div className="mx-auto" style={{width:'25%',marginTop:'2%'}}>
          <input type="number" value={ageInput} onChange={handleAgeChange} className="form-control" placeholder="age"/>
        </div>
        <div className="mx-auto" style={{width:'25%',marginTop:'2%'}}>
          <input type="number" className="form-control" placeholder="adhar"/>
        </div>
        
      </div><br/>
      <div className="form-row">
        <div className="mx-auto">
          <button className='btn btn-outline-primary' onClick={registerVoter}>Register</button>
        </div>
      </div>
    </div>
  )
}

export default Register