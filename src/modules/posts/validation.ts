import { PostFormData } from './types'

enum ValidationError {
  TITLE_REQUIRED = 'Title is required',
  TITLE_LENGTH = 'Title must be from 2 to 100 characters',
  TITLE_EXISTS = 'Title already exists',
  NO_SPECIAL_CHARS = 'No special characters allowed',
  FEATURED_IMAGE_REQUIRED = 'Featured image is required',
  FEATURED_IMAGE_NAME_REQUIRED = 'Featured image name is required',
  FEATURED_IMAGE_FORMAT = 'Please upload a JPG or PNG file for the featured image.',
  FEATURED_IMAGE_SIZE = 'The featured image should not exceed 3MB.',
  INVALID_NATURAL_NUMBER = 'Please enter a valid natural number',
  TAGS_FORMAT = 'Tags can only contain letters, numbers, or hyphens',
  CONTENT_REQUIRED = 'Content is required',
  CONTENT_LENGTH = 'Content must be at least 100 words'
}

const validateFeaturedImage = (file: File) => {
  if (!file) {
    return ValidationError.FEATURED_IMAGE_REQUIRED
  }

  const allowedExtensions = ['image/png', 'image/jpg', 'image/jpeg']
  const maxSize = 3 * 1024 * 1024 // 3MB
  if (!allowedExtensions.includes(file.type)) {
    return ValidationError.FEATURED_IMAGE_FORMAT
  }
  if (file.size > maxSize) {
    return ValidationError.FEATURED_IMAGE_SIZE
  }
  return true
}

export const validationRules: Record<
  keyof PostFormData,
  {
    required?: string
    validate?: Record<
      string,
      (value: any) => string | boolean | Promise<string | boolean>
    >
  }
> = {
  title: {
    required: ValidationError.TITLE_REQUIRED,
    validate: {
      validLength: (value: string) =>
        (value.trim().length >= 2 && value.trim().length <= 100) ||
        ValidationError.TITLE_LENGTH,
      noSpecialChars: (value: string) =>
        !/[!@#$%^&*]/.test(value) || ValidationError.NO_SPECIAL_CHARS
    }
  },
  content: {
    required: ValidationError.CONTENT_REQUIRED,
    validate: {
      minLength: (value: string) =>
        value.length >= 100 || ValidationError.CONTENT_LENGTH
    }
  },
  featuredImage: {
    required: ValidationError.FEATURED_IMAGE_REQUIRED,
    validate: {
      valid: validateFeaturedImage
    }
  },
  featuredImageName: {
    required: ValidationError.FEATURED_IMAGE_NAME_REQUIRED
  },
  tags: {
    required: undefined,
    validate: {
      validFormat: (value: string[]) =>
        value.every((tag) => /^[a-zA-Z0-9-]+$/.test(tag)) ||
        ValidationError.TAGS_FORMAT
    }
  },
  availableTags: {}
}
