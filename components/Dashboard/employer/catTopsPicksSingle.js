import React from 'react';
import { CaretUpFilled, CaretDownFilled } from '@ant-design/icons';

import Style from '../../../styles/dashboard.module.scss';

export default function CatTopsPicksSingle(props) {
    return (
        <>
            <li>
                {props.catItemName}
                 {/* {props.itemProgress == true ? 
                <CaretUpFilled className={Style.iconUp}/> : 
                <CaretDownFilled className={Style.iconDown}/>} */}
                <i>{props.info}</i>
            </li>
        </>
    )
}

