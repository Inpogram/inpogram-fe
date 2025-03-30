import React, { useState, useEffect } from 'react'
import Loading from '../../ui/Loading'
import Autocomplete from 'react-google-autocomplete'
import { CommonSelect } from '../../ui/select/CommonSelect'
import TextInput from '../../ui/input/TextInput'
import EmojiPicker from 'emoji-picker-react'
import CommonOption from '../../ui/select/option/CommonOption'
import { useAppDispatch, useAppSelector } from '../../../hooks/index'
import { editPostSelector } from '../../../redux/selectors'
import editPostSlice, {
  getPostFormatsThunk,
  getPostTypesThunk
} from '../../../redux/reducers/editPostSlice'
import ButtonInput from '../../ui/input/ButtonInput'
import usePostValidation from '../../../hooks/usePostValidation'
const EditPostInformation = () => {
  const dispatch = useAppDispatch()
  const {
    type,
    format,
    title,
    description,
    tags,
    bannerOriginalName,
    activityTypes,
    activityFormats,
    numParticipants,
    tagsErrorMessage,
    titleErrorMessage,
    descriptionErrorMessage,
    bannerErrorMessage,
    numParticipantsErrorMessage,
    isUpdateClicked,
    isStartDateTimeDisabled
  } = useAppSelector(editPostSelector)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const {
    validateBanner,
    validateTitle,
    validateNumParticipants,
    validateTags,
    validateDescription
  } = usePostValidation()
  useEffect(() => {
    dispatch(getPostFormatsThunk())
    dispatch(getPostTypesThunk())
  }, [])
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    dispatch(editPostSlice.actions.changeType(value))
  }

  const handleFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    dispatch(editPostSlice.actions.changeFormat(value))
  }
  const handleNumParticipantsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value

    dispatch(editPostSlice.actions.changeNumParticipants(value))
    validateNumParticipants(
      value,
      editPostSlice.actions.changeNumParticipantsErrorMessage
    )
  }

  const handleBannerFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      dispatch(editPostSlice.actions.changeBannerOriginalName(file.name))
      validateBanner(file, editPostSlice.actions.changeBannerErrorMessage)
    }
  }

  const truncateFileName = (name: string, maxLength: number) => {
    if (name.length <= maxLength) {
      return name
    }
    return name.substring(0, maxLength - 3) + '...'
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value
    dispatch(editPostSlice.actions.changeTitle(newTitle))
    validateTitle(newTitle, editPostSlice.actions.changeTitleErrorMessage)
  }

  const handleTagsChange = (event: React.FormEvent<HTMLInputElement>) => {
    const tags = event.currentTarget.value
    dispatch(editPostSlice.actions.changeTags(tags))
    validateTags(tags, editPostSlice.actions.changeTagsErrorMessage)
  }

  const handleDescriptionChange = (description: string) => {
    dispatch(editPostSlice.actions.changeDescription(description))
    validateDescription(
      description,
      editPostSlice.actions.changeDescriptionErrorMessage
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEmojiSelect = (emoji: any) => {
    // Appends the selected emoji to the title
    dispatch(editPostSlice.actions.changeTitle(title + emoji.emoji))
  }

  return (
    <div className="text-left">
      <div className="flex items-center flex-row  gap-4 pb-4">
        <img src="/i-ngan.png" className="h-6 w-6 " alt="info-icon" />
        <p className="flex flex-row items-start font-bold">Post Information</p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-3 md:col-span-2 gap-4">
          <div className="grid grid-cols-3 gap-4 md:pb-0 pb-4">
            <div className="flex flex-col gap-2 md:pb-4 md:col-span-1 col-span-3">
              <div className="flex flex-row items-start">
                <p>
                  Post Banner&nbsp;<span className="text-red-500">*</span>
                </p>
              </div>
              <div className="relative">
                <label
                  htmlFor="actBanner"
                  className={`flex flex-row border p-2 focus:ring-1 sm:text-sm rounded ${
                    isStartDateTimeDisabled
                      ? 'pointer-events-none bg-[#F3F4F6] border-[#9095A0] opacity-[0.4]'
                      : bannerErrorMessage && isUpdateClicked
                      ? 'bg-white border-red-500 focus:outline-none focus:border-red-500 focus:ring-red-500'
                      : 'bg-white border-slate-300 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 cursor-pointer'
                  }`}
                >
                  <div
                    className=" overflow-hidden text-slate-400 whitespace-nowrap"
                    id={'bannerOriginalName'}
                  >
                    {truncateFileName(bannerOriginalName, 25)}
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
                <input
                  type="file"
                  id="actBanner"
                  name="actBanner"
                  accept="image/jpg, image/png, image/jpeg, image/gif"
                  className="absolute inset-0 w-full h-full cursor-pointer hidden"
                  onChange={handleBannerFileUpload}
                />
              </div>
              {bannerErrorMessage && (
                <p className="text-red-500 text-[0.7rem] leading-3">
                  {bannerErrorMessage}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2 md:col-span-2 col-span-3">
              <ButtonInput
                title="Post Title"
                type="text"
                placeholder="Post Title"
                className="flex flex-col gap-2 col-span-2 relative"
                id="actTitle"
                name="actTitle"
                value={title}
                onChange={handleTitleChange}
                button={
                  <>
                    <button
                      type="button"
                      className="absolute right-0 bottom-0 mr-2 mb-2"
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      disabled={isStartDateTimeDisabled}
                    >
                      <span role="img" aria-label="emoji-picker-icon">
                        😀
                      </span>
                    </button>

                    {showEmojiPicker && (
                      <div className="absolute right-5 top-0 mr-2 mb-2 z-10">
                        <EmojiPicker
                          onEmojiClick={(emoji) => {
                            handleEmojiSelect(emoji)
                            setShowEmojiPicker(false) // Hide the Emoji Picker after selection
                          }}
                        />
                      </div>
                    )}
                  </>
                }
                errorMessage={titleErrorMessage}
                isDisabled={isStartDateTimeDisabled}
                isCreateClicked={isUpdateClicked}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 items-start">
            <div className="">
              <p>
                Post Description&nbsp;
                <span className="text-red-500">*</span>
              </p>
            </div>
            <div>
              <div
                className={` ${
                  descriptionErrorMessage &&
                  isUpdateClicked &&
                  'bg-white rounded-[0.6rem] border border-red-500 focus:outline-none focus:ring-1 focus:border-red-500 focus:ring-red-500'
                }`}
              ></div>
              {descriptionErrorMessage && (
                <p className="text-red-500 text-[0.7rem] leading-3">
                  {descriptionErrorMessage}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="col-span-3 md:col-span-1">
          <div className="flex flex-col justify-between gap-4 h-full">
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-start">
                <p>
                  Tags&nbsp;
                  <span className="text-red-500">*</span>
                </p>
              </div>
              <Autocomplete<React.AllHTMLAttributes<HTMLInputElement>>
                apiKey={'AIzaSyD_9tswuJLKHpB3QVPxXrZhld-mFNsoUtY'}
                className={`placeholder:text-slate-400 block w-full border p-2 shadow-sm sm:text-sm rounded ${
                  isStartDateTimeDisabled
                    ? 'pointer-events-none bg-[#F3F4F6] border-[#9095A0] opacity-[0.4]'
                    : tagsErrorMessage && isUpdateClicked
                    ? 'bg-white border-red-500 focus:outline-none focus:ring-1 focus:border-red-500 focus:ring-red-500'
                    : 'bg-white border-slate-300 shadow-sm focus:outline-none focus:ring-1 focus:border-sky-500 focus:ring-sky-500'
                }`}
                value={tags}
                onChange={handleTagsChange}
                options={{
                  types: ['address'],
                  componentRestrictions: { country: 'vn' }
                }}
                id={'actLoc'}
                placeholder="Tags"
              />
              {tagsErrorMessage && (
                <p className="text-red-500 text-[0.7rem] leading-3">
                  {tagsErrorMessage}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <TextInput
                title="Number of Participants"
                placeholder="Add a number"
                id="actNumPart"
                name="actNumPart"
                value={numParticipants}
                isRequired
                errorMessage={numParticipantsErrorMessage}
                isDisabled={isStartDateTimeDisabled}
                isCreateClicked={isUpdateClicked}
                onChange={handleNumParticipantsChange}
              />
            </div>

            {activityTypes.loading ? (
              <div className="flex justify-center items-center row-span-2">
                <Loading />
              </div>
            ) : activityTypes.data ? (
              <div className="flex flex-col gap-2">
                <div className="flex flex-row items-start">
                  <p>Post Type</p>
                </div>
                <CommonSelect
                  defaultValue={type}
                  onChange={handleTypeChange}
                  className={`rounded border sm:text-sm shadow-sm w-full ${
                    isStartDateTimeDisabled
                      ? 'pointer-events-none bg-[#F3F4F6] border-[#9095A0] opacity-[0.4]'
                      : 'cursor-pointer bg-white border-slate-300 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1'
                  }`}
                  id="types"
                  name="types"
                >
                  {type == '' && (
                    <CommonOption value="" hidden>
                      Select One
                    </CommonOption>
                  )}
                  {activityTypes.data.map(
                    (item: { name: string; id: string }) => {
                      return (
                        <CommonOption key={item.id} value={item.name}>
                          {item.name}
                        </CommonOption>
                      )
                    }
                  )}
                </CommonSelect>
              </div>
            ) : (
              <div className="flex justify-center items-center row-span-2">
                An error has occurred: {activityTypes.error.message}
              </div>
            )}
            {activityFormats.loading ? (
              <div className="flex justify-center items-center row-span-2">
                <Loading />
              </div>
            ) : activityFormats.data ? (
              <div className="flex flex-col gap-2">
                <div className="flex flex-row items-start">
                  <p>Post Format</p>
                </div>
                <CommonSelect
                  defaultValue={format}
                  onChange={handleFormatChange}
                  className={`rounded border sm:text-sm shadow-sm w-full ${
                    isStartDateTimeDisabled
                      ? 'pointer-events-none bg-[#F3F4F6] border-[#9095A0] opacity-[0.4]'
                      : 'cursor-pointer bg-white border-slate-300 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1'
                  }`}
                  id="formats"
                  name="formats"
                >
                  {format == '' && (
                    <CommonOption value="" hidden>
                      Select One
                    </CommonOption>
                  )}
                  {activityFormats.data.map(
                    (item: { name: string; id: string }) => {
                      return (
                        <CommonOption key={item.id} value={item.name}>
                          {item.name}
                        </CommonOption>
                      )
                    }
                  )}
                </CommonSelect>
              </div>
            ) : (
              <div className="flex justify-center items-center row-span-2">
                An error has occurred: {activityFormats.error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditPostInformation
