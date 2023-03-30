import React from 'react';
import {subHeaders} from '../../constants/index';

function HeaderBottom() {
    return (
        <div className="w-full px-4 h-[36px] bg-amazon_light text-white flex items-center">
            
            <ul className="flex items-center gap-2 text-sm  tracking-wide">
                {
                    subHeaders && subHeaders.map( (heading) => 
                        (
                            <li key={heading.id} className="headHover" >{heading.title}</li>
                        )
                    )
                }
            </ul>

        </div>
    )
}

export default HeaderBottom
