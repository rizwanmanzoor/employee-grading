import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice";
import stepperReducer from "@/features/stepper/stepperSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    stepper: stepperReducer,
  },
});

export default store;