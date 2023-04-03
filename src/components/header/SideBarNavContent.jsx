import React from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

function SideBarNavContent() {
    return (
        <div>
            <h3 className="text-lg font-titleFont font-semibold mb-1 px-6" >Digital Content & Devices</h3>
            <ul>
                <li className="flex items-center justify-betweem hover:bg-zinc-200 px-6 py-2 cursor-pointer" >Amazon Music, {" "} <span><KeyboardArrowRightIcon /></span> </li>
                <li className="flex items-center justify-betweem hover:bg-zinc-200 px-6 py-2 cursor-pointer" >Amazon Music, {" "} <span><KeyboardArrowRightIcon /></span> </li>
                <li className="flex items-center justify-betweem hover:bg-zinc-200 px-6 py-2 cursor-pointer" >Amazon Music, {" "} <span><KeyboardArrowRightIcon /></span> </li>
            </ul>
        </div>
    )
}

export default SideBarNavContent
