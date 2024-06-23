// import { configureStore } from "@reduxjs/toolkit"
import videoSlicer from "../slicers/video-slicer"

import { configureStore } from "@reduxjs/toolkit";

export const store= configureStore({
    reducer:{
        video:videoSlicer
    }
})

export type RootState = ReturnType<typeof store.getState>