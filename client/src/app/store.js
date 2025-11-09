import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice";
import stepperReducer from "@/features/stepper/stepperSlice";
import scoreReducer from "@/features/scores/scoreSlice";
import employeeReducer from "@/features/employees/employeeSlice";

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     stepper: stepperReducer,
//   },
// });

// export default store;

export const store = configureStore({
  reducer: {
    auth: authReducer,
    stepper: stepperReducer,
    scores: scoreReducer,
    employees: employeeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ✅ FIX: allows File objects
    }),
});