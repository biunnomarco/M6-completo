import { configureStore } from "@reduxjs/toolkit";
import authorSlice from "./authorSlice";

const store = configureStore({
    reducer: {
        authors: authorSlice
    }
})

export default store;