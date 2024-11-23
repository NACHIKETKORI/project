import { BsClipboard, BsClipboardCheck, BsHouse, BsNewspaper } from 'react-icons/bs'

export  const NavDataVoter = [
  {
    id:1,
    to:'/',
    icon: <BsHouse className='me-2'/>,
    name: 'Home'
  },
  {
    id:2,
    to:'/Register',
    icon: <BsClipboard className='me-2'/>,
    name: 'Register'
  },
  {
    id:3,
    to:'/Ballot',
    icon: <BsNewspaper className='me-2'/>,
    name: 'Ballot'
  },
  {
    id:4,
    to:'/Result',
    icon: <BsClipboardCheck className='me-2'/>,
    name: 'Result'
  },
  {
    id:5,
    to:'/Delegate',
    icon: <BsClipboardCheck className='me-2'/>,
    name: 'Delegate'
  }
]