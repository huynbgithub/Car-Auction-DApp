import { Layout, } from 'antd';
import Navbar from "./AdminNavbar"
import { Outlet } from 'react-router-dom';

const { Content, } = Layout;

const AdminLayout = () => {

  return (
    <Layout className="layout" >

      <Content className='bg-white vh-100'
      >
        <div className='container'>
          <Navbar />
          <Outlet />
          {/* <Footer /> */}
        </div>
      </Content>

    </Layout>
  );
};
export default AdminLayout;