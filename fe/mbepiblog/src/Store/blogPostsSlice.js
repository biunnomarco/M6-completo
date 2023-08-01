import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";

const endpoint = 'http://localhost:6060/blogPosts/'
const endpointInternal = 'http://localhost:6060/blogPosts/internalUpload'

const initialState = {
    posts: [],
    status: 'idle',
    singlePost: {}
}

const blogPostsSlice = createSlice({
    name: 'blogPosts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getBlogPosts.fulfilled, (state, action) => {
            state.posts = action.payload.blogPosts
            state.status = 'idle'
        })
        .addCase(getBlogPosts.pending, (state, action) => {
            state.status = 'pending'
        })
        .addCase(getBlogPosts.rejected, (state, action) => {
            state.status = 'error'
        })


        .addCase(postBlogPosts.fulfilled, (state, action) => {
            state.status = 'idle'
        })

        .addCase(blogPostById.fulfilled, (state, action) => {
            state.singlePost = action.payload
            state.status = 'idle'
        })
        .addCase(blogPostById.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(blogPostById.rejected, (state, action) => {
            state.status = 'error'
        })
    }
})

export default blogPostsSlice.reducer

export const getBlogPosts = createAsyncThunk('blogPosts/get', async() => {
    const getRes = await fetch(endpoint, {})
    const res = await getRes.json()
    return res
})


export const postBlogPosts = createAsyncThunk('blogPosts/post', async(postPayload) => {
    const data = new FormData();
    data.append('category', postPayload.category)
    data.append('title', postPayload.title)
    data.append('cover', postPayload.cover)
    data.append('readTimeValue', postPayload.readTime.value)
    data.append('readTimeUnit', postPayload.readTime.unit)
    data.append('author', postPayload.author)
    data.append('content', postPayload.content)
    
    const postRes = await fetch(endpointInternal, {
        method: "POST",
        body: data,
        headers: {
            /* "Content-Type" : "multipart/form-data" */
        }
    });
    const res = await postRes.json();
})

export const blogPostById = createAsyncThunk('blogPosts/getById', async(id) => {
    const res = await fetch((endpoint + id), {})
    const data = await res.json()
    return data
})