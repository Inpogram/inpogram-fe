import React, { useRef } from 'react'
import EditPostHeader from './EditPostHeader'
import EditPostInformation from './EditPostInformation'
import { Post } from '../../../types/types'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { editPostSelector } from '../../../redux/selectors'
import ResultPopup from '../../ui/popup/ResultPopup'
import editPostSlice, {
  editPostThunk
} from '../../../redux/reducers/editPostSlice'
import { useNavigate } from 'react-router-dom'
import usePostValidation from '../../../hooks/usePostValidation'
import store from '../../../redux/store'

type EditPostType = {
  activityData: Post
  activityTitle: string
}

const EditPost: React.FC<EditPostType> = ({ activityData, activityTitle }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const {
    description,
    tags,
    submissionRequired,
    isAnySubPost,
    title,
    type,
    format,
    numParticipants,
    startDate,
    startTime,
    endDate,
    endTime,
    subEndDate,
    subEndTime,
    showMessage,
    editedPost,
    subPosts
  } = useAppSelector(editPostSelector)

  const { validateBanner, validateTitle, validateNumParticipants } =
    usePostValidation()

  const formRef = useRef<any>()

  const handleEditPost = async () => {
    dispatch(editPostSlice.actions.changeIsUpdateClick(true))

    const formDataInput = new FormData(formRef.current)
    const bannerInput = formDataInput.get('actBanner') as File

    // Validate all input fields that are required
    validateTitle(title, editPostSlice.actions.changeTitleErrorMessage)

    // No need to check if the image file is not changed
    if (bannerInput.name) {
      validateBanner(
        bannerInput,
        editPostSlice.actions.changeBannerErrorMessage
      )
    }

    // Check if there is any error on page
    const updatedStates = store.getState().editPost

    const subPostErrorMessages = updatedStates.subPosts.flatMap(
      ({
        subPostTitleErrorMessage,
        subPostDescriptionErrorMessage,
        subPostStartDateErrorMessage,
        subPostStartTimeErrorMessage,
        subPostEndDateErrorMessage,
        subPostEndTimeErrorMessage
      }) => [
        subPostTitleErrorMessage,
        subPostDescriptionErrorMessage,
        subPostStartDateErrorMessage,
        subPostStartTimeErrorMessage,
        subPostEndDateErrorMessage,
        subPostEndTimeErrorMessage
      ]
    )

    const errorMessages = [
      updatedStates.descriptionErrorMessage,
      updatedStates.tagsErrorMessage,
      updatedStates.bannerErrorMessage,
      updatedStates.titleErrorMessage,
      updatedStates.numParticipantsErrorMessage,
      updatedStates.startTimeErrorMessage,
      updatedStates.endDateErrorMessage,
      updatedStates.startDateErrorMessage,
      updatedStates.endTimeErrorMessage,
      updatedStates.subEndDateErrorMessage,
      updatedStates.subEndTimeErrorMessage,
      ...subPostErrorMessages
    ]

    if (errorMessages.some((error) => error !== '')) {
      return
    }

    // Append fields to form and create post
    const formData = new FormData()
    formData.append('banner', bannerInput)
    formData.append('title', title.trim())
    formData.append('description', description.trim())
    formData.append('tags', tags.trim())
    formData.append('numberOfParticipants', numParticipants)
    formData.append('type', type)
    formData.append('format', format)
    formData.append('points', '100')
    formData.append('startDate', startDate)
    formData.append('startTime', startTime)
    formData.append('endDate', endDate)
    formData.append('endTime', endTime)

    if (submissionRequired === 'yes') {
      formData.append('submissionEndDate', subEndDate)
      formData.append('submissionEndTime', subEndTime)
    }
    if (isAnySubPost === 'yes') {
      formData.append(
        'subPosts',
        JSON.stringify(
          subPosts.map((sub: any) => ({
            subPostTitle: sub.subPostTitle.trim(),
            subPostDescription: sub.subPostDescription.trim(),
            subPostStartDate: sub.subPostStartDate,
            subPostStartTime: sub.subPostStartTime,
            subPostEndDate: sub.subPostEndDate,
            subPostEndTime: sub.subPostEndTime
          }))
        )
      )
    }

    dispatch(editPostThunk({ id: activityData!.id, body: formData }))
  }

  const handleCancelEditPost = () => {
    if (formRef.current) {
      const bannerInput = formRef.current.elements.namedItem(
        'actBanner'
      ) as HTMLInputElement
      bannerInput.value = ''
    }
    dispatch(editPostSlice.actions.reset())
    navigate(`/posts/${activityTitle}`)
  }

  const handleClosePopup = () => {
    dispatch(editPostSlice.actions.toggleShowMessage(false))
    const updatedState = store.getState().editPost
    navigate(`/posts/${updatedState.title.trim()}`)
  }

  return (
    <>
      <ResultPopup
        isOpen={showMessage && editedPost.data !== null}
        setIsOpen={handleClosePopup}
        isSuccess
        message="You have edited this event successfully!"
      />

      <form
        ref={formRef}
        className="flex flex-col gap-5 container mx-auto pt-5 pb-10"
      >
        <EditPostHeader
          handleEditPost={handleEditPost}
          handleCancelEditPost={handleCancelEditPost}
        />
        <EditPostInformation />
      </form>
    </>
  )
}

export default EditPost
