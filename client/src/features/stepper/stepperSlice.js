import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Final API call (mock example)
export const submitFinalForm = createAsyncThunk(
  "stepper/submitFinalForm",
  async (formData, { rejectWithValue }) => {
    console.log(formData);
    try {
      const res = await fetch("http://localhost:8000/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to submit form");
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const stepperSlice = createSlice({
  name: "stepper",
  initialState: {
    currentStep: 0,
    stepData: {
      step1: {},
      step2: {},
      // step3, step4, ... later add
    },
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    saveStepData: (state, action) => {
      const { step, data } = action.payload;
      state.stepData[step] = { ...state.stepData[step], ...data };
    },
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    resetStepper: (state) => {
      state.currentStep = 0;
      state.stepData = { step1: {}, step2: {} };
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitFinalForm.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitFinalForm.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitFinalForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { saveStepData, setCurrentStep, resetStepper } = stepperSlice.actions;
export default stepperSlice.reducer;
