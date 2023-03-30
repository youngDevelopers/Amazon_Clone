import React, {useState} from 'react';
import {subHeaders} from '../../constants/index';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function HeaderBottom() {

    const [sideBar, setSideBar] = useState(false)
    return (
        <div className="w-full px-4 h-[36px] bg-amazon_light text-white flex items-center">
            
            <ul className="flex items-center gap-2 text-sm  tracking-wide">
                <li onClick={()=> setSideBar(!sideBar)} className="header-Hover flex items-center gap-1" ><MenuIcon/>All</li>
                {
                    subHeaders && subHeaders.map( (heading) => 
                        (
                            <li key={heading.id} className="header-Hover" >{heading.title}</li>
                        )
                    )
                }
            </ul>

        </div>
    )
}

export default HeaderBottom
