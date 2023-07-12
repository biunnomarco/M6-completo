import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";

const endpoint = 'http://localhost:6060/authors'

const initialState = {
    authors: [],
    status: 'idle'
}

const authorSlice = createSlice({
    name: 'authors',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getAuthors.fulfilled, (state, action) =>{
            state.authors = action.payload.authors;
            state.status = 'idle'
        })
        .addCase(getAuthors.pending, (state, action) =>{
            state.status = 'pending'
            console.log(action)
        })
        .addCase(getAuthors.rejected, (state, action) =>{
            state.status = 'error'
        })
    }
})

export default authorSlice.reducer;


export const getAuthors = createAsyncThunk('authors/get', async() => {
    const data = await fetch(endpoint, {
        
    });
    const res = await data.json()
    return res;
})



export const postAuthors = createAsyncThunk('authors/post', async(postPayload) => {
    const postRes = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(postPayload),
        headers: {
            "Content-Type": "application/json"
        }
    });
    const res = await postRes.json()
})