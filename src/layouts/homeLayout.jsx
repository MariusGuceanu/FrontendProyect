import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Layout, Menu, theme } from 'antd';
import '../styles/home.css';
import logo from '../images/logo.svg'
import Profile from '../components/profile';
import Dashboard from '../pages/dashboard';
import ContractNegotiations from '../pages/contractNegotiations';
import DataTransfers from '../pages/dataTransfers';
import Policies from '../pages/policies'
import Catalogs from '../pages/catalogs'
import SiderItems from '../components/menuItems';

const { Header, Content, Sider } = Layout;

const HomeLayout = () => {
  const [collapsed, setCollapsed] = useState(window.innerWidth < 1060);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Effect to collapse sider when the window is smaller
  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 1060);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])

  const DefaultContent = () => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        color: 'black',
        opacity: 0.25,
      }}>
      <h1 style={{ fontSize: '3rem', textAlign: 'center' }}>Select from the side menu</h1>
    </div>
  );

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}>
      <Header style={{ padding: 0, background: '#001529', width: '100%', minHeight: 140 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%', padding: '0 16px', }}>
          <img src={logo} alt="Logo" style={{ height: '80%', maxHeight: '80px' }} />
          <h2 style={{ color: 'white', textAlign: 'center', flexGrow: '1', margin: '0',  lineHeight: 1,
          }}>Data space: Railway data space </h2>
          <Profile />
        </div>
      </Header>
      <Layout>
        <Content style={{ margin: '0', }}>
          <Layout
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}>
            <Sider width={260} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} style={{
              background: '#001529',
            }}>
              <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={SiderItems()} />
            </Sider>
            <Content
              style={{
                padding: '24px', minHeight: 'calc(100vh - 68px)', background: colorBgContainer, alignContent: 'start',
              }} className="fade-in-content">
              <Routes>
                <Route path="/" element={<DefaultContent />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/contract-negotiations" element={<ContractNegotiations />} />
                <Route path="/data-transfers" element={<DataTransfers />}></Route>
                <Route path="/policies" element={<Policies />} />
                <Route path="/catalogs" element={<Catalogs />} />

              </Routes>
            </Content>
          </Layout>
        </Content>
      </Layout>
    </Layout>

  );
};

export default HomeLayout;
