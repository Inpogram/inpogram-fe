import React, { useRef } from 'react'
import AddPostHeader from './AddPostHeader'
import AddPostInformation from './AddPostInformation'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import addPostSlice, {
  addPostThunk
} from '../../../redux/reducers/addPostSlice'
import { addPostSelector } from '../../../redux/selectors'
import ResultPopup from '../../ui/popup/ResultPopup'
import usePostValidation from '../../../hooks/usePostValidation'
import store from '../../../redux/store'
import { useNavigate } from 'react-router-dom'
import AddPostFooter from './AddPostFooter'

const AddPost = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { content, tags, title, showMessage, addedPost } =
    useAppSelector(addPostSelector)

  const { validateBanner, validateContent, validateTitle } = usePostValidation()

  const formRef = useRef<any>()

  const handleAddPost = async () => {
    dispatch(addPostSlice.actions.changeIsCreateClick(true))

    const formDataInput = new FormData(formRef.current)
    const bannerImage = formDataInput.get('actBanner') as File

    // Validate all input fields that are required
    validateTitle(title, addPostSlice.actions.changeTitleErrorMessage)
    validateBanner(bannerImage, addPostSlice.actions.changeBannerErrorMessage)
    validateContent(content, addPostSlice.actions.changeContentErrorMessage)

    // Check if there is any error on page
    const updatedStates = store.getState().addPost

    const errorMessages = [
      updatedStates.tagsErrorMessage,
      updatedStates.bannerErrorMessage,
      updatedStates.titleErrorMessage,
      updatedStates.contentErrorMessage
    ]

    if (errorMessages.some((error) => error !== '')) {
      return
    }

    // Append fields to form and create post
    const formData = new FormData()
    formData.append('bannerImage', bannerImage)
    formData.append('title', title.trim())
    formData.append('content', content.trim())
    formData.append('tags', tags)

    dispatch(addPostThunk(formData))
  }

  const handleCancelAddPost = () => {
    if (formRef.current) {
      const bannerInput = formRef.current.elements.namedItem(
        'actBanner'
      ) as HTMLInputElement
      bannerInput.value = ''
    }
    dispatch(addPostSlice.actions.reset())
    navigate('/posts')
  }

  const handleClosePopup = () => {
    dispatch(addPostSlice.actions.toggleShowMessage(false))
    const updatedState = store.getState().addPost
    navigate(`/posts/${updatedState.title.trim()}`)
  }

  return (
    <>
      <ResultPopup
        isOpen={showMessage && addedPost.data !== null}
        setIsOpen={handleClosePopup}
        isSuccess
        message="You have created this event successfully!
      The event is waiting for approval."
      />

      <form
        ref={formRef}
        className="flex flex-col gap-8 container mx-auto pt-5 pb-8 px-[24px]"
      >
        <AddPostHeader />
        <AddPostInformation />
        <AddPostFooter
          handleAddPost={handleAddPost}
          handleCancelAddPost={handleCancelAddPost}
        />
      </form>
    </>
  )
}

export default AddPost
