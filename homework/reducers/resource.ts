import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import { getList, add, update, remove } from "../actions/resource";
import { Resource } from "@/types/resource";

const commonState = {
  isShowIFrame: false,
  isShowImage: false,
  selectedResource: null,
  isShowAddInput: false,
};

export const initialState = {
  ...commonState,
  getListLoading: false,
  getListDone: false,
  getListError: null,
  list: [],
  addLoading: false,
  addDone: false,
  addError: null,
  updateLoading: false,
  updateDone: false,
  updateError: null,
  removeLoading: false,
  removeDone: false,
  removeError: null,
};

const resourceSlice = createSlice({
  name: "resource",
  initialState,
  reducers: {
    setResourceList(state, action) {
      state.list = action.payload;
    },
    setIsShowIFrame(state, action) {
      state.isShowIFrame = action.payload;
    },
    setIsShowImage(state, action) {
      state.isShowImage = action.payload;
    },
    setSelectedResource(state, action) {
      state.selectedResource = action.payload;
    },
    setIsShowAddInput(state, action) {
      state.isShowAddInput = action.payload;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<any>) =>
    builder
      .addCase(getList.pending, (state) => {
        state.getListDone = false;
        state.getListLoading = true;
        state.getListError = null;
      })
      .addCase(getList.fulfilled, (state, action) => {
        state.getListLoading = false;
        state.getListDone = true;
        const list = action.payload.map((resource: Resource) => {
          return { ...resource, enabled: false };
        });
        state.list = list;
      })
      .addCase(getList.rejected, (state, action) => {
        state.getListLoading = false;
        state.getListError = action.payload;
      })
      .addCase(add.pending, (state) => {
        state.addDone = false;
        state.addLoading = true;
        state.addError = null;
      })
      .addCase(add.fulfilled, (state, action) => {
        state.addLoading = false;
        state.addDone = true;
      })
      .addCase(add.rejected, (state, action) => {
        state.addLoading = false;
        state.addError = action.payload;
      })
      .addCase(update.pending, (state) => {
        state.updateDone = false;
        state.updateLoading = true;
        state.updateError = null;
      })
      .addCase(update.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.updateDone = true;
      })
      .addCase(update.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload;
      })
      .addCase(remove.pending, (state) => {
        state.removeDone = false;
        state.removeLoading = true;
        state.removeError = null;
      })
      .addCase(remove.fulfilled, (state, action) => {
        state.removeLoading = false;
        state.removeDone = true;
      })
      .addCase(remove.rejected, (state, action) => {
        state.removeLoading = false;
        state.removeError = action.payload;
      }),
});

export default resourceSlice;
