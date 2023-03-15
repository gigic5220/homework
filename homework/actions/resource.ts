import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../common/api";
import { ResourceReq } from "@/types/resource";

export const getList = createAsyncThunk(
  "resource/getList",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/v1/resource");
      console.log("response", response);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const add = createAsyncThunk(
  "resource/add",
  async (data: ResourceReq | ResourceReq[], { rejectWithValue }) => {
    try {
      const response = await api.post("/api/v1/resource", data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const update = createAsyncThunk(
  "resource/update",
  async (data: ResourceReq, { rejectWithValue }) => {
    try {
      const response = await api.put("/api/v1/resource/", data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const remove = createAsyncThunk(
  "resource/remove",
  async (data: number | undefined, { rejectWithValue }) => {
    try {
      const response = await api.delete("/api/v1/resource/" + data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
