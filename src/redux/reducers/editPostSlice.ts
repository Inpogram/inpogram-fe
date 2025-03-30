import { IPost } from './../../shared/interfaces'
import {
  createSlice,
  createAsyncThunk,
  SerializedError
} from '@reduxjs/toolkit'
import activityApi from '../../apis/PostApi'
import { checkDateTimeBeforeCurrent } from '../../utils/TimeUtil'

type InitialState = {
  showMessage: boolean
  canEdit: boolean | null
  initialPost: {
    data: IPost | null
    loading: boolean
    error: SerializedError
  }
  activityTypes: {
    data: any[]
    loading: boolean
    error: SerializedError
  }
  activityFormats: {
    data: any[]
    loading: boolean
    error: SerializedError
  }
  editedPost: {
    data: IPost | null
    loading: boolean
    error: SerializedError
  }
  bannerUrl: string
  description: string
  tags: string
  submissionRequired: string
  isAnySubPost: string
  bannerOriginalName: string
  title: string
  type: string
  format: string
  numParticipants: string
  startDate: string
  startTime: string
  endDate: string
  endTime: string
  subEndDate: string
  subEndTime: string
  subPosts: any[]
  descriptionErrorMessage: string
  tagsErrorMessage: string
  bannerErrorMessage: string
  titleErrorMessage: string
  numParticipantsErrorMessage: string
  startDateErrorMessage: string
  startTimeErrorMessage: string
  endDateErrorMessage: string
  endTimeErrorMessage: string
  subEndDateErrorMessage: string
  subEndTimeErrorMessage: string
  isStartDateTimeDisabled: boolean
  isEndDateTimeDisabled: boolean
  isSubEndDateTimeDisabled: boolean
  isUpdateClicked: boolean
}

const initialState: InitialState = {
  showMessage: false,
  canEdit: null,
  initialPost: {
    data: null,
    loading: false,
    error: {}
  },
  activityTypes: {
    data: [],
    loading: false,
    error: {}
  },
  activityFormats: {
    data: [],
    loading: false,
    error: {}
  },
  editedPost: {
    data: null,
    loading: false,
    error: {}
  },
  bannerUrl: '',
  description: '',
  tags: '',
  submissionRequired: 'no',
  isAnySubPost: 'no',
  bannerOriginalName: 'Banner (jpg, png, gif)',
  title: '',
  type: '',
  format: '',
  numParticipants: '',
  startDate: '',
  startTime: '',
  endTime: '',
  endDate: '',
  subEndDate: '',
  subEndTime: '',
  subPosts: [
    {
      subPostTitle: '',
      subPostDescription: '',
      subPostStartDate: '',
      subPostStartTime: '',
      subPostEndDate: '',
      subPostEndTime: '',
      subPostTitleErrorMessage: '',
      subPostDescriptionErrorMessage: '',
      subPostStartDateErrorMessage: '',
      subPostStartTimeErrorMessage: '',
      subPostEndDateErrorMessage: '',
      subPostEndTimeErrorMessage: '',
      isSubPostStartDateTimeDisabled: false,
      isSubPostEndDateTimeDisabled: false
    }
  ],
  tagsErrorMessage: '',
  bannerErrorMessage: '',
  descriptionErrorMessage: '',
  titleErrorMessage: '',
  numParticipantsErrorMessage: '',
  startTimeErrorMessage: '',
  startDateErrorMessage: '',
  endDateErrorMessage: '',
  endTimeErrorMessage: '',
  subEndDateErrorMessage: '',
  subEndTimeErrorMessage: '',
  isStartDateTimeDisabled: false,
  isEndDateTimeDisabled: false,
  isSubEndDateTimeDisabled: false,
  isUpdateClicked: false
}

export const getPostByTitleThunk = createAsyncThunk(
  'get-post-by-title',
  async (input: { title: string; creatorId: string }) => {
    const { data } = await activityApi.getPostByTitle(input.title)
    return { data: data, creatorId: input.creatorId }
  }
)

export const getPostTypesThunk = createAsyncThunk(
  'get-post-types',
  async () => {
    const { data } = await activityTypeApi.getPostTypes()
    return data
  }
)

export const getPostFormatsThunk = createAsyncThunk(
  'get-post-formats',
  async () => {
    const { data } = await activityFormatApi.getPostFormats()
    return data
  }
)

export const editPostThunk = createAsyncThunk(
  'edit-post',
  async (input: { id: string; body: FormData }, { rejectWithValue }) => {
    try {
      const { data } = await activityApi.editPost(input.id, input.body)
      return data
    } catch (e) {
      return rejectWithValue(e.data)
    }
  }
)

const editPostSlice = createSlice({
  name: 'editPost',
  initialState,
  reducers: {
    reset: (state) => {
      return {
        ...initialState,
        activityTypes: state.activityTypes,
        activityFormats: state.activityFormats
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
    changeIsAnySubPost: (state, action) => {
      state.isAnySubPost = action.payload
    },
    changeBannerOriginalName: (state, action) => {
      state.bannerOriginalName = action.payload
    },
    changeDescription: (state, action) => {
      state.description = action.payload
    },
    changeNumParticipants: (state, action) => {
      state.numParticipants = action.payload
    },
    changeType: (state, action) => {
      state.type = action.payload
    },
    changeFormat: (state, action) => {
      state.format = action.payload
    },
    changeStartDate: (state, action) => {
      state.startDate = action.payload
    },
    changeStartTime: (state, action) => {
      state.startTime = action.payload
    },
    changeEndDate: (state, action) => {
      state.endDate = action.payload
    },
    changeEndTime: (state, action) => {
      state.endTime = action.payload
    },
    changeSubEndTime: (state, action) => {
      state.subEndTime = action.payload
    },
    changeSubEndDate: (state, action) => {
      state.subEndDate = action.payload
    },
    changeDescriptionErrorMessage: (state, action) => {
      state.descriptionErrorMessage = action.payload
    },
    changeStartDateErrorMessage: (state, action) => {
      state.startDateErrorMessage = action.payload
    },
    changeStartTimeErrorMessage: (state, action) => {
      state.startTimeErrorMessage = action.payload
    },
    changeEndDateErrorMessage: (state, action) => {
      state.endDateErrorMessage = action.payload
    },
    changeEndTimeErrorMessage: (state, action) => {
      state.endTimeErrorMessage = action.payload
    },
    changeSubEndDateErrorMessage: (state, action) => {
      state.subEndDateErrorMessage = action.payload
    },
    changeSubEndTimeErrorMessage: (state, action) => {
      state.subEndTimeErrorMessage = action.payload
    },
    changePostTimelineErrorMessages: (state, action) => {
      state.startDateErrorMessage = action.payload.startDateErrorMessage
      state.startTimeErrorMessage = action.payload.startTimeErrorMessage
      state.endDateErrorMessage = action.payload.endDateErrorMessage
      state.endTimeErrorMessage = action.payload.endTimeErrorMessage
      state.subEndDateErrorMessage = action.payload.subEndDateErrorMessage
      state.subEndTimeErrorMessage = action.payload.subEndTimeErrorMessage
      state.subPosts = action.payload.subPosts
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
    changeNumParticipantsErrorMessage: (state, action) => {
      state.numParticipantsErrorMessage = action.payload
    },
    changeSubPosts: (state, action) => {
      state.subPosts = action.payload
    },
    changeIsUpdateClick: (state, action) => {
      state.isUpdateClicked = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(editPostThunk.pending, (state) => {
        state.editedPost.loading = true
        state.editedPost.error = {}
        state.editedPost.data = null
      })
      .addCase(editPostThunk.fulfilled, (state, action) => {
        state.editedPost.loading = false
        state.editedPost.data = action.payload
        state.showMessage = true
      })
      .addCase(editPostThunk.rejected, (state, action: any) => {
        state.editedPost.loading = false
        state.editedPost.error = action.payload
        state.showMessage = true

        if (action.error) {
          state.titleErrorMessage = action.payload.errorMessage.errorMessage
        }
      })

      .addCase(getPostTypesThunk.pending, (state) => {
        state.activityTypes.loading = true
      })
      .addCase(getPostTypesThunk.fulfilled, (state, action) => {
        state.activityTypes.loading = false
        state.activityTypes.data = action.payload
      })
      .addCase(getPostTypesThunk.rejected, (state, action) => {
        state.activityTypes.loading = false
        state.activityTypes.error = action.error
      })

      .addCase(getPostFormatsThunk.pending, (state) => {
        state.activityFormats.loading = true
      })
      .addCase(getPostFormatsThunk.fulfilled, (state, action) => {
        state.activityFormats.loading = false
        state.activityFormats.data = action.payload
      })
      .addCase(getPostFormatsThunk.rejected, (state, action) => {
        state.activityFormats.loading = false
        state.activityFormats.error = action.error
      })

      .addCase(getPostByTitleThunk.pending, (state) => {
        state.initialPost.loading = true
      })
      .addCase(getPostByTitleThunk.fulfilled, (state, action) => {
        state.initialPost.loading = false
        state.initialPost.data = action.payload.data
        if (action.payload.creatorId === state.initialPost.data!.creator.id) {
          state.canEdit = true
        } else {
          state.canEdit = false
        }
        const {
          numberOfParticipants,
          description,
          bannerUrl,
          bannerOriginalName,
          endDate,
          endTime,
          format,
          type,
          title,
          startDate,
          startTime,
          subPosts,
          submissionEndDate,
          submissionEndTime,
          tags
        } = state.initialPost.data!

        state.description = description
        state.bannerUrl = bannerUrl
        state.bannerOriginalName = bannerOriginalName

        state.title = title
        state.numParticipants = numberOfParticipants
        state.tags = tags
        state.startTime = startTime
        state.format = format
        state.type = type
        state.startDate = startDate
        state.startTime = startTime
        state.endDate = endDate
        state.endTime = endTime
        state.subEndDate = submissionEndDate ? submissionEndDate : ''
        state.subEndTime = submissionEndTime ? submissionEndTime : ''
        state.isStartDateTimeDisabled = checkDateTimeBeforeCurrent(
          startDate,
          startTime
        )
        state.isEndDateTimeDisabled = checkDateTimeBeforeCurrent(
          endDate,
          endTime
        )
        state.isSubEndDateTimeDisabled = checkDateTimeBeforeCurrent(
          submissionEndDate,
          submissionEndTime
        )

        if (submissionEndDate === '' || submissionEndDate === null)
          state.submissionRequired = 'no'
        else state.submissionRequired = 'yes'

        if (subPosts !== null) {
          state.isAnySubPost = 'yes'
          state.subPosts = subPosts.map((sub: any) => ({
            ...sub,
            subPostTitleErrorMessage: '',
            subPostDescriptionErrorMessage: '',
            subPostStartDateErrorMessage: '',
            subPostStartTimeErrorMessage: '',
            subPostEndDateErrorMessage: '',
            subPostEndTimeErrorMessage: '',
            isSubPostStartDateTimeDisabled: checkDateTimeBeforeCurrent(
              sub.subPostStartDate,
              sub.subPostStartTime
            ),
            isSubPostEndDateTimeDisabled: checkDateTimeBeforeCurrent(
              sub.subPostEndDate,
              sub.subPostEndTime
            )
          }))
        } else {
          state.isAnySubPost = 'no'
          state.subPosts = [
            {
              subPostTitle: '',
              subPostDescription: '',
              subPostStartDate: '',
              subPostStartTime: '',
              subPostEndDate: '',
              subPostEndTime: '',
              subPostTitleErrorMessage: '',
              subPostDescriptionErrorMessage: '',
              subPostStartDateErrorMessage: '',
              subPostStartTimeErrorMessage: '',
              subPostEndDateErrorMessage: '',
              subPostEndTimeErrorMessage: '',
              isSubPostStartDateTimeDisabled: false,
              isSubPostEndDateTimeDisabled: false
            }
          ]
        }
      })
      .addCase(getPostByTitleThunk.rejected, (state, action) => {
        state.initialPost.loading = false
        state.initialPost.error = action.error
      })
  }
})

export default editPostSlice
