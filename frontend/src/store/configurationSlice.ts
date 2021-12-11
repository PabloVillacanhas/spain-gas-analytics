import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '.'

// Define a type for the slice state
interface ConfigurationState {
		preferredLanguage: string,
		preferredCarburant: string,
}

// Define the initial state using that type
const initialState: ConfigurationState = {
		preferredLanguage: 'en/US',
		preferredCarburant: 'diesel_a',
}

export const configurationSlice = createSlice({
  name: 'configuration',
  initialState,
  reducers: {
    changePreferredLanguage: (state: ConfigurationState, action: PayloadAction<typeof state.preferredLanguage>) => {
      state.preferredLanguage = action.payload
    },
  },
})

export const { changePreferredLanguage } = configurationSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectPreferredLanguage = (state: RootState) => state.configuration.preferredLanguage

export default configurationSlice.reducer