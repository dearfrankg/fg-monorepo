import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/components/example3/counter-slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: counterReducer,
    },
  });
};

const store = makeStore();

export default store;
