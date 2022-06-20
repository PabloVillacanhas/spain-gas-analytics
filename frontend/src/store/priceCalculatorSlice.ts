import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '.'

// Define a type for the slice state
interface PriceCalculatorState {
	preferredCarburant: string,
	payment: number
}

// Define the initial state using that type
const initialState: PriceCalculatorState = {
	preferredCarburant: 'diesel_a',
	payment: 30,
}

export const priceCalculatorSlice = createSlice({
  name: 'priceCalculator',
  initialState,
  reducers: {
    changePayment: (state: PriceCalculatorState, action: PayloadAction<typeof state.payment>) => {
      state.payment = action.payload
    },
		changePreferredCarburant: (state: PriceCalculatorState, action: PayloadAction<typeof state.preferredCarburant>) => {
      state.preferredCarburant = action.payload
    },
  },
})

export const { changePayment, changePreferredCarburant } = priceCalculatorSlice.actions
export const usePriceCalculatorSelector = (state: RootState) => state.priceCalculator

export default priceCalculatorSlice.reducer