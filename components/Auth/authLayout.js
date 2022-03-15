import React, { useState } from 'react';
import { Row, Col } from 'antd';
import Link from 'next/link';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import AuthSidebar from './sidebar';
import AuthHeader from './header';
import Style from '../../styles/dashboard.module.scss';


const AuthLayout = ({children, step, page}) => {

  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

    return (
        <React.Fragment>

          <Row>
            <Col lg={8} md={7} sm={3} xs={2}>
              {/* <div className={Style.sidebarToggleBtn}>
                  <Link href=''>
                      <MenuOutlined onClick={showSidebar} />
                  </Link>
              </div> */}
              {/* <div className={sidebar ? Style.dBoardSidebar : Style.dBoardSidebarActive}> */}
                  {/* <div className={Style.sidebarToggleBtn}>
                      <Link href='' >
                          <CloseOutlined  onClick={showSidebar} />
                      </Link>
                  </div> */}
                  <AuthSidebar currentStep={step} page={page} />
              {/* </div> */}
            </Col>
            <Col lg={16} md={10} sm={18} xs={20}>
              <AuthHeader page={page} />
              {children}
            </Col>
          </Row>
            
        </React.Fragment>
    );
}

export default AuthLayout;
