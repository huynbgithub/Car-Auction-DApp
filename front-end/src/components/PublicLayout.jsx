import {  Layout,   } from 'antd';

import { Outlet } from 'react-router-dom';
const {  Content,  } = Layout;


const PublicLayout = () => {
 
  return (
    <Layout className="layout" >
      
      <Content
        style={{ minHeight: '100vh',width:'100%',display:"flex",alignItems:"center",justifyContent:"center"   }}
      >
        <Outlet />
      </Content>
      
    </Layout>
  );
};
export default PublicLayout;