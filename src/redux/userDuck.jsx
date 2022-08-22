/* eslint-disable no-unused-vars */
import { getAuth, signInWithCustomToken, signInWithPopup, signOut } from 'firebase/auth'
import { auth, provider } from 'src/firebase/config'
import axios from 'axios'
import { useEffect } from 'react'
import { useFetch } from 'src/Hooks/useFetch'
import { Loading } from 'src/component/Loading/Loading'

// Initial Data
const initialState = {
  loading: false,
  isSignedIn: false,
  userData: null,
  searchInput: 'tech',
  blogData: null
}

// Types
const LOADING = 'LOADING'
const USER_ERROR = 'USER_ERROR'
const USER_REGISTER = 'USER_REGISTER'
const USER_OUT = 'USER_OUT'
const SEARCH_INPUT = 'SEARCH_INPUT'
const BLOG_DATA = 'BLOG_DATA'

// Reducer
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_INPUT:
      return { ...state, searchInput: action.payload.searchInput, blogData: action.payload.blog }
    case BLOG_DATA:
      return { ...state, blogData: action.payload }
    case LOADING:
      return { ...state, loading: true }
    case USER_ERROR:
      return { ...initialState }
    case USER_REGISTER:
      return { ...state, loading: false, userData: action.payload, isSignedIn: true }
    case USER_OUT:
      return { ...initialState }
    default:
      return { ...state }
  }
}

// Actions. Actions are going to be import to the Component/Page I need to call the action and call it with dispatch
export const registerUserAction = () => async (dispatch) => {
  // Creating this dispatch in case the user is already registered or no
  dispatch({ type: LOADING })
  try {
    const res = await signInWithPopup(auth, provider)
    dispatch({
      type: USER_REGISTER,
      payload: {
        uid: res.user.uid,
        email: res.user.email,
        name: res.user.displayName,
        picture: res.user.photoURL
      }
    })
    localStorage.setItem(
      'user',
      JSON.stringify({
        uid: res.user.uid,
        email: res.user.email,
        name: res.user.displayName,
        picture: res.user.photoURL
      })
    )
  } catch (err) {
    console.log(err)
    // Dispatch in case of any error happens
    dispatch({ type: USER_ERROR })
  }
}

export const readUserActiveAction = () => (dispatch) => {
  if (localStorage.getItem('user')) {
    dispatch({
      type: USER_REGISTER,
      payload: JSON.parse(localStorage.getItem('user'))
    })
  }
}

export const signOutAction = () => (dispatch) => {
  signOut(auth)
  localStorage.removeItem('user')
  dispatch({ type: USER_OUT })
}

export const searchInputUser = (action) => async (dispatch) => {
  try {
    const blog_url = `https://gnews.io/api/v4/search?q=${action}&token=5b690c9a6983114519ab5e366c864743&lang=en`
    const response = await axios.get(blog_url)

    dispatch({ type: SEARCH_INPUT, payload: { blog: response.data, searchInput: action } })
  } catch (error) {
    console.log(error)
  }
}
export const blogData = () => async (dispatch, getState) => {
  try {
    const { searchInput } = getState().user
    const blog_url = `https://gnews.io/api/v4/search?q=${searchInput}&token=5b690c9a6983114519ab5e366c864743&lang=en`

    const response = await axios.get(blog_url)
    console.log(response)
    dispatch({ type: BLOG_DATA, payload: response.data })
  } catch (error) {
    console.log(error)
  }
}
