import { configureStore, createSlice } from "@reduxjs/toolkit"

const initialState={
    videos:[],
}

const videoSlice=createSlice({
    name:"video",
    initialState,
    reducers:{
        addToWatchLater:(state:any,action)=>{
           if(!state.videos.some((vid:any)=>vid.VideoId==action.payload.VideoId)){
                state.videos.push(action.payload);
                alert("Saved to watch later list")
           }else{
            alert("Video already added")
           }
        }
    }
})

export const{addToWatchLater}=videoSlice.actions;
export default videoSlice.reducer


// const videoSlice=createSlice({
//     name:"video",
//     initialState,
//     reducers:{
//         addToWatchLater: (state:any,action)=>{
//             state.videos.push(action.payload);
//             state.videosCount=state.videos.length;
//         }
//     }
// })

// export const {addToWatchLater}=videoSlice.actions;
// export default videoSlice.reducer;