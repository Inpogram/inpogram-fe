import React, { useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import AllPosts from '../../components/posts/allPosts'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { allPostsSelector } from '../../redux/selectors'
import allPostsSlice, {
  getPostsThunk
} from '../../redux/reducers/allPostsSlice'
import _ from 'lodash'

const PostsPage = () => {
  const dispatch = useAppDispatch()
  const { loading, error, data, filters, page, size, q, sortBy, sortOrder } =
    useAppSelector(allPostsSelector)
  const [searchParams, setSearchParams] = useSearchParams()

  const currentParams = useMemo(
    () => Object.fromEntries([...searchParams]),
    [searchParams]
  )

  useEffect(() => {
    const searchParamsObj: {
      q?: string
      page?: string
      size?: string
      filters?: string
      sortBy?: string
      sortOrder?: string
    } = {}

    if (q) {
      searchParamsObj.q = q
    }
    if (filters) {
      searchParamsObj.filters = filters.join(',')
    }
    if (page) {
      searchParamsObj.page = page
    }
    if (size) {
      searchParamsObj.size = size
    }
    if (sortBy) {
      searchParamsObj.sortBy = sortBy
    }
    if (sortOrder) {
      searchParamsObj.sortOrder = sortOrder
    }

    setSearchParams(searchParamsObj)
  }, [filters, sortBy, sortOrder, page, size, q, setSearchParams])

  useEffect(() => {
    if (!_.isEmpty(currentParams)) {
      if (currentParams.page) {
        dispatch(allPostsSlice.actions.changePage(currentParams.page))
      }
      if (currentParams.size) {
        dispatch(allPostsSlice.actions.changeSize(currentParams.size))
      }
      if (currentParams.q) {
        dispatch(allPostsSlice.actions.changeQuery(currentParams.q))
      }
      if (currentParams.sortBy) {
        dispatch(allPostsSlice.actions.changeSortBy(currentParams.sortBy))
      }
      if (currentParams.sortOrder) {
        dispatch(allPostsSlice.actions.changeSortOrder(currentParams.sortOrder))
      }
      if (currentParams.filters) {
        dispatch(
          allPostsSlice.actions.changeFilters(currentParams.filters.split(','))
        )
      }
      dispatch(
        getPostsThunk({
          filters: currentParams.filters,
          page: currentParams.page,
          size: currentParams.size,
          q: currentParams.q,
          sortBy: currentParams.sortBy,
          sortDirection: currentParams.sortOrder
        })
      )
    }
  }, [searchParams])
  if (error instanceof Error) return <>An error has occurred: {error.message}</>

  return <AllPosts loading={loading} allPosts={data} />
}

export default PostsPage
