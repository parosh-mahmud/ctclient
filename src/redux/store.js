// import { createStore, combineReducers } from 'redux';
// import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
// import thunk from 'redux-thunk';

// // import flightsReducer from './reducers/flightReducer';
// import flightReducer from './reducers/flightSlice';
// import flightSlice from './reducers/flightSlice';
// const middleware = [...getDefaultMiddleware(), thunk];
// const rootReducer = combineReducers({
//   flights: flightReducer,
//   flight: flightSlice,
//   // Add other reducers if you have them
// });

// const store = createStore(rootReducer);

// export default store;
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage'; // Import storage from redux-persist (defaults to localStorage)
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { combineReducers } from 'redux';

// Import your reducers
import flightReducer from './reducers/flightSlice';
import airPriceReducer from './slices/airPriceSlice';
import searchIDResultIDReducer from './slices/searchIDResultIDSlice';
import airPreBookReducer from './slices/airPreBookSlice';
import passengerDetailsReducer from './slices/passengerDetailsSlice';

// Define the root reducer
const rootReducer = combineReducers({
  flight: flightReducer,
  airPrice: airPriceReducer,
  searchIDResultID: searchIDResultIDReducer,
  airPreBook: airPreBookReducer,
  passengerDetails: passengerDetailsReducer,
  // Add other reducers here
});

// Define the persist configuration
const persistConfig = {
  key: 'root',
  storage,
  // You might want to specify which parts of your state should be persisted
  // whitelist: ['flight', 'airPrice'], // Only persist these slices
};

// Wrap the root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(thunk),
});

export const persistor = persistStore(store); // Create a persistor

export default store;
