export const resetState = (store) => {
  const DEFAULT_STATE = JSON.parse(JSON.stringify(store.state));
  store.replaceState(JSON.parse(JSON.stringify(DEFAULT_STATE)));
  return DEFAULT_STATE;
};
