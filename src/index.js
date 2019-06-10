import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import SimpleExample from './pages/SimpleExample';
import ReRenderExample from './pages/ReRenderExample';
import { Provider, Consumer } from './store';

// 使用状态管理简单模拟一个 react-router, 并且将router也接入状态管理中
function Route({ path, children }) {
  return (
    <Consumer>
      {state => {
        if (state.path === path) {
          // 同步浏览器 url
          window.history.replaceState(null, path, path);
          return children;
        }
        return null;
      }}
    </Consumer>
  );
}

function App() {
  return (
    <Provider>
      <Route path="SimpleExample">
        <SimpleExample />
      </Route>
      <Route path="ReRenderExample">
        <ReRenderExample />
      </Route>
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
