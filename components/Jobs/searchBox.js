import React from 'react'
import { Input, Button } from 'antd';

import Style from '../../styles/jobs.module.scss'


const searchBox = () => {
    return (
        <div className={Style.jobSearchBoxMain}>
                <div className={Style.jobSearchBox}>
                    <Input size='large' placeholder="Job Title" />
                    <Input size='large' placeholder="Job Location" />
                    <Button type='primary'>Search</Button>
                </div>
        </div>
    )
}

export default searchBox
