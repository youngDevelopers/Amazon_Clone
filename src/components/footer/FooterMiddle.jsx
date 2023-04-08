import React from 'react';
import FooterMiddleList from './FooterMiddleList';
import {middleList} from '../../constants/index';

function FooterMiddle() {
    return (
        <div className="w-full bg-amazon_light text-white">
            <div className="w-full border-b-[1px] border-gray-500 py-10">
                <div className="max-w-5xl mx-auto text-gray-500" >
                    <div className="w-full grid grid-cols-4" >
                        {
                            middleList.map( (item) => (
                                <FooterMiddleList key={item._id} title={item.title} listItem={item.listItem}/>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FooterMiddle
