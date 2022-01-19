// import * as React from 'react';
// import * as ReactDOM from 'react-dom';
import {Suspense, useState} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Layout } from '@arco-design/web-react';
import Router from './router';
import Sidebar from '@/pages/home/components/Sidebar';
import '@arco-design/web-react/dist/css/arco.css';
import './App.css'; // 在 @arco-design 组件库和自定义组件后 import 保证覆盖样式

const { Sider, Content } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <BrowserRouter>
      <Suspense fallback={(
        <div></div>
      )}>
        <Switch>
          <Route
            path="/"
            render={() => (
              <Layout className={'bg-gray-50'} style={{ height: '1280px' }}>
                <Layout>
                  <Sider
                    collapsed={collapsed}
                    collapsible
                    onCollapse={() => setCollapsed(!collapsed)}
                  >
                     <Sidebar />
                  </Sider>
                  <Content>
                    <Router />
                  </Content>
                </Layout>
              </Layout>
            )}
          />
        </Switch>
      </Suspense>

      {/* <Switch>
        <Route
          path="/"
          render={() => (
            <Layout>
              <Router />
            </Layout>
          )}
        />
      </Switch> */}
    </BrowserRouter>
  );
}

export default App;
