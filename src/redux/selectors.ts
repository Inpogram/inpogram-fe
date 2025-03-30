export const authSelector = (state: { auth: any }) => state.auth

export const addPostSelector = (state: { addPost: any }) => state.addPost

export const editPostSelector = (state: { editPost: any }) => state.editPost

export const allPostsSelector = (state: { allPosts: any }) => state.allPosts

export const approvePostSelector = (state: { approvePost: any }) =>
  state.approvePost

export const rejectPostSelector = (state: { rejectPost: any }) =>
  state.rejectPost

export const postDetailsSelector = (state: { postDetails: any }) =>
  state.postDetails
