import React, { useRef } from 'react'
import PostFormHeader from './post-form/PostFormHeader'
import PostFormContent from './post-form/PostFormContent'
import ResultPopup from '../../../components/ui/popup/ResultPopup'
import { useNavigate } from 'react-router-dom'
import PostFormFooter from './post-form/PostFormFooter'
import { PostFormData, PostFormProps } from '../types'
import { useForm } from 'react-hook-form'
import { addPost } from '../../../apis/PostApi'

const PostForm = ({ initialValues = {} }: PostFormProps) => {
  const {
    register,
    watch,
    getValues,
    setValue,
    control,
    handleSubmit,
    trigger,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<PostFormData>({
    defaultValues: {
      title: initialValues.title || '',
      content: initialValues.content || '',
      availableTags: initialValues.availableTags || [],
      tags: initialValues.tags || [],
      featuredImage: null,
      featuredImageName:
        initialValues.featuredImageName ||
        'Upload image file (.png, .jpg, .jpeg)'
    },
    mode: 'onBlur',
    reValidateMode: 'onSubmit'
  })

  const navigate = useNavigate()
  const formRef = useRef<HTMLFormElement>(null)

  const handleCancelAddPost = () => {
    if (formRef.current) {
      const featuredImage = formRef.current.elements.namedItem(
        'featuredImage'
      ) as HTMLInputElement
      featuredImage.value = ''
    }
    navigate('/posts')
  }

  const handleClosePopup = () => {
    navigate(`/posts/${null}`)
  }

  const onSubmit = async (data: PostFormData) => {
    const isValid = await trigger()

    if (!isValid) {
      return // Stop if any onBlur validations fail
    }

    const formData = new FormData()

    console.log(data.featuredImage)

    if (data.featuredImage) {
      formData.append('featuredImage', data.featuredImage)
    }
    formData.append('title', data.title.trim())
    formData.append('content', data.content.trim())
    formData.append('tags', data.tags.join(','))

    await addPost(formData)
  }

  return (
    <>
      <ResultPopup
        isOpen={false}
        setIsOpen={handleClosePopup}
        isSuccess
        message="You have created this event successfully!
      The event is waiting for approval."
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        ref={formRef}
        className="flex flex-col gap-8 container mx-auto pt-5 pb-8 px-[24px]"
      >
        <PostFormHeader />
        <PostFormContent
          register={register}
          watch={watch}
          getValues={getValues}
          setValue={setValue}
          trigger={trigger}
          control={control}
          errors={errors}
          isSubmitting={isSubmitting}
        />
        <PostFormFooter
          isSubmitting={isSubmitting}
          handleCancelAddPost={handleCancelAddPost}
        />
      </form>
    </>
  )
}

export default PostForm
