const { createSlice } = require("@reduxjs/toolkit");

const initialState = "";

const geolocationSlice = createSlice({
	name: "geolocation",
	initialState,
	reducers: {
		setGeolocation: (_, action) => action.payload,
	},
});

export const {setGeolocation} = geolocationSlice.actions;
export default geolocationSlice.reducer;
