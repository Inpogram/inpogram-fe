import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import postApi from '../../apis/PostApi'
import { IPost } from '../../shared/interfaces'

type InitialState = {
  initialPost: {
    data: IPost | null
    loading: boolean
    error: any
  }
  reload: boolean
}
const initialState: InitialState = {
  initialPost: {
    data: null,
    loading: false,
    error: {}
  },
  reload: false
}

export const getPostByTitleThunk = createAsyncThunk(
  'get-post-by-title-thunk',
  async (title: string) => {
    const { data } = await postApi.getPostByTitle(title)
    return data
  }
)

const postDetailsSlice = createSlice({
  name: 'standAlonePost',
  initialState,
  reducers: {
    toggleReloadPost: (state, action) => {
      state.reload = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPostByTitleThunk.pending, (state) => {
        state.initialPost.loading = true
      })
      .addCase(getPostByTitleThunk.fulfilled, (state, action) => {
        state.initialPost.loading = false
        state.initialPost.data = action.payload
        if (
          action.payload.submissionEndDate === null ||
          action.payload.submissionEndTime === null
        ) {
          action.payload.submissionEndDate = action.payload.endDate
          action.payload.submissionEndTime = action.payload.endTime
            ? action.payload.endTime
            : '23:59'
        }
      })
      .addCase(getPostByTitleThunk.rejected, (state, action) => {
        state.initialPost.loading = false
        state.initialPost.error = action.error
      })
  }
})

export default postDetailsSlice
