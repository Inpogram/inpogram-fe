import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../auth/authSlice'

const store = configureStore({
  reducer: {
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export default store
