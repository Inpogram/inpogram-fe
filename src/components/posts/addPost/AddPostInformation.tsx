import React, { useEffect, useRef, useState } from 'react'
import 'react-quill/dist/quill.snow.css'
import Loading from '../../ui/Loading'
import EmojiPicker from 'emoji-picker-react'
import ButtonInput from '../../ui/input/ButtonInput'
import { useAppDispatch, useAppSelector } from '../../../hooks/index'
import { addPostSelector } from '../../../redux/selectors'
import addPostSlice, {
  getPostTagsThunk
} from '../../../redux/reducers/addPostSlice'
import usePostValidation from '../../../hooks/usePostValidation'
import CommonInput from '../../ui/input/CommonInput'
import RichTextEditor from '../../ui/editor/RichTextEditor'

const AddPostInformation = () => {
  const dispatch = useAppDispatch()
  const {
    title,
    content,
    postTags,
    tags,
    bannerOriginalName,
    titleErrorMessage,
    contentErrorMessage,
    bannerErrorMessage,
    tagsErrorMessage,
    isCreateClicked
  } = useAppSelector(addPostSelector)

  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [showTagsList, setShowTagsList] = useState(false)
  const [searchKey, setSearchKey] = useState('')
  const [searchResult, setSearchResult] = useState([])

  const tagsListRef = useRef<HTMLDivElement>(null)

  const { validateBanner, validateTitle, validateContent } = usePostValidation()

  useEffect(() => {
    const handleClickOutsideTagsList = (event: MouseEvent) => {
      if (
        tagsListRef.current &&
        !tagsListRef.current.contains(event.target as Node)
      ) {
        setShowTagsList(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutsideTagsList)

    dispatch(getPostTagsThunk())
  }, [])

  const handleBannerFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      dispatch(addPostSlice.actions.changeBannerOriginalName(file.name))
      validateBanner(file, addPostSlice.actions.changeBannerErrorMessage)
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
    dispatch(addPostSlice.actions.changeTitle(newTitle))
    validateTitle(newTitle, addPostSlice.actions.changeTitleErrorMessage)
  }

  const handleChangeSearchKey = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const searchKey = event.currentTarget.value
    const filteredTags = postTags.data.filter((t: any) =>
      t.name.toLowerCase().includes(searchKey.toLowerCase())
    )
    setSearchKey(searchKey)
    setSearchResult(filteredTags)
  }

  const handleFocusTagsInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowTagsList(true)
  }

  const handleClickAddTag: React.MouseEventHandler<HTMLLIElement> = (
    tagToAdd: any
  ) => {
    if (!tags.includes(tagToAdd)) {
      dispatch(addPostSlice.actions.changeTags([...tags, tagToAdd]))
    }
    setShowTagsList(false)
    setSearchKey('')
    setSearchResult([])
  }

  const handleEnterAddTag: React.KeyboardEventHandler<HTMLInputElement> = (
    event: any
  ) => {
    const inputVal = event.target.value
    if (event.key === 'Enter' && inputVal.length) {
      // Perform the action (e.g., add the value)
      dispatch(addPostSlice.actions.changeTags([...tags, inputVal]))
      setSearchKey('')
      setSearchResult(postTags.data)
    }
  }

  const removeTag = (tagToRemove: any) => {
    dispatch(
      addPostSlice.actions.changeTags(tags.filter((tag) => tag !== tagToRemove))
    )
  }

  const handleContentChange = (content: string) => {
    dispatch(addPostSlice.actions.changeContent(content))
    validateContent(content, addPostSlice.actions.changeContentErrorMessage)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEmojiSelect = (emoji: any) => {
    // Appends the selected emoji to the title
    dispatch(addPostSlice.actions.changeTitle(title + emoji.emoji))
  }

  return (
    <div className="flex flex-col gap-4 text-left">
      <ButtonInput
        title="Title"
        type="text"
        placeholder="Title"
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
        isCreateClicked={isCreateClicked}
        errorMessage={titleErrorMessage}
      />

      <div className="grid grid-cols-3 gap-4 md:pb-0 pb-4">
        <div className="flex flex-col gap-2 md:col-span-1">
          <div className="flex flex-row items-start">
            <p>Banner Image &nbsp;</p>
          </div>
          <div className="relative">
            <label
              htmlFor="actBanner"
              className={`flex flex-row  
                                cursor-pointer p-2 focus:ring-1 sm:text-sm
                                rounded-lg bg-white border ${
                                  bannerErrorMessage && isCreateClicked
                                    ? 'border-red-500 focus:outline-none focus:border-red-500 focus:ring-red-500'
                                    : 'border-slate-300 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500'
                                } 
                                `}
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

        <div className=" flex flex-col gap-2 md:col-span-2">
          {postTags.loading ? (
            <div className="flex flex-col gap-2 items-center">
              <Loading />
            </div>
          ) : postTags.data.length ? (
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-start">
                <p>Tags&nbsp;</p>
              </div>
              <div ref={tagsListRef} className="relative">
                <CommonInput
                  type="text"
                  value={searchKey}
                  className={`placeholder:text-slate-400 block w-full p-2 shadow-sm sm:text-sm rounded-lg focus:outline-none  border bg-white ${
                    tagsErrorMessage && isCreateClicked
                      ? 'focus:ring-1 border-red-500 focus:border-red-500 focus:ring-red-500'
                      : 'border-slate-300 focus:ring-0 focus:border-[#242424]'
                  }`}
                  onChange={handleChangeSearchKey}
                  onFocus={handleFocusTagsInput}
                  onKeyDown={handleEnterAddTag}
                  placeholder="Tags"
                />
                <div className="mt-[20px] z-0">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-[13px] m-2 px-4 py-2 bg-[#ececec] rounded-3xl inline-block"
                    >
                      {tag}
                      <span
                        onClick={() => removeTag(tag)}
                        className="text-[13px] ml-2 cursor-pointer"
                      >
                        x
                      </span>
                    </span>
                  ))}
                </div>
                {tagsErrorMessage && (
                  <p className="text-red-500 text-[0.7rem] leading-3">
                    {tagsErrorMessage}
                  </p>
                )}
                {showTagsList && (
                  <div className="absolute overflow-y-auto z-30 bg-white w-full max-h-[220px] pt-[10px] pb-[10px] text-[13px] shadow-xl top-[40px]">
                    <ul>
                      {searchResult.length === 0 && searchKey === '' ? (
                        postTags.data.slice(0, 20).map((tag: any) => (
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
                      ) : searchResult.length === 0 ? (
                        <li className="pt-[4px] pb-[4px] pl-[20px] pr-[12px]">
                          <div className="text-center">
                            Enter to add that new tag
                          </div>
                        </li>
                      ) : (
                        searchResult.map((tag: any) => (
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
              An error has occurred: {postTags.error.message}
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
            <div className="w-full">
              <div
                className={`${
                  contentErrorMessage &&
                  isCreateClicked &&
                  'bg-white rounded-[0.6rem] border border-red-500 focus:outline-none focus:ring-1 focus:border-red-500 focus:ring-red-500'
                }`}
              >
                <RichTextEditor
                  value={content}
                  onChange={handleContentChange}
                  className="h-full"
                />
              </div>
              {contentErrorMessage && (
                <p className="text-red-500 text-[0.7rem] leading-3">
                  {contentErrorMessage}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddPostInformation
