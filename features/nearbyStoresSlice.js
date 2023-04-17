const { createSlice } = require("@reduxjs/toolkit");

const initialState = '';

const nearbyStoresSlice = createSlice({
	name: "nearBy",
	initialState,
	reducers: {
		setNearbyStores: (_, action) => action.payload,
	},
});

export const {setNearbyStores} = nearbyStoresSlice.actions;
export default nearbyStoresSlice.reducer;
