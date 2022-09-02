import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getEvidancesType = createAsyncThunk(
  "allEvidanceType",
  async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/evidancetype"
      );
      // console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  allEvidancesType: null,
  status: null,
};

export const EvidanceTypeSlice = createSlice({
  name: "EvidanceType",
  initialState,
  reducers: {},
  extraReducers: {
    [getEvidancesType.pending]: (state) => {
      state.status = "pending";
    },
    [getEvidancesType.fulfilled]: (state, action) => {
      state.status = "success";
      state.allEvidancesType = action.payload.response;
    },
    [getEvidancesType.rejected]: (state) => {
      state.status = "failed";
    },
  },
});

export default EvidanceTypeSlice.reducer;
