import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";

const endpoint = 'http://localhost:6060/users'

const initialState = {
    users: [],
    status: 'idle'
}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getUsers.fulfilled, (state, action) =>{
            state.users = action.payload;
            state.status = 'idle'
        })
        .addCase(getUsers.pending, (state, action) =>{
            state.status = 'pending'
            console.log(action)
        })
        .addCase(getUsers.rejected, (state, action) =>{
            state.status = 'error'
        })
    }
})

export default userSlice.reducer;


export const getUsers = createAsyncThunk('users/get', async() => {
    const data = await fetch(endpoint, {
        
    });
    const res = await data.json()
    return res;
})



export const postUser = createAsyncThunk('users/post', async(postPayload) => {
    const postRes = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(postPayload),
        headers: {
            "Content-Type": "application/json"
        }
    });
    const res = await postRes.json()
})