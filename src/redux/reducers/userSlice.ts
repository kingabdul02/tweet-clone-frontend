import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { RegistrationRequestDto, User } from '../../models/user.model';

interface UserState {
    users: User[];
    status: 'idle' | 'loading' | 'failed';
    hasFetched: boolean; // New flag
  }
  
  const initialState: UserState = {
    users: [],
    status: 'idle',
    hasFetched: false, // Set to false initially
  };

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await fetch('http://localhost:3000/api/users'); // Replace with your backend endpoint
    const data = await response.json();
    return data as User[];
  });



export const registerUser = createAsyncThunk(
  'users/registerUser',
  async (registrationData: RegistrationRequestDto) => {
    const response = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registrationData),
    });
    const data = await response.json();
    return data as User;
  }
);

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
    builder
        .addCase(fetchUsers.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.status = 'idle';
            state.users = action.payload,
            state.hasFetched = true
        })
        .addCase(fetchUsers.rejected, (state) => {
            state.status = 'failed';
        })
        .addCase(registerUser.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(registerUser.fulfilled, (state, action) => {
          state.status = 'idle';
          state.users.push(action.payload);
        })
        .addCase(registerUser.rejected, (state) => {
          state.status = 'failed';
        });
    }
});

export const selectAllusers = (state: RootState) => state.users.users;
export const selectUserStatus = (state: RootState) => state.users.status

export default userSlice.reducer;