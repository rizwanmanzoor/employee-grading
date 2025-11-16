import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "@/constants/ApiConstant";

// ✅ Final API call using FormData
export const submitFinalForm = createAsyncThunk(
  "stepper/submitFinalForm",
  async ({ stepData, selectedOption }, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      // Loop through all steps and append fields
      Object.keys(stepData).forEach((step) => {
        Object.keys(stepData[step]).forEach((key) => {
          if (key === "files") {
            // Append files individually
            stepData[step][key].forEach((fileObj, index) => {
              formData.append(`${step}[files][]`, fileObj.file); // fileObj.file is actual File
            });
          } else {
            formData.append(`${step}[${key}]`, stepData[step][key]);
          }
        });
      });

      formData.append("landing_gateway", selectedOption);

      const res = await fetch(`${API_BASE_URL}/employee/submit`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
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
       step1: {
        verifiedSelected: "verified",
        relevantSelected: "relevant",
      },
      step2: {
        verifiedSelected: "verified",
        relevantSelected: "relevant",
      },
      step3: {
        verifiedSelected: "verified",
      },
      step4: {
        verifiedSelected: "verified",
      },
      step5: {},
      step6: {},
      step7: {},
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
      state.stepData = {
        step1: {},
        step2: {},
        step3: {},
        step4: {},
        step5: {},
        step6: {},
        step7: {},
      };
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
