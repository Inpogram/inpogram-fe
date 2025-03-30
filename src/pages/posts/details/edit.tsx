import React, { useEffect } from 'react'
import EditPost from '../../../components/posts/editPost'
import LinkButton from '../../../components/ui/button/LinkButton'
import { useNavigate, useParams } from 'react-router-dom'
import { authSelector, editPostSelector } from '../../../redux/selectors'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import editPostSlice, {
  getPostByTitleThunk
} from '../../../redux/reducers/editPostSlice'

const EditPostPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { initialPost, canEdit } = useAppSelector(editPostSelector)
  const { user } = useAppSelector(authSelector)
  const { activityTitle } = useParams()
  useEffect(() => {
    if (user) {
      dispatch(
        getPostByTitleThunk({
          title: activityTitle!,
          creatorId: user!.id
        })
      )
    }
  }, [user])
  useEffect(() => {
    if (canEdit === false) {
      navigate('/posts')
    }
  }, [canEdit])
  useEffect(() => {
    return () => {
      dispatch(editPostSlice.actions.reset())
    }
  }, [])
  //Add a button to go back to all events in top left corner
  return (
    <div className="flex flex-col">
      <div className="border-b border-[#F2F3F4 ">
        <div className="container mx-auto flex flex-row items-left py-5">
          <LinkButton
            title="< Back to all posts"
            className="hover:text-[#26A9E0]"
            to="/posts"
          />
        </div>
      </div>
      {initialPost && activityTitle && (
        <EditPost
          activityTitle={activityTitle}
          activityData={initialPost.data}
        />
      )}
    </div>
  )
}

export default EditPostPage
