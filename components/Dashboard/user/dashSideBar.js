import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import {
    CloseOutlined,
    EyeOutlined,
    AppstoreOutlined,
    SettingOutlined,
    UserOutlined,
    } from '@ant-design/icons';
import Style from '../../../styles/dashboard.module.scss'
import Link from 'next/link';
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { sidebarToggleBtn, language } from '../../../stores/atoms/app_config_atom';
import { useRecoilState, useRecoilValue } from 'recoil';


const DashSideBar = () => {

    const [sidebar, setSidebar] = useRecoilState(sidebarToggleBtn);
    const router = useRouter();
    const [activelnk, setActivelnk] = useState('');
    const showSidebar = () => setSidebar(!sidebar);
    const { asPath } = useRouter();
    const lan= useRecoilValue(language);
    useEffect(() => {
        if (router.pathname == '/dashboard') {
            setActivelnk('1');
        } else if (router.pathname == '/candidate/profile') {
            setActivelnk('4');
        } else if (router.pathname == '/candidate/applications') {
            setActivelnk('3');
        }
        console.log('Thisi srunning andrunning and running' , activelnk);
    }, [router.pathname]);

    const {t} = useTranslation();
    return (
        <>
            
            <div className={!sidebar ? lan == "ar" ? Style.dBoardSidebarActiveRtl : Style.dBoardSidebarActive : lan == "ar" ? Style.dBoardSidebarRtl : Style.dBoardSidebar}>
                <Menu 
                
                defaultSelectedKeys={[`${asPath}`]} className={Style.sidebarList} mode='inline' onClick={showSidebar}>
                  
                    <Menu.Item  className={`${Style.overLay}`} key='/dashboard' icon={<EyeOutlined />}><Link href="/dashboard">{t("overview")}</Link></Menu.Item>
                    <Menu.Item className={`${Style.overLay}`} key='/jobs' icon={<EyeOutlined />}><Link href="/jobs">{t("jobs")}</Link></Menu.Item>
                    <Menu.Item className={`${Style.overLay}`} key='/candidate/applications' icon={<AppstoreOutlined />}><Link href="/candidate/applications">{t("applications")}</Link></Menu.Item>
                    <Menu.Item  className={`${Style.overLay}`} key='/candidate/profile' icon={<UserOutlined />}><Link href="/candidate/profile">{t("my_profile")}</Link></Menu.Item>
                    <Menu.Item className={`${Style.overLay}`} key='settings' icon={<SettingOutlined />}>{t("settings")}</Menu.Item>
                </Menu>
            </div>
        </>
    )
}

export default DashSideBar
