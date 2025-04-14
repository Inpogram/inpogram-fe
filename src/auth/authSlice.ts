import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as authService from './authService'
import { Role } from './authService'

interface User {
  username: string
  email: string
  profileImageUrl: string
  role: Role
  [key: string]: any
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: true,
  error: null
}

export enum AuthFlow {
  LOGIN = 'login',
  SIGNUP = 'signup'
}

// Async thunks
// Initiate OAuth2 Login
export const initiateOAuthLogin = createAsyncThunk<
  void,
  { provider: string; authFlow: AuthFlow },
  { rejectValue: string }
>(
  'auth/initiateOAuthLogin',
  async ({ provider, authFlow }, { rejectWithValue }) => {
    try {
      authService.redirectToBackendOAuth(provider, authFlow)
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  }
)

// Callback for OAuth
export const handleAuthCallback = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>('auth/handleAuthCallback', async (_, { rejectWithValue }) => {
  try {
    const userData = await authService.fetchUserData()
    return userData
  } catch (error) {
    return rejectWithValue((error as Error).message) || 'Failed to authenticate'
  }
})

// Thunk to initialize/check auth every time page reloads
export const initializeAuth = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>('auth/initializeAuth', async (_, { rejectWithValue }) => {
  try {
    const userData = await authService.fetchUserData()
    return userData
  } catch (error) {
    return rejectWithValue(
      (error as Error).message || 'Failed to initialize auth'
    )
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
      state.loading = false
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(initiateOAuthLogin.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(initiateOAuthLogin.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(initiateOAuthLogin.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ?? 'OAuth login failed'
      })
      .addCase(handleAuthCallback.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(
        handleAuthCallback.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.loading = false
          state.isAuthenticated = true
          state.user = action.payload
        }
      )
      .addCase(handleAuthCallback.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ?? 'Authentication callback failed'
      })
      .addCase(initializeAuth.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(
        initializeAuth.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.loading = false
          state.isAuthenticated = true
          state.user = action.payload
        }
      )
      .addCase(initializeAuth.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ?? 'Authentication callback failed'
      })
  }
})

export const { logout } = authSlice.actions
export default authSlice.reducer
function getState(): { auth: any } {
  throw new Error('Function not implemented.')
}
