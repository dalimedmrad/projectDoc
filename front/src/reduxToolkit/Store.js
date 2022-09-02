import { configureStore } from "@reduxjs/toolkit";
import DocSlice from "./docslice/DocSlice";
import EvidanceSlice from "./evidanceslice/EvidanceSlice";
import EvidanceTypeSlice from "./evidancetypeslice/EvidanceTypeSlice";

export const store = configureStore({
  reducer: {
    Evidance: EvidanceSlice,
    EvidanceType: EvidanceTypeSlice,
    Doc: DocSlice,
  },
});
