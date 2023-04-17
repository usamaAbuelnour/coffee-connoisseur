import "@/styles/globals.scss";
import Head from "next/head";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import geolocationSlice from "@/features/geolocationSlice";
import nearbyStoresSlice from "@/features/nearbyStoresSlice";

const store = configureStore({
	reducer: {
		geolocationSlice,
		nearbyStoresSlice,
	},
});


export default function App({ Component, pageProps }) {
	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<Provider store={store}>
				<Component {...pageProps} />
			</Provider>
		</>
	);
}
