import React from 'react'
import Web3 from 'web3'
function WalletConnect({account,setAccount}) {
    let isConnected = Boolean(account[0])
    const handleConnect = async () => {
        if(window.ethereum){
            await window.ethereum.enable()
            const acc = await window.ethereum.request({ method: 'eth_requestAccounts' })
            setAccount(acc[0])
        } else if(window.web3){
            const web3 = new Web3(window.ethereum.currentProvider)
            await window.ethereum.enable()
            const acc = await web3.eth.getAccounts()
            setAccount(acc[0])
        } else {
            console.log('No Ethereum Browser')
        }
    }   
    const handleDisonnect = () => {
        setAccount([])
    }
  return (
    <>
        {isConnected
            ? <div>
                Account: {account}
                &nbsp; &nbsp; &nbsp;
                <button className='btn btn-outline-danger'onClick={handleDisonnect}>Disconnect</button>
            </div>
            :<button className='btn btn-outline-primary' onClick={handleConnect}>Connect Wallet</button>
        }
    </>
  )
}

export default WalletConnect