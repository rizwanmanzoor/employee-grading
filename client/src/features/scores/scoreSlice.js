import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "@/constants/ApiConstant";

// ✅ Async thunk — scores fetch from API
export const fetchEmployeeScores = createAsyncThunk(
  "scores/fetchEmployeeScores",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE_URL}/employee/scores`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();

      if (!data.success) {
        return rejectWithValue(data.message || "Failed to fetch score");
      }

      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const scoreSlice = createSlice({
  name: "scores",
  initialState: {
    employee: null,
    calculateScores: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetScores: (state) => {
      state.employee = null;
      state.calculateScores = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployeeScores.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployeeScores.fulfilled, (state, action) => {
        state.loading = false;
        state.employee = action.payload.employee;
        state.calculateScores = action.payload.calculateScores;
      })
      .addCase(fetchEmployeeScores.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { resetScores } = scoreSlice.actions;
export default scoreSlice.reducer;
