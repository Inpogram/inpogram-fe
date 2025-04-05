import React, { useEffect, useRef, useState } from 'react'
import 'react-quill/dist/quill.snow.css'
import Loading from '../../../../components/ui/Loading'
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'
import ButtonInput from '../../../../components/ui/input/ButtonInput'
import RichTextEditor from '../../../../components/ui/editor/RichTextEditor'
import {
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
  Controller,
  UseFormSetValue,
  Control,
  UseFormTrigger,
  UseFormGetValues
} from 'react-hook-form'
import { PostFormData, Tag } from '../../types'
import { getAvailableTags } from '../../../../apis/PostTagApi'
import { debounce } from 'lodash'
import clsx from 'clsx'
import { validationRules } from '../../validation'
import '../../../../components/ui/editor/QuillEditor.css'

interface PostFormContentProps {
  register: UseFormRegister<PostFormData>
  watch: UseFormWatch<PostFormData>
  getValues: UseFormGetValues<PostFormData>
  setValue: UseFormSetValue<PostFormData>
  trigger: UseFormTrigger<PostFormData>
  control: Control<PostFormData>
  errors: FieldErrors<PostFormData>
  isSubmitting: boolean
}

const PostFormContent = ({
  register,
  watch,
  getValues,
  setValue,
  trigger,
  control,
  errors,
  isSubmitting
}: PostFormContentProps) => {
  const [titleInput, setTitleInput] = useState<string>('')
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false)
  const [availableTags, setAvailableTags] = useState<Tag[]>([])
  const [filteredTags, setFilteredTags] = useState<Tag[]>([])
  const [tagInput, setTagInput] = useState<string>('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [isLoadingTags, setIsLoadingTags] = useState<boolean>(true)
  const [isTagsDropdownOpen, setIsTagsDropdownOpen] = useState<boolean>(false)
  const tagsListRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleClickOutsideTagsList = (event: MouseEvent) => {
      if (
        tagsListRef.current &&
        !tagsListRef.current.contains(event.target as Node)
      ) {
        setIsTagsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutsideTagsList)

    const fetchPostTags = async () => {
      try {
        const tags: Tag[] = await getAvailableTags()

        setAvailableTags(tags)
      } catch (error) {
        console.error('Error fetching post tags:', error)
      } finally {
        setIsLoadingTags(false)
      }
    }

    fetchPostTags()

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideTagsList)
    }
  }, [])

  console.log('errors: ', { errors })

  const featuredImageName = watch('featuredImageName')

  const handleTitleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setTitleInput(value)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEmojiSelect = (emoji: any) => {
    // Appends the selected emoji to the title
    setTitleInput(titleInput + emoji.emoji)
    setShowEmojiPicker(false)
  }

  const filterTags = debounce((value) => {
    const filtered = availableTags.filter((tag) =>
      tag.name.toLowerCase().includes(value.toLowerCase())
    )
    setFilteredTags(filtered)
  }, 300)

  const truncateFileName = (name: string, maxLength: number) => {
    if (name.length <= maxLength) {
      return name
    }
    return name.substring(0, maxLength - 3) + '...'
  }

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    setTagInput(value)
    filterTags(value)

    const filteredTags = availableTags.filter((t: any) =>
      t.name.toLowerCase().includes(tagInput.toLowerCase())
    )
    setFilteredTags(filteredTags)
  }

  const handleAddTag = (tag: string) => {
    if (tag && !selectedTags.includes(tag)) {
      const updatedTags = [...selectedTags, tag]
      setSelectedTags(updatedTags)
      setValue('tags', updatedTags)
    }
    setTagInput('')
    setFilteredTags(availableTags)
    setIsTagsDropdownOpen(false)
    trigger('tags')
  }

  const handleClickAddTag = (tag: string) => {
    tag = tag.trim()
    handleAddTag(tag)
    inputRef.current?.focus()
  }

  const handleEnterAddTag: React.KeyboardEventHandler<HTMLInputElement> = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter') {
      let tag = tagInput.trim()
      handleAddTag(tag)
    }
  }

  const handleRemoveTag = (tag: string) => {
    let updatedTags = selectedTags.filter((t) => t !== tag)
    setSelectedTags(updatedTags)
    setValue('tags', updatedTags)
    trigger('tags')
  }

  const tagInputClasses = clsx(
    'placeholder:text-slate-400 block w-full p-2 shadow-sm sm:text-sm rounded-lg focus:outline-none border bg-white',
    {
      'focus:ring-1 border-red-500 focus:border-red-500 focus:ring-red-500':
        errors.tags,
      'border-slate-300 focus:ring-0 focus:border-[#242424]': !errors.tags
    }
  )

  const featuredImageInputClasses = clsx(
    'flex flex-row cursor-pointer p-2 focus:ring-1 sm:text-sm rounded-lg bg-white border',
    {
      'border-red-500 focus:outline-none focus:border-red-500 focus:ring-red-500':
        errors.featuredImage,
      'border-slate-300 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500':
        !errors.featuredImage
    }
  )

  return (
    <div className="flex flex-col gap-4 text-left">
      <ButtonInput
        title="Title"
        type="text"
        placeholder="Title"
        className="flex flex-col gap-2 col-span-2 relative"
        id="title"
        name="title"
        value={titleInput}
        onChange={handleTitleInputChange}
        register={register}
        error={errors.title}
        button={
          <>
            <button
              type="button"
              className="absolute right-0 bottom-0 mr-2 mb-2"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <span role="img" aria-label="emoji-picker-icon">
                😀
              </span>
            </button>

            {showEmojiPicker && (
              <div className="absolute right-5 top-0 mr-2 mb-2 z-10">
                <EmojiPicker
                  onEmojiClick={(emoji: EmojiClickData) => {
                    handleEmojiSelect(emoji)
                    setShowEmojiPicker(false) // Hide the Emoji Picker after selection
                  }}
                />
              </div>
            )}
          </>
        }
        isDisabled={isSubmitting}
      />

      <div className="grid grid-cols-3 gap-4 md:pb-0 pb-4">
        <div className="flex flex-col gap-2 md:col-span-1">
          <div className="flex flex-row items-start">
            <p>Featured Image &nbsp;</p>
          </div>
          <div className="relative">
            <label
              htmlFor="featuredImage"
              className={featuredImageInputClasses}
            >
              <div
                className=" overflow-hidden text-slate-400 whitespace-nowrap"
                id={'featuredOriginalName'}
              >
                {truncateFileName(featuredImageName, 40)}
              </div>
              <div className="flex-grow"></div>
              <div className=" text-gray-500 flex flex-row items-end">
                <img
                  src="/upload.svg"
                  className="h-[20px] flex"
                  alt="upload-icon"
                />
              </div>
            </label>
            <Controller
              name="featuredImage"
              control={control} // This is where the error occurs if control is null
              rules={validationRules['featuredImage']}
              render={({ field }) => (
                <input
                  type="file"
                  id="featuredImage"
                  name="featuredImage"
                  accept="image/jpg, image/png, image/jpeg"
                  className="absolute inset-0 w-full h-full cursor-pointer hidden"
                  // onChange={handleFeaturedImageUpload}
                  onChange={(e) => {
                    console.log('deo hieu')

                    const file = e.target.files?.[0]
                    if (file) {
                      if (
                        file.type === 'image/png' ||
                        file.type === 'image/jpeg' ||
                        file.type === 'image/jpg'
                      ) {
                        field.onChange(file) // Update the field value
                        setValue('featuredImageName', file.name) // Set the file name
                        trigger('featuredImage')
                      } else {
                        alert('Please upload a .png or .jpeg file.')
                        e.target.value = '' // Reset the input
                      }
                    }
                  }}
                />
              )}
            />
          </div>
          {errors.featuredImage && (
            <p className="text-red-500 text-[0.7rem] leading-3">
              {errors.featuredImage.message}
            </p>
          )}
        </div>

        <div className=" flex flex-col gap-2 md:col-span-2">
          {isLoadingTags ? (
            <div className="flex flex-col gap-2 items-center">
              <Loading />
            </div>
          ) : availableTags.length ? (
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-start">
                <p>Tags&nbsp;</p>
              </div>
              <div ref={tagsListRef} className="relative">
                <Controller
                  name="tags"
                  control={control} // This is where the error occurs if control is null
                  rules={validationRules['tags']}
                  render={() => (
                    <input
                      type="text"
                      id="tags"
                      name="tags"
                      value={tagInput}
                      className={tagInputClasses}
                      onChange={handleTagInputChange}
                      onFocus={(e) => setIsTagsDropdownOpen(true)}
                      onKeyDown={handleEnterAddTag}
                      placeholder="Tags"
                    />
                  )}
                />
                <div className="mt-[20px] z-0">
                  {selectedTags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-[13px] m-2 px-4 py-2 bg-[#ececec] rounded-3xl inline-block"
                    >
                      {tag}
                      <span
                        onClick={() => handleRemoveTag(tag)}
                        className="text-[13px] ml-2 cursor-pointer"
                      >
                        x
                      </span>
                    </span>
                  ))}
                </div>
                {errors.tags && (
                  <p className="text-red-500 text-[0.7rem] leading-3">
                    {errors.tags.message}
                  </p>
                )}
                {isTagsDropdownOpen && (
                  <div className="absolute overflow-y-auto z-30 bg-white w-full max-h-[220px] pt-[10px] pb-[10px] text-[13px] shadow-xl top-[40px]">
                    <ul>
                      {filteredTags.length === 0 && tagInput === '' ? (
                        availableTags.slice(0, 20).map((tag: Tag) => (
                          <li
                            key={tag.id}
                            onClick={() => handleClickAddTag(tag.name)}
                            className="pt-[4px] pb-[4px] pl-[20px] pr-[12px] hover:bg-[#ececec] cursor-pointer"
                          >
                            <div>#{tag.name}</div>
                            <div className="text-[11px]">
                              {tag.usageCount} posts
                            </div>
                          </li>
                        ))
                      ) : filteredTags.length === 0 ? (
                        <li className="pt-[4px] pb-[4px] pl-[20px] pr-[12px]">
                          <div className="text-center">
                            Enter to add that new tag
                          </div>
                        </li>
                      ) : (
                        filteredTags.map((tag: any) => (
                          <li
                            key={tag.id}
                            onClick={() => handleClickAddTag(tag.name)}
                            className="pt-[4px] pb-[4px] pl-[20px] pr-[12px] hover:bg-[#ececec] cursor-pointer"
                          >
                            <div>#{tag.name}</div>
                            <div className="text-[11px]">
                              {tag.usageCount} posts
                            </div>
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2 items-center">
              {/* An error has occurred: {availableTags.error.message} */}
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-4">
        <div className="col-span-3 md:col-span-2 gap-4">
          <div className="flex flex-col gap-2 items-start">
            <div className="">
              <p>Content&nbsp;</p>
            </div>
            <div
              className={`w-full quill-wrapper ${
                errors.content ? 'has-error' : ''
              }`}
            >
              <Controller
                name="content"
                control={control}
                rules={validationRules['content']}
                render={({ field }) => (
                  <RichTextEditor
                    value={field.value}
                    className="h-full border-red-600"
                    onChange={(content) => field.onChange(content)}
                    onBlur={field.onBlur}
                  />
                )}
              />
              {errors.content && (
                <p className="text-red-500 text-[0.7rem] leading-3">
                  {errors.content.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostFormContent
