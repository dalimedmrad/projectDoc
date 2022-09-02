import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getEvidances = createAsyncThunk("allEvidances", async () => {
  try {
    const { data } = await axios.get("http://localhost:5000/api/evidance");
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
});
// export const PostDoc = createAsyncThunk("postDoc", async (doc) => {
//   console.log(doc);
//   let opts = {
//     headers: {
//       Authorization: "Token e8f05680d9120729507e640c7958bdac50eec31a",
//       Accept: "application/json",
//     },
//   };
//   try {
//     const result = await axios.post(
//       "http://152.228.211.15:8000/api/attachment/create/",
//       { opts, doc }
//     );
//     console.log(result);
//     return result;
//   } catch (error) {
//     console.log(error);
//   }
// });
// export const PostDoc1 = createAsyncThunk("postDoc", async (doc) => {
//   // console.log(doc);
//   // let opts = {
//   //   headers: {
//   //     Authorization: "Token e8f05680d9120729507e640c7958bdac50eec31a",
//   //     Accept: "application/json",
//   //   },
//   // };
//   try {
//     const result = await axios.post(
//       "http://localhost:8080/api/multipleFiles",
//       doc
//     );
//     console.log(result);
//     return result;
//   } catch (error) {
//     console.log(error);
//   }
// });

const initialState = {
  document: null,
  allEvidances: null,
  status: null,
};

export const EvidanceSlice = createSlice({
  name: "Evidance",
  initialState,
  reducers: {},
  extraReducers: {
    [getEvidances.pending]: (state) => {
      state.status = "pending";
    },
    [getEvidances.fulfilled]: (state, action) => {
      state.status = "success";
      state.allEvidances = action.payload.response;
    },
    [getEvidances.rejected]: (state) => {
      state.status = "failed";
    },
  },
});

export default EvidanceSlice.reducer;
