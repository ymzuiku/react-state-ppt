# React 状态管理之`温故知新`

旨在阐述清楚 声明式 的状态管理思路，以 React 作为例子，思路适用于所有 声明式 UI 的状态管理方案

## 用 40 行代码实现状态管理核心

```js
import React, { createContext, useMemo, useContext } from 'react';
import immer from 'immer';

export default function createStateManager(initalState = {}) {
  // 创建一个  context, 用于后续配合 useContext 进行更新组件
  const store = createContext();

  // 创建一个提供者组件
  const Provider = ({ defaultState = initalState, ...rest }) => {
    const [state, setState] = React.useState(defaultState);

    return useMemo(() => {
      // 使用 immer 进行更新状态, 确保未更新的对象还是旧的引用
      store.dispatch = fn => setState(immer(state, v => fn(v)));
      store.state = state;

      return <store.Provider value={state} {...rest} />;
    }, [state]);
  };

  // 创建一个消费者组件
  const Consumer = ({ children, memo }) => {
    const state = useContext(store);

    if (typeof memo === 'function') {
      return useMemo(() => {
        return children(state, store.dispatch);
      }, memo(state));
    }
    return children(state, store.dispatch);
  };

  return { Provider, store, Consumer };
}
```

## 状态管理的环境配置

### 1. 实例化 store, Provider, Consumer

```js
import createStateManager from './utils/createStateManager';

// 一个多层级的对象示例，以验证immutable
const initState = {
  user: {
    info: {
      num: 0,
    },
  },
};

const { store, Provider, Consumer } = createStateManager(initState);

export { store, Provider, Consumer };
```

### 2. 在项目顶部注册 Provider

```js
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Page from './Page';
import { Provider, Consumer } from './store';

function App() {
  return (
    <Provider>
      <Page />
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
```

## 状态管理的使用

### 1. 编写 dispatch

整个项目的状态管理代码，只有 dispatch, 我们只需要要编写 dispatch 即可。

action，reducer 都不需要编写，immutable 也不需要现示的编写，这一切都是自动的

```js
import { store } from './store';

export function dispatchOfAddNum() {
  store.dispatch(state => {
    state.user.info.num += 1;
  });
}
```

### 2. 在代码中使用状态和触发状态

```js
import React from 'react';
import * as dispatchs from './dispatchs';
import { Consumer } from './store';

function Page() {
  return (
    <div className="app">
      <p>最简单的例子</p>
      <Consumer>{state => <h2>{state.user.info.num}</h2>}</Consumer>
      <button onClick={dispatchs.dispatchOfAddNum}>点击仅重绘number</button>
    </div>
  );
}

export default Page;
```
