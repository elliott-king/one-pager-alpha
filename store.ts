import { useMemo } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Here we use redux-persist to store the state in the user's browser as a cookie.
// Thus, if they close the tab or reload, the payment restrictions are still in place.
// If you want to delete the store, delete the "persist:..." cookie in your browser.

// adapted from https://github.com/vercel/next.js/tree/master/examples/with-redux-persist

let store;

const initialState = {
  visited: [],
  hasPaid: false,
  cooke: '',
};

const reducer = (state = initialState, action) => {
  console.log('reducing', state, action);
  switch(action.type) {
    case 'VISIT': 
      console.log('in VISIT case')
      if (state.visited.includes(action.onePagerUrl)) {
        return state;
      }
      return {
        ...state,
        visited: [...state.visited, action.onePagerUrl],
      };
    case 'PAY': 
      return {
        ...state,
        hasPaid: true,
      };
    default: 
      return state;
  };
};

const persistConfig = {
  key: 'primary',
  storage,
  whitelist: ['visited', 'hasPaid']
}

const persistedReducer = persistReducer(persistConfig, reducer)

function makeStore(preloadedState = initialState) {
  return createStore(
    persistedReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware()),
  );
};

const initializeStore = (preloadedState) => {
  let _store = store ?? makeStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = makeStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  if (typeof window === 'undefined') return _store;
  if (!store) store = _store;

  return _store;
};

export function useStore(state) {
  const store = useMemo(() => initializeStore(state), [state])
  return store;
};