import axios from 'axios'

// Login Function
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: 'loginRequest' })
        const { data } = await axios.post("/api/v1/login", { email, password }, { headers: { 'Content-Type': 'application/json' } })
        dispatch({ type: 'loginSuccess', payload: data.user })
    } catch (error) {
        dispatch({ type: 'loginFailure', payload: error.response.data.message })
    }
}


// Post Of Followed Users Function
export const postOfFollowedUsers = () => async (dispatch) => {
    try {
        dispatch({ type: 'postOfFollowedUsersRequest' })
        const { data } = await axios.get("/api/v1/posts")
        dispatch({ type: 'postOfFollowedUsersSuccess', payload: data.posts })
    } catch (error) {
        dispatch({ type: 'postOfFollowedUsersFailure', payload: error.response.data.message })
    }
};

// Getting All Users Function
export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({ type: 'allUsersReducerRequest' })
        const { data } = await axios.get("/api/v1/users")
        dispatch({ type: 'allUsersReducerSuccess', payload: data.users })
    } catch (error) {
        dispatch({ type: 'allUsersReducerFailure', payload: error.response.data.message })
    }
};



// Logout Function
export const logoutUser = () => async (dispatch) => {
    try {
        dispatch({ type: 'logoutRequest' })
        await axios.get("/api/v1/logout")
        dispatch({ type: 'logoutSuccess' })
    } catch (error) {
        dispatch({ type: 'logoutFailure', payload: error.response.data.message })
    }
};



// Getting My Post Function
export const myPost = () => async (dispatch) => {
    try {
        dispatch({ type: 'myPostRequest' })
        const { data } = await axios.get("/api/v1/my/posts")
        dispatch({ type: 'myPostSuccess', payload: data.posts })
    } catch (error) {
        dispatch({ type: 'myPostFailure', payload: error.response.data.message })
    }
};



// Load User Function
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: 'loadUserRequest' })
        const { data } = await axios.get("/api/v1/me")
        dispatch({ type: 'loadUserSuccess', payload: data.user, isAuthenticate: true })
    } catch (error) {
        dispatch({ type: 'loadUserFailure', payload: error.response.data.message, isAuthenticate: false })
    }
}
