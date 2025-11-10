import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "@/constants/ApiConstant";

// Async thunk to fetch employee data from API
export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
   async (_, { rejectWithValue }) => {
     try {
       const res = await fetch(`${API_BASE_URL}/employee/history`, {
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

export const exportEmployees = createAsyncThunk(
  "employees/exportEmployees",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE_URL}/employee/export`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to export employees");
      }

      // Get file blob from response
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      // Create and trigger download
      const a = document.createElement("a");
      a.href = url;
      a.download = "employees.xlsx"; // or "employees.csv"/"employees.pdf"
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      return true; // optional, you can return a success flag
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const changeEmployeePassword = createAsyncThunk(
  "employees/changeEmployeePassword",
  async ({ employeeId, newPassword }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE_URL}/employee/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          id: employeeId,
          password: newPassword,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        return rejectWithValue(data.message || "Failed to change password");
      }

      return data.message;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const employeeSlice = createSlice({
  name: "employees",
  initialState: {
    data: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
    exportStatus: "idle",
    exportError: null,
    passwordStatus: "idle",
    passwordMessage: null,
    isModalOpen: false,
    selectedEmployee: null,
  },
  reducers: {
     openPasswordModal: (state, action) => {
      state.isModalOpen = true;
      state.selectedEmployee = action.payload; // employee object
      state.passwordMessage = null;
      state.passwordStatus = "idle";
    },
    closePasswordModal: (state) => {
      state.isModalOpen = false;
      state.selectedEmployee = null;
      state.passwordMessage = null;
      state.passwordStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Export employees
      .addCase(exportEmployees.pending, (state) => {
        state.exportStatus = "loading";
      })
      .addCase(exportEmployees.fulfilled, (state) => {
        state.exportStatus = "succeeded";
      })
      .addCase(exportEmployees.rejected, (state, action) => {
        state.exportStatus = "failed";
        state.exportError = action.payload;
      })
       // Change password
      .addCase(changeEmployeePassword.pending, (state) => {
        state.passwordStatus = "loading";
      })
      .addCase(changeEmployeePassword.fulfilled, (state, action) => {
        state.passwordStatus = "succeeded";
        state.passwordMessage = action.payload;
      })
      .addCase(changeEmployeePassword.rejected, (state, action) => {
        state.passwordStatus = "failed";
        state.passwordMessage = action.payload;
      });
  },
});
export const { openPasswordModal, closePasswordModal } = employeeSlice.actions;
export default employeeSlice.reducer;
