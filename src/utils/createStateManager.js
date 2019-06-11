/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useMemo, useContext } from 'react';
import immer from 'immer';

export default function createStateManager(initalState = {}) {
  // 创建一个 context
  const store = createContext();

  store.state = initalState;
  store.setState = fn => {
    store.state = immer(store.state, v => fn(v));
  };

  // 创建一个提供者组件
  const Provider = props => {
    const [state, setState] = React.useState(store.state);

    // 使用 immer 进行更新状态, 确保未更新的对象还是旧的引用
    store.setState = fn => setState(immer(state, v => fn(v)));
    store.state = state;

    return <store.Provider value={state} {...props} />;
  };
  // 创建一个消费者组件
  const Consumer = ({ children, memo }) => {
    const state = useContext(store);

    return useMemo(
      () => {
        return children(state, store.setState);
      },
      memo ? memo(state) : void 0,
    );
  };
  return { Provider, store, Consumer };
}
