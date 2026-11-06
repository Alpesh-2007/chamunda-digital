
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import {
  getBookings,
  updateBooking,
  deleteBooking
} from '../services/api'

// 1. API માંથી બધા Bookings લાવવા
export const fetchBookings = createAsyncThunk(
  'bookings/fetchBookings',
  async (_, thunkAPI) => {
    try {
      const response = await getBookings()
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      )
    }
  }
)

// 2. Booking Status Update કરવા
export const changeBookingStatus = createAsyncThunk(
  'bookings/changeBookingStatus',
  async ({ id, status }, thunkAPI) => {
    try {
      const response = await updateBooking(id, { status })
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      )
    }
  }
)

// 3. Booking Delete કરવા
export const removeBooking = createAsyncThunk(
  'bookings/removeBooking',
  async (id, thunkAPI) => {
    try {
      await deleteBooking(id)
      return id
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      )
    }
  }
)

// Initial State
const initialState = {
  bookings: [],
  loading: false,
  error: null
}

// Redux Slice
const bookingSlice = createSlice({
  name: 'bookings',
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // Fetch Bookings
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true
        state.error = null
      })

      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.loading = false
        state.bookings = action.payload
      })

      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Update Booking Status
      .addCase(changeBookingStatus.fulfilled, (state, action) => {
        const index = state.bookings.findIndex(
          (booking) => booking.id === action.payload.id
        )

        if (index !== -1) {
          state.bookings[index] = action.payload
        }
      })

      .addCase(changeBookingStatus.rejected, (state, action) => {
        state.error = action.payload
      })

      // Delete Booking
      .addCase(removeBooking.fulfilled, (state, action) => {
        state.bookings = state.bookings.filter(
          (booking) => booking.id !== action.payload
        )
      })

      .addCase(removeBooking.rejected, (state, action) => {
        state.error = action.payload
      })
  }
})

export default bookingSlice.reducer
