import React from 'react';
import * as dispatchs from '../dispatchs';
import { Consumer } from '../store';

function SimpleExample() {
  return (
    <div className="app">
      <p>最简单的例子</p>
      <Consumer>{state => <h2>{state.user.info.num}</h2>}</Consumer>
      <button onClick={dispatchs.dispatchOfAddNum}>点击仅重绘number</button>
      <button onClick={dispatchs.dispatchOfJumpToReRenderExample}>去第二个例子页面</button>
    </div>
  );
}

export default SimpleExample;
