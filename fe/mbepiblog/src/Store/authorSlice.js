import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { useSession } from "../middlewares/ProtectedRoutes";

const endpoint = 'http://localhost:6060/authors'

const initialState = {
    authors: [],
    status: 'idle',
    registerStatus: {},
    singleAuthor : {}
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
        })
        .addCase(getAuthors.rejected, (state, action) =>{
            state.status = 'error'
        })
        .addCase(postAuthors.fulfilled, (state, action) => {
            state.registerStatus = action.payload
            console.log(action)
        })
        
        .addCase(getAuthorById.fulfilled, (state, action) => {
            state.singleAuthor = action.payload
            state.status = 'idle'
        })
    }
})

export default authorSlice.reducer;


export const getAuthors = createAsyncThunk('authors/get', async() => {
    const token = JSON.parse(localStorage.getItem('userLoggedIn'))
    const data = await fetch(endpoint, {
        headers: {
            Authorization: token
        }
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


export const deleteAuthor = createAsyncThunk('authors/delete', async(id) => {
    const token = JSON.parse(localStorage.getItem('userLoggedIn'))
    const delRes = await fetch(`${endpoint}/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: token
        }
    })
})

export const getAuthorById = createAsyncThunk('authorById/get', async(id) => {
    const token = JSON.parse(localStorage.getItem('userLoggedIn'))
    const res = await fetch(`${endpoint}/${id}`, {
        headers: {
            Authorization: token
        }
    })
    const data = await res.json()
    return data;
})