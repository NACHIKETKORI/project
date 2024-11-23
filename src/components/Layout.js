import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './Navbar'
import Register from '../pages/Register';
import Result from '../pages/Result'
import ConnectWallet from '../pages/ConnectWallet';
import Candidates from '../pages/Candidates';
import VoterHomePage from '../pages/VoterHomePage';
import AdminHomePage from '../pages/AdminHomePage';
import NotFound from '../pages/NotFound'
import Loading from '../pages/Loading';
import VoterList from '../pages/VoterList'
import Ballot from '../pages/Ballot';
import Delegate from '../pages/Delegate';

function Layout({account, setAccount, isAdmin, contractData,electionState,setElectionState}) {
  let isConnected = Boolean(account[0])
  const notConnectedPage= (<Routes>
                            <Route path='/' element={<ConnectWallet/>}/>
                            <Route path='*' element={<NotFound/>}/>
                          </Routes>)
  const voterPages= (<div className='col-10 text-center mt-5 bg-dark text-white'>
                      <Routes>
                        <Route path='/' element={<VoterHomePage account={account} contractData={contractData} electionState={electionState}/>}/>
                        <Route path='/Register' element={<Register account={account} contractData={contractData} electionState={electionState}/>}/>
                        <Route path='/Ballot' element={<Ballot account={account} contractData={contractData} electionState={electionState}/>}/>
                        <Route path='/Result' element={<Result contractData={contractData} electionState={electionState}/>}/>
                        { <Route path='/Delegate' element={<Delegate account={account} contractData={contractData} electionState={electionState}/>}/> }
                        <Route path='*' element={<NotFound/>}/>
                      </Routes>
                    </div>)
  const adminPages= (<div className='col-10 text-center mt-5 bg-dark text-white'>
                      <Routes>
                        <Route path='/' element={<AdminHomePage account={account} contractData={contractData} electionState={electionState} setElectionState={setElectionState}/>}/>
                        <Route path='/Candidates' element={<Candidates account={account} contractData={contractData}/>}/>
                        <Route path='/VoterList' element={<VoterList account={account} contractData={contractData} electionState={electionState}/>}/>
                        <Route path='/Result' element={<Result account={account} contractData={contractData}/>} electionState={electionState}/>
                        <Route path='*' element={<NotFound/>}/>
                      </Routes>
                    </div>)

  return (
    <>
      <div className='container-fluid' style={{height:'100%'}}>
        <div className="row">
          <Navbar account={account} setAccount={setAccount} isAdmin={isAdmin}/>
          <>{contractData.loading ? <Routes><Route to="/Loading" element={<Loading/>}/></Routes>:<></>}
            {!isConnected
            ? notConnectedPage
            : isAdmin? adminPages : voterPages
            }
          </>
        </div>
      </div>
    </>
  )
}

export default Layout