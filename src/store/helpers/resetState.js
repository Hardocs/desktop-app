import store from '@/store';

export const DEFAULT_STATE = JSON.parse(JSON.stringify(store.state));
export const resetState = () => {
  store.replaceState(JSON.parse(JSON.stringify(DEFAULT_STATE)));
};
