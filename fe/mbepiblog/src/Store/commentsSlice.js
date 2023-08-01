import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";



const initialState = {
    comments: [],
    status: 'idle'
}

const commentsSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getCommentsByPostId.fulfilled, (state, action) => {
            state.comments = action.payload
        })

        .addCase(postNewComment.fulfilled, (state, action) => {
            state.status = 'idle'
        })

        .addCase(deleteComment.fulfilled, (state, action) => {
            state.status = 'idle'
        })
    }
})

export default commentsSlice.reducer

export const getCommentById = createAsyncThunk('commentById/get', async (ids) => {
    console.log(ids)
    const res = await fetch(`http://localhost:6060/blogPosts/${ids.post}/comments/${ids.comment}`, {})
    const data = await res.json()
    return data
})

export const getCommentsByPostId = createAsyncThunk('commentsByPostId/get', async (id) => {
    const res = await fetch(`http://localhost:6060/blogPosts/${id}/comments`, {})
    const data = await res.json()
    return data
})

export const postNewComment = createAsyncThunk('comment/post', async(datas) => {
    console.log(datas)
    const postRes = await fetch(`http://localhost:6060/blogPosts/${datas.id.id}/newComment`, {
        method: "POST",
        body: JSON.stringify(datas.payload),
        headers: {
            "Content-Type": "application/json"
        }
    });
    const res = await postRes.json()
    return res
})

export const deleteComment = createAsyncThunk('comment/delete', async(comment) => {
    console.log(comment)
    const del = await fetch(`http://localhost:6060/blogPosts/${comment.postId}/deleteComment/${comment.comment._id}`, {
        method: "DELETE"
    });
    const res = await del.json()
    return res
})