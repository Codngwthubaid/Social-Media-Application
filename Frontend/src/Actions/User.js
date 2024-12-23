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


// Load User Function
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: 'loadUserRequest' })
        const { data } = await axios.get("/api/v1/me")
        dispatch({ type: 'loadUserSuccess', payload: data.user , isAuthenticate: true })
    } catch (error) {
        dispatch({ type: 'loadUserFailure', payload: error.response.data.message , isAuthenticate: false })
    }
}