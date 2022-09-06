import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getallDocs = createAsyncThunk("allDocs", async () => {
  try {
    const { data } = await axios.get("http://localhost:5000/api/doc");
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
});
export const PostDoc = createAsyncThunk("postDoc", async (doc, dispatch) => {
  console.log(doc);
  try {
    const { data } = await axios.post("http://localhost:5000/api/doc", doc);
    dispatch(getallDocs());
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
});
// export const UpdateDoc = createAsyncThunk("UpdateDoc", async (doc) => {
//   try {
//     const { data } = await axios.put(
//       `http://localhost:5000/api/doc/${doc._id}`,
//       doc
//     );
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// });
export const DeleteDoc = createAsyncThunk("delDoc", async (id, dispatch) => {
  try {
    const { data } = await axios.delete(`http://localhost:5000/api/doc/${id}`);
    dispatch(getallDocs());
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
});

// export const getOneById = createAsyncThunk("getOneById", async (id) => {
//   try {
//     const { data } = await axios.get(`http://localhost:5000/api/doc/${id}`);
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// });
const initialState = {
  document: null,
  docMSG: null,
  allDocuments: null,
  status: null,
};

export const DocSlice = createSlice({
  name: "Doc",
  initialState,
  reducers: {},
  extraReducers: {
    [PostDoc.pending]: (state) => {
      state.status = "pending";
    },
    [PostDoc.fulfilled]: (state, action) => {
      state.status = "success";
      state.document = action.payload.Doc;
    },
    [PostDoc.rejected]: (state) => {
      state.status = "failed";
    },
    [getallDocs.pending]: (state) => {
      state.status = "pending";
    },
    [getallDocs.fulfilled]: (state, action) => {
      state.status = "success";
      state.allDocuments = action.payload.response;
    },
    [getallDocs.rejected]: (state) => {
      state.status = "failed";
    },
    [DeleteDoc.pending]: (state) => {
      state.status = "pending";
    },
    [DeleteDoc.fulfilled]: (state, action) => {
      state.status = "success";
    },
    [DeleteDoc.rejected]: (state) => {
      state.status = "failed";
    },
    // [UpdateDoc.pending]: (state) => {
    //   state.status = "pending";
    // },
    // [UpdateDoc.fulfilled]: (state, action) => {
    //   state.status = "success";
    //   state.docMSG = action.payload.msg;
    // },
    // [UpdateDoc.rejected]: (state, action) => {
    //   state.status = "failed";
    //   state.docMSG = action.payload.msg;
    // },
    // [getOneById.pending]: (state) => {
    //   state.status = "pending";
    // },
    // [getOneById.fulfilled]: (state, action) => {
    //   state.status = "success";
    //   state.document = action.payload.response;
    // },
    // [getOneById.rejected]: (state, action) => {
    //   state.status = "failed";
    // },
  },
});

export default DocSlice.reducer;
