import { configureStore } from '@reduxjs/toolkit';
import commentReducer from '../features/comment/commentSlice';
import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    comment: commentReducer
  },
});
