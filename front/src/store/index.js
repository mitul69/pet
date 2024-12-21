import { configureStore } from '@reduxjs/toolkit';
import petReducer, { fetchInitialData } from './slices/petSlice';

const store = configureStore({
  reducer: {
    pet: petReducer,
  },
});

store.dispatch(fetchInitialData());
export default store;
