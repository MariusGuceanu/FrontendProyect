import React, { useState } from 'react';
import { Breadcrumb, Flex, Layout, Menu, theme } from 'antd';
import Items from '../components/menuItems';

const { Header, Content, Sider } = Layout;

<Items/>

const HomeLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Header
        style={{
          padding: 0,
          background: '#0c306b',
          width: '100%',
          minHeight: 150,
        }}
      >
        <div style={{
          padding: '0 16px',
        }}>
          <h2 style={{ color: 'white', textAlign: 'center', }}>Data space: Railway data space </h2>
        </div>
      </Header>

      <Layout>
        <Content
          style={{
            margin: '0',
          }}
        >
          <Layout
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Sider
              width={280}
              collapsible
              collapsed={collapsed}
              onCollapse={(value) => setCollapsed(value)}
              style={{
                background: '#001529',
              }}
            >
              <Menu theme="dark" 
              defaultSelectedKeys={['1']} 
              mode="inline" 
              items={Items()} />
            </Sider>

            <Content
              style={{
                padding: '24px',
                minHeight: 825,
                background: colorBgContainer,
                alignContent: 'center'
              }}
            >
              <Breadcrumb
                style={{
                  marginBottom: '16px',
                  fontSize: 50,
                  display: 'flex',
                  justifyContent: 'center'
                }}
                items={[
                  { title: 'Select from the sider' },
                  { title: '' }
                ]}
              />

            </Content>
          </Layout>
        </Content>
      </Layout>
    </Layout>
  );
};

export default HomeLayout;
