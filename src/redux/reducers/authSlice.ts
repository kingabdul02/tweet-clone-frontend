import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { AuthUser } from '../../models/user.model';

interface AuthState {
  user: AuthUser | null;
  status: 'idle' | 'loading' | 'failed';
  isLoggedIn: boolean;
  error?: string
}

const initialState: AuthState = {
  user: null,
  status: 'idle',
  isLoggedIn: false,
  error: ''
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }: { email: string; password: string }) => {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      // Throw an error if the response status is not in the 2xx range
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to login');
    }

    // If response status is in the 2xx range, return the data
    const responseData = await response.json();
    return responseData as unknown as AuthUser;
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async () => {
    await fetch('http://localhost:3000/api/auth/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return null;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;

        // Store user data and access token in local storage upon successful login
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('accessToken', action.payload.access_token);
        localStorage.setItem('isLoggedIn', 'true');
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoggedIn = false;
        state.error = action.error.message;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isLoggedIn = false;
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        localStorage.setItem('isLoggedIn', 'false');
      });
  },
});

export const selectLoggedInUser = (state: RootState) => state.auth.user;
export const selectAuthStatus = (state: RootState) => state.auth.status;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

export default authSlice.reducer;
