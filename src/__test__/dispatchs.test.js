import * as dispatchs from '../dispatchs';
import { store } from '../store';

it('test add', () => {
  dispatchs.dispatchOfAddNum();
  dispatchs.dispatchOfAddNum();
  dispatchs.dispatchOfAddNum();
  expect(store.state.user.info.num).toBe(3);
});
