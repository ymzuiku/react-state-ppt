/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { createContext, useMemo, useContext } from 'react';
import immer from 'immer';

export default function createStateManager(initalState = {}) {
  // 创建一个  context, 用于后续配合 useContext 进行更新组件
  const store = createContext();

  // 创建一个提供者组件
  const Provider = ({ defaultState = initalState, ...rest }) => {
    const [state, setState] = React.useState(defaultState);

    // 仅有 state 变更了, 才会重新更新 context 和 store
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

    // 使用props控制 memo
    if (typeof memo === 'function') {
      return useMemo(() => {
        return children(state, store.dispatch);
      }, memo(state));
    }
    return children(state, store.dispatch);
  };

  return { Provider, store, Consumer };
}
