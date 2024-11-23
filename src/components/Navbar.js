import React from 'react'
import WalletConnect from './WalletConnect'
//import * as BsIcons from 'react-icons/bs'
import Sidebar from './Sidebar'
import voteImage from './voter.png'

function Navbar({account,setAccount,isAdmin}) {
  return (
    <>
      <header className='navbar fixed-top navbar-dark shadow p-0' style={{backgroundColor:'#343a40', height:'50px'}}>
        <div className='navbar-brand' style={{color:'white', marginLeft: '10px'}}>
        {/* <BsIcons.BsList color="white" style={{ position: 'left-align', top: '20px', right: '20px',}} size="40px"/> */}
        <img 
        src={voteImage} 
        alt="voter" 
        style={{ 
          marginRight: '10px', 
          width: '30px', 
          height: '30px' 
        }} 
      />
         Decentralized Voting
        </div>
        <ul className='navbar-nav me-3 mb-2 mb-lg-0'>
          <li className='nav-item text-white py-1'>
            <WalletConnect account={account} setAccount={setAccount}/>
          </li>
        </ul>
      </header>
      {Boolean(account[0])? <Sidebar isAdmin={isAdmin}/> : <></> }
       
    </>  
  )
}

export default Navbar