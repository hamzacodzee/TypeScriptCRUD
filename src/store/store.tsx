// store.ts
import { configureStore } from '@reduxjs/toolkit';
import addModalReducer from './slice/AddModalSlice';

const store = configureStore({
  reducer: {
    addModal: addModalReducer,
  },
});

// Export the store and the RootState type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
