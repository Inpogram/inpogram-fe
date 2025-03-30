import { useAppDispatch } from '.'
import moment from 'moment'
import { AnyAction } from '@reduxjs/toolkit'

enum ValidationError {
  BANNER_IMAGE_FORMAT = 'Please upload a JPG or PNG file for the banner.',
  BANNER_IMAGE_SIZE = 'The banner image should not exceed 3MB.',
  TITLE_LENGTH = 'Title must be from 2 to 100 characters',
  INVALID_NATURAL_NUMBER = 'Please enter a valid natural number',
  CONTENT_LENGTH = 'Content must consist of at least 100 words'
}

const usePostValidation = () => {
  const dispatch = useAppDispatch()

  // Common functions
  const validateTitleLength = (title: string) => {
    return title.trim().length < 2 || title.trim().length > 100
      ? ValidationError.TITLE_LENGTH
      : ''
  }

  const validateContentLength = (content: string) => {
    return content.trim().length < 100 ? ValidationError.CONTENT_LENGTH : ''
  }

  // End common functions

  const validateBanner = (
    file: File,
    changeBannerErrorMessage: (payload: any) => AnyAction
  ) => {
    const allowedExtensions = [
      'image/png',
      'image/jpg',
      'image/jpeg',
      'image/gif'
    ]
    const maxSize = 3 * 1024 * 1024 // 3MB
    let mess = ''
    if (!allowedExtensions.includes(file.type)) {
      // setBannerErrorMessage('Please upload a JPG or PNG file for the banner.');
      mess = ValidationError.BANNER_IMAGE_FORMAT
    }

    if (file.size > maxSize) {
      // setBannerErrorMessage('The banner image should not exceed 3MB.');
      if (mess !== '') mess += '\n'
      mess += ValidationError.BANNER_IMAGE_SIZE
    }
    if (mess !== '') {
      dispatch(changeBannerErrorMessage(mess))
    } else {
      const image = new Image()
      image.src = URL.createObjectURL(file)
      image.onload = () => {
        dispatch(changeBannerErrorMessage(''))
        URL.revokeObjectURL(image.src)
      }
    }
  }

  const validateContent = (
    content: string,
    changeContentErrorMessage: (payload: any) => AnyAction
  ) => {
    const errorMessage = validateContentLength(content)
    dispatch(changeContentErrorMessage(errorMessage))
  }

  const validateTitle = (
    title: string,
    changeTitleErrorMessage: (payload: any) => AnyAction
  ) => {
    const errorMessage = validateTitleLength(title)
    dispatch(changeTitleErrorMessage(errorMessage))
  }

  const validateNumParticipants = (
    value: string,
    changeNumParticipantsErrorMessage: (payload: any) => AnyAction
  ) => {
    if (/^[1-9]\d*$/.test(value)) {
      dispatch(changeNumParticipantsErrorMessage(''))
    } else {
      dispatch(
        changeNumParticipantsErrorMessage(
          ValidationError.INVALID_NATURAL_NUMBER
        )
      )
    }
  }

  return {
    validateBanner,
    validateContent,
    validateTitle,
    validateNumParticipants
  }
}

export default usePostValidation
