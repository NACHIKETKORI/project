import './App.css';
import {useState, useEffect} from 'react'
import Web3 from 'web3';
import DistributedVoting from './truffle_abis/DistributedVoting'
import Layout from './components/Layout';



function App() {
  const initialContractData={
    distributedVoting:{},
    loading:true
  }
  const [account, setAccount]=useState([])
  const [contractData,setContractData]=useState(initialContractData)
  const [isAdmin,setIsAdmin] = useState(false)
  const [electionState, setElectionState] = useState(0)
  let isConnected = Boolean(account[0])
  useEffect(() => {
    loadContract()
  },[])

  useEffect(()=>{
    checkAdmin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[account])
  useEffect(()=>{
    getState()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[electionState])

  //Checks if currently connected address is admin
  const checkAdmin = async () => {
    let admin=false
    if(isConnected){
      admin = await contractData.distributedVoting.methods.checkAdmin().call({from:account})
    }
    setIsAdmin(admin)
  }
  const getState = async () => {
    if(!contractData.loading){
      const state= await contractData.distributedVoting.methods.getState().call({from:account})
      setElectionState(state)
    }
  }
  //Loads Contract
  const loadContract = async () => {
      const web3 = new Web3(window.ethereum)
      const networkId = await web3.eth.net.getId();

      // Load DistributedVoting Contract
      const contractData = DistributedVoting.networks[networkId]
      if(contractData){
        const contract = new web3.eth.Contract(DistributedVoting.abi, contractData.address)
        setContractData(contractData => ({...contractData,...{distributedVoting:contract}}))
      } else {
        console.log("DistributedVoting contract not deployed")
      }
      setContractData(contractData => ({...contractData,...{loading:false}}))
    
  }
  
  return (
    <>
      <Layout 
        account={account} 
        setAccount={setAccount} 
        isAdmin={isAdmin} 
        contractData={contractData}
        electionState={electionState}
        setElectionState={setElectionState}
        />
    </>
  );
}

export default App;
