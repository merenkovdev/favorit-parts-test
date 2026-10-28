import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { searchBrands, searchOffers } from "../../api/favoritApi";

export const fetchBrands = createAsyncThunk("search/fetchBrands", searchBrands);
export const fetchOffers = createAsyncThunk("search/fetchOffers", searchOffers);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    number: "",
    brands: [],
    selectedBrand: "",
    offers: [],
    brandsStatus: "idle",
    offersStatus: "idle",
    brandsRequestId: null,
    offersRequestId: null,
    error: "",
  },
  reducers: {
    resetSearch: () => searchSlice.getInitialState(),
    backToBrands(state) {
      state.selectedBrand = "";
      state.offers = [];
      state.offersStatus = "idle";
      state.offersRequestId = null;
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state, action) => {
        state.number = action.meta.arg;
        state.brands = [];
        state.offers = [];
        state.selectedBrand = "";
        state.brandsStatus = "loading";
        state.offersStatus = "idle";
        state.brandsRequestId = action.meta.requestId;
        state.offersRequestId = null;
        state.error = "";
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        if (state.brandsRequestId !== action.meta.requestId) {
          return;
        }
        state.brands = action.payload;
        state.brandsStatus = "succeeded";
        state.brandsRequestId = null;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        if (state.brandsRequestId !== action.meta.requestId) {
          return;
        }
        state.brandsStatus = action.meta.aborted ? "idle" : "failed";
        state.brandsRequestId = null;
        if (!action.meta.aborted) {
          state.error = action.error.message;
        }
      })
      .addCase(fetchOffers.pending, (state, action) => {
        state.selectedBrand = action.meta.arg.brand;
        state.offers = [];
        state.offersStatus = "loading";
        state.offersRequestId = action.meta.requestId;
        state.error = "";
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        if (state.offersRequestId !== action.meta.requestId) {
          return;
        }
        state.offers = action.payload;
        state.offersStatus = "succeeded";
        state.offersRequestId = null;
      })
      .addCase(fetchOffers.rejected, (state, action) => {
        if (state.offersRequestId !== action.meta.requestId) {
          return;
        }
        state.offersStatus = action.meta.aborted ? "idle" : "failed";
        state.offersRequestId = null;
        if (!action.meta.aborted) {
          state.error = action.error.message;
        }
      });
  },
});

export const { backToBrands, resetSearch } = searchSlice.actions;
export default searchSlice.reducer;
