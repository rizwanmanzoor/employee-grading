import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "@/constants/ApiConstant";
import { resetStepper } from "@/features/stepper/stepperSlice";

// 🔹 Async thunk to call Laravel API
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "Invalid credentials");
      }

      // save token locally
      localStorage.setItem("token", data.token);

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 🔸 Logout API call using fetch
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, {dispatch, rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      dispatch(resetStepper());
      if (!response.ok) {
        throw new Error("Logout failed");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Logout error");
    }
  }
);

// Send OTP
export const sendOtp = createAsyncThunk(
  "auth/sendOtp",
  async ({ username }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE_URL}/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to send OTP");
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Verify OTP
export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ username, otp }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE_URL}/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, otp }),
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "OTP verification failed");

      // save token locally
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.roles?.[0]?.name || null);

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Resend OTP
export const resendOtp = createAsyncThunk(
  "auth/resendOtp",
  async ({ username }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE_URL}/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to resend OTP");
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    role: localStorage.getItem("role") || null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
    otpSent: false,
    otpVerified: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.otpSent = false;
      state.otpVerified = false;
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    },
  },
  extraReducers: (builder) => {
    builder
    // Send OTP
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOtp.fulfilled, (state) => {
        state.loading = false;
        state.otpSent = true;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Verify OTP
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.role = action.payload.user.roles?.[0]?.name || null;
        localStorage.setItem("role", state.role);
        state.otpVerified = true;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Resend OTP
      .addCase(resendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resendOtp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;

        // ✅ Set role
        state.role = action.payload.user.roles?.[0]?.name || null;
        localStorage.setItem("role", state.role);

      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        localStorage.removeItem("token");
        localStorage.removeItem("role");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
