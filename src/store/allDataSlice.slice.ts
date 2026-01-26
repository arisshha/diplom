import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { allDataApi, type AllDataResponse } from '../api/allDataApi';
// Оставили только то, что реально используем ниже
import { configPrice, deleteHall, addHall, configHall, openHall } from './hallOperationsSlice.slice';
import type { CreateHallResponse } from '../api/hallApi';
import { deleteFilm } from './filmOperationsSlice.slice';
import { deleteSeance } from './seanceOperationsSlice.slice';

export const fetchAllData = createAsyncThunk(
  'allData/fetchAllData',
  async (): Promise<AllDataResponse> => {
    return await allDataApi.getAllData();
  }
);

interface AllDataState {
  data: AllDataResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: AllDataState = {
  data: null,
  loading: false,
  error: null
};

const allDataSlice = createSlice({
  name: 'allData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAllData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки данных';
      })
      .addCase(deleteHall.fulfilled, (state, action) => {
        if (state.data?.result?.halls) {
          const hallId = action.payload;
          state.data.result.halls = state.data.result.halls.filter(hall => hall.id !== hallId);
        } 
      })
      .addCase(addHall.fulfilled, (state, action: PayloadAction<CreateHallResponse>) => {
        if (state.data?.result?.halls && action.payload.success) {
          state.data.result.halls.push(action.payload.result);
        }
      })
      .addCase(configHall.fulfilled, (state, action: PayloadAction<CreateHallResponse>) => {
        state.loading = false;
        if (state.data?.result?.halls) {
          const index = state.data.result.halls.findIndex(hall => hall.id === action.payload.result.id);
          if (index !== -1) {
            state.data.result.halls[index] = action.payload.result;
          }
        } 
      })
      .addCase(configPrice.fulfilled, (state, action: PayloadAction<CreateHallResponse>) => {
        state.loading = false;
        if (state.data?.result?.halls) {
          const index = state.data.result.halls.findIndex(hall => hall.id === action.payload.result.id);
          if (index !== -1) {
            state.data.result.halls[index] = action.payload.result;
          }
        } 
      })
      // Добавили использование остальных импортов, чтобы не было ошибок
      .addCase(deleteFilm.fulfilled, (state, action) => {
        if (state.data?.result?.films) {
          state.data.result.films = state.data.result.films.filter(f => f.id !== action.payload);
        }
      })
      .addCase(deleteSeance.fulfilled, (state, action) => {
        if (state.data?.result?.seances) {
          state.data.result.seances = state.data.result.seances.filter(s => s.id !== action.payload);
        }
      })
      .addCase(openHall.fulfilled, (state, action) => {
        if (action.payload.success && state.data?.result) {
          state.data.result.halls = action.payload.result.halls;
        }
      });
  }
});

export default allDataSlice.reducer;