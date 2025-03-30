import {
  createSlice,
  createAsyncThunk,
  SerializedError
} from '@reduxjs/toolkit'
import { IPost } from '../../shared/interfaces'
import postTagApi from '../../apis/PostTagApi'
import postApi from '../../apis/PostApi'

type InitialState = {
  showMessage: boolean
  initialPost: {
    data: IPost | null
    loading: boolean
    error: SerializedError
  }
  postTags: {
    data: any[]
    loading: boolean
    error: SerializedError
  }
  addedPost: {
    data: IPost | null
    loading: boolean
    error: any
  }
  content: string
  tags: string[]
  submissionRequired: string
  bannerOriginalName: string
  title: string
  contentErrorMessage: string
  tagsErrorMessage: string
  bannerErrorMessage: string
  titleErrorMessage: string
  isCreateClicked: boolean
}

const initialState: InitialState = {
  showMessage: false,
  initialPost: {
    data: null,
    loading: false,
    error: {}
  },
  postTags: {
    data: [],
    loading: false,
    error: {}
  },
  addedPost: {
    data: null,
    loading: false,
    error: {}
  },
  content: '',
  tags: [],
  submissionRequired: 'no',
  bannerOriginalName: 'Choose file',
  title: '',
  tagsErrorMessage: '',
  bannerErrorMessage: '',
  contentErrorMessage: '',
  titleErrorMessage: '',
  isCreateClicked: false
}

export const getPostTagsThunk = createAsyncThunk('get-post-tags', async () => {
  const { data } = await postTagApi.getPostTags()
  return data
})

export const addPostThunk = createAsyncThunk(
  'add-post',
  async (body: FormData, { rejectWithValue }) => {
    try {
      const { data } = await postApi.addPost(body)
      return data
    } catch (e) {
      return rejectWithValue(e.data)
    }
  }
)

const addPostSlice = createSlice({
  name: 'addPost',
  initialState,
  reducers: {
    reset: (state) => {
      return {
        ...initialState,
        postTags: state.postTags
      }
    },
    toggleShowMessage: (state, action) => {
      state.showMessage = action.payload
    },
    changeTitle: (state, action) => {
      state.title = action.payload
    },
    changeTags: (state, action) => {
      state.tags = action.payload
    },
    changeSubmissionRequired: (state, action) => {
      state.submissionRequired = action.payload
    },
    changeBannerOriginalName: (state, action) => {
      state.bannerOriginalName = action.payload
    },
    changeContent: (state, action) => {
      state.content = action.payload
    },
    changeContentErrorMessage: (state, action) => {
      state.contentErrorMessage = action.payload
    },
    changeTagsErrorMessage: (state, action) => {
      state.tagsErrorMessage = action.payload
    },
    changeBannerErrorMessage: (state, action) => {
      state.bannerErrorMessage = action.payload
    },
    changeTitleErrorMessage: (state, action) => {
      state.titleErrorMessage = action.payload
    },
    changeIsCreateClick: (state, action) => {
      state.isCreateClicked = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPostThunk.pending, (state) => {
        state.addedPost.loading = true
        state.addedPost.error = {}
        state.addedPost.data = null
      })
      .addCase(addPostThunk.fulfilled, (state, action) => {
        state.addedPost.loading = false
        state.addedPost.data = action.payload
        state.showMessage = true
      })
      .addCase(addPostThunk.rejected, (state, action: any) => {
        state.addedPost.loading = false
        state.addedPost.error = action.payload
        state.showMessage = true
        if (action.error) {
          state.titleErrorMessage = action.payload.message
        }
      })

      .addCase(getPostTagsThunk.pending, (state) => {
        state.postTags.loading = true
      })
      .addCase(getPostTagsThunk.fulfilled, (state, action) => {
        state.postTags.loading = false
        state.postTags.data = action.payload
      })
      .addCase(getPostTagsThunk.rejected, (state, action) => {
        state.postTags.loading = false
        state.postTags.error = action.error
      })
  }
})

export default addPostSlice
