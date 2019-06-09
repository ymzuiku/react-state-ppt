import createStateManager from './utils/createStateManager';

// 一个多层级的对象示例，以验证immutable
const initState = {
  path: 'SimpleExample',
  user: {
    list: ['dog', 'cat', 'fish'],
    info: {
      num: 0,
    },
  },
};

const { store, Provider, Consumer } = createStateManager(initState);

export { store, Provider, Consumer };
