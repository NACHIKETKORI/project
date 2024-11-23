import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {NavDataVoter} from './NavDataVoter'
import {NavDataAdmin} from './NavDataAdmin'

function Sidebar({isAdmin}) {
    const [activeIndex,setActiveIndex] = useState(0)

    const NavData = isAdmin? NavDataAdmin: NavDataVoter

    const checkActive = (element) =>{
        let activeClass = activeIndex === NavData.indexOf(element) ? 'nav-item p-2 active bg-primary' : 'nav-item p-2'
        return activeClass
    } 

    return (
    <>
        <nav className="col-2 min-vh-100 " style={{backgroundColor:'#343a40',marginTop: '50px'}}>
            <ul className='nav nav-pills flex-column mb-auto'>
                {NavData.map(element => {
                    return(
                    <li className={checkActive(element)} key={element.id} >
                        <Link to={element.to} className='nav-link text-white' onClick={() => setActiveIndex(NavData.indexOf(element))}>
                            {element.icon}
                            {element.name}
                        </Link>
                    </li>
                    )
                })}
            </ul>
        </nav>
    </>
    )
}

export default Sidebar