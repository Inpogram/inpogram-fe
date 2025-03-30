import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import activityApi from '../../apis/PostApi'
import AscendingIcon from '../../components/ui/icon/AscendingIcon'
import DescendingIcon from '../../components/ui/icon/DescendingIcon'

const initialState = {
  loading: false,
  error: {},
  data: [],
  pagination: {
    lastVisiblePage: 0,
    hasNextPage: false,
    currentPage: 0,
    items: {
      total: 0,
      count: 0,
      perPage: 0
    }
  },
  filtersList: [
    { label: 'All Posts', value: 'all' },
    { label: 'Upcoming Posts', value: 'upcoming' },
    { label: 'Closed Posts', value: 'closed' },
    { label: 'My Posts', value: 'my-posts' }
  ],
  sortsList: [
    {
      label: 'Start Date',
      value: { sortBy: 'startDate', sortOrder: 'asc' },
      icon: AscendingIcon
    },
    {
      label: 'Start Date',
      value: { sortBy: 'startDate', sortOrder: 'desc' },
      icon: DescendingIcon
    },
    {
      label: 'End Date',
      value: { sortBy: 'endDate', sortOrder: 'asc' },
      icon: AscendingIcon
    },
    {
      label: 'End Date',
      value: { sortBy: 'endDate', sortOrder: 'desc' },
      icon: DescendingIcon
    },
    {
      label: 'Points',
      value: { sortBy: 'points', sortOrder: 'asc' },
      icon: AscendingIcon
    },
    {
      label: 'Points',
      value: { sortBy: 'points', sortOrder: 'desc' },
      icon: DescendingIcon
    }
  ],
  filtersTitle: ['Upcoming Posts'],
  page: '0',
  size: '10',
  filters: ['upcoming'],
  q: '',
  sortBy: '',
  sortOrder: ''
}

export const getPostsThunk = createAsyncThunk(
  'get-posts',
  async (params: {
    page?: string
    size?: string
    filters?: string
    q?: string
    sortBy?: string
    sortDirection?: string
  }) => {
    const { data } = await activityApi.getPosts(params)
    return data
  }
)

const allPostsSlice = createSlice({
  name: 'allPosts',
  initialState,
  reducers: {
    changePage: (state, action) => {
      state.page = action.payload
    },
    changeSize: (state, action) => {
      state.size = action.payload
    },
    changeQuery: (state, action) => {
      state.q = action.payload
    },
    changeFilters: (state, action) => {
      state.filters = action.payload

      state.filtersTitle = []
      state.filtersList.map((item) => {
        if (state.filters.includes(item.value)) {
          state.filtersTitle = [...state.filtersTitle, item.label]
        }
      })

      if (state.filters.includes('all')) {
        state.filtersTitle = ['All Posts']
      }
    },
    changeSortBy: (state, action) => {
      state.sortBy = action.payload
    },
    changeSortOrder: (state, action) => {
      state.sortOrder = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPostsThunk.pending, (state) => {
        state.loading = true
        state.error = {}
        state.data = []
        state.pagination = {
          lastVisiblePage: 0,
          hasNextPage: false,
          currentPage: 0,
          items: {
            total: 0,
            count: 0,
            perPage: 0
          }
        }
      })
      .addCase(getPostsThunk.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload.data
        state.pagination = action.payload.pagination
      })
      .addCase(getPostsThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
      })
  }
})

export default allPostsSlice
