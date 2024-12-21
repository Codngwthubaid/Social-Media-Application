import axios from 'axios'

export const login = (email, password) => async (dispatch) => {

    try {
        dispatch({ type: 'loginRequest' })
        const { data } = await axios.post("/api/v1/login", { email, password }, { headers: { 'Content-Type': 'application/json' } })
        dispatch({ type: 'loginSuccess', payload: data.user })
    } catch (error) {
        dispatch({ type: 'loginFailure', payload: error.response.data.message })
    }
}