import { store } from './store';

function testAsync() {
  return new Promise(res => {
    setTimeout(res, 500);
  });
}

// 1. 我们完全对 immer 没有感知，但是我们实现了 immutable 的状态控制
// 2. 我们仅描述了 dispatch, 没有再编写其他任何状态管理的模版代码
// 3. 根据我们之前描述的逻辑, 在 dispatch 之前进行异步行为, 可以自行用任何异步处理的方式

/**
 * 异步修改列表第一栏
 */
export function dispatchOfAddNum() {
  store.dispatch(state => {
    state.user.info.num += 1;
  });
}

/**
 * 异步修改列表第一栏
 */
export async function dispatchOfAddListFirst() {
  // 模拟异步 500ms
  await testAsync();
  store.dispatch(state => {
    state.user.list[0] = 'dog ' + Math.random();
  });
}

/**
 * 添加列表长度
 */
export function dispatchOfAddListLength() {
  store.dispatch(state => {
    state.user.list[state.user.list.length] = 'dog ' + Math.random();
  });
}

/**
 * 跳转至第二个例子
 */
export function dispatchOfJumpToReRenderExample() {
  store.dispatch(state => {
    state.path = 'ReRenderExample';
  });
}

/**
 * 跳转至第一个例子
 */
export function dispatchOfJumpToSimpleExample() {
  store.dispatch(state => {
    state.path = 'SimpleExample';
  });
}