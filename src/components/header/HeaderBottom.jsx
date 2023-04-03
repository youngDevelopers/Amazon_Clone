import React, {useState} from 'react';
import {subHeaders} from '../../constants/index';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

function HeaderBottom() {

    const [sideBar, setSideBar] = useState(false)
    return (
        <div className="w-full px-4 h-[36px] bg-amazon_light text-white flex items-center">
            
            <ul className="flex items-center gap-2 text-sm  tracking-wide">
                <li onClick={()=> setSideBar(!sideBar)} className="headerHover flex items-center gap-1" ><MenuIcon/>All</li>
                {
                    subHeaders && subHeaders.map( (heading) => 
                        (
                            <li key={heading.id} className="headerHover" >{heading.title}</li>
                        )
                    )
                }
            </ul>
            
            {
                sideBar && (
                    <div className="w-full h-screen text-black fixed top-0 left-0  bg-amazon_blue bg-opacity-50" >
                        <div className="w-full h-full relative">
                            <div className="w-[350px] h-full bg-white border border-black" >
                                <div className="w-full bg-amazon_light text-white py-2 px-6 flex items-center gap-4" >
                                    <AccountCircleIcon />
                                    <h3 className="font-titleFont font-bold text-lg tracking-wide" >Hello, Sign In</h3>
                                </div>
                                <div>
                                    <h3 className="text-lg font-titleFont font-semibold mb-1 px-6" >Digital Content & Devices</h3>
                                    <ul>
                                        <li className="flex items-center justify-betweem hover:bg-zinc-200 px-6 py-2 cursor-pointer" >Amazon Music, {" "} <span><KeyboardArrowRightIcon /></span> </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

        </div>
    )
}

export default HeaderBottom;
