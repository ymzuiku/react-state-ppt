import React from 'react';
import * as dispatchs from '../dispatchs';
import { Consumer } from '../store';

function ReRenderExample() {
  console.log('此日志若打印两次，表示 App 被重复渲染');
  return (
    <div className="app">
      <p>检测重绘及列表内的重绘</p>
      <Consumer memo={state => [state.user.info.num]}>
        {state => {
          console.log('重绘number');
          return <h2>{state.user.info.num}</h2>;
        }}
      </Consumer>
      <Consumer memo={state => [state.user.list]}>
        {state =>
          state.user.list.map((v, i) => {
            return (
              <Consumer key={v} memo={state => [state.user.list[i]]}>
                {state => {
                  console.log(`重绘列表的某一列, 当前重绘的是列：${i}`);
                  return <h2>{state.user.list[i]}</h2>;
                }}
              </Consumer>
            );
          })
        }
      </Consumer>

      <button onClick={dispatchs.dispatchOfAddNum}>点击仅重绘number</button>
      <button onClick={dispatchs.dispatchOfAddListFirst}>点击仅重绘List的第一栏， 并且模拟了异步500ms才更新</button>
      <button onClick={dispatchs.dispatchOfAddListLength}>添加一栏list</button>
      <button onClick={dispatchs.dispatchOfJumpToSimpleExample}>回到第一个例子页面</button>
    </div>
  );
}

export default ReRenderExample;
