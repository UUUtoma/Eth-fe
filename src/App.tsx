// import * as React from 'react';
// import * as ReactDOM from 'react-dom';
import { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Layout } from '@arco-design/web-react';
import Router from './router';
import '@arco-design/web-react/dist/css/arco.css';
import './App.css'; // 在 @arco-design 后 import 保证覆盖
import Sidebar from '@/components/Sidebar';

const { Sider, Content } = Layout;

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={(
        <div>123</div>
      )}>
        <Switch>
          <Route
            path="/"
            render={() => (
              <Layout className={'bg-gray-50'} style={{ height: '840px' }}>
                <Layout>
                  <Sider>
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
