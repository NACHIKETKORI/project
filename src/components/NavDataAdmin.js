import { BsClipboard, BsClipboardCheck, BsHouse,  BsPerson } from 'react-icons/bs'

export  const NavDataAdmin = [
  {
    id:1,
    to:'/',
    icon: <BsHouse className='me-2'/>,
    name: 'Home'
  },
  {
    id:2,
    to:'/Candidates',
    icon: <BsClipboard className='me-2'/>,
    name: 'Candidates'
  },
  {
    id:3,
    to:'/VoterList',
    icon: <BsPerson className='me-2'/>,
    name: 'VoterList'
  },
  {
    id:4,
    to:'/Result',
    icon: <BsClipboardCheck className='me-2'/>,
    name: 'Result'
  }
]