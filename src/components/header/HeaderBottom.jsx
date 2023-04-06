import React, {useState, useEffect, useRef} from 'react';
import {subHeaders} from '../../constants/index';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SideBarNavContent from './SideBarNavContent';
import {motion} from "framer-motion";

function HeaderBottom() {

    const [sideBar, setSideBar] = useState(false)
    const ref = useRef()

    useEffect(() =>{
        document.body.addEventListener("click", (e)=>{
            if(e.target.contains(ref.current)){//whenever it is inside that div that have the references it will not click- hence result is false wen we click inside that div with the current ref
                setSideBar(false)
            }
        })
    },[sideBar])

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
                    <div className="w-full h-screen text-black fixed top-0 left-0  bg-amazon_blue bg-opacity-50 " >
                        <div className="w-full h-full relative">
                            <motion.div ref={ref} initial={{x:-500,opacity:0}} animate={{x:0,opacity:1}} transition={{duration:.5}} className="w-[350px] h-full bg-white border border-black overflow-auto" >
                                <div className="w-full bg-amazon_light text-white py-2 px-6 flex items-center gap-4" >
                                    <AccountCircleIcon />
                                    <h3 className="font-titleFont font-bold text-lg tracking-wide" >Hello, Sign In</h3>
                                </div>
                                <SideBarNavContent title="Digital Content and devices" one="Amazon Music" two="Kindle E-readers & Books" three="Amazon Appstore" />
                                <SideBarNavContent title="Shop By Department" one="Electroninc" two="Computers" three="Smart Home" />
                                <SideBarNavContent title="Programs and Features" one="Gift Cards" two="Amazon live" three="International Shopping" />
                                <SideBarNavContent title="Help & Settings" one="Your Account" two="Customer Service" three="Contact Us" />
                                <span onClick={() => setSideBar(!sideBar) } className="cursor-pointer absolute top-0 left-[350px] w-10 h-10 text-black flex items-center justify-center border bg-gray-200 hover:bg-red-500 hover:text-white duration-300" ><CloseIcon/></span>
                            </motion.div>
                        </div>
                    </div>
                )
            }

        </div>
    )
}

export default HeaderBottom;
