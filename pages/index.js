import Banner from "@/components/Banner/Banner";
import styles from "../styles/Home.module.scss";
import Head from "next/head";
import Cards from "@/components/Cards/Cards";
import { fetchStoresData } from "@/lib/fetchStoresData";
import { useTrackLocation } from "@/custom-hooks/useTrackLocation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNearbyStores } from "@/features/nearbyStoresSlice";


export const getStaticProps = async () => {
	const stores = await fetchStoresData();

	return {
		props: { stores },
	};
};

export default  function Home({ stores }) {
	const { handleTrackLocation, locationErrMsg, isFindingLocation } =
		useTrackLocation();

	const nearbyStores = useSelector((state) => state.nearbyStoresSlice);
	const geolocation = useSelector((state) => state.geolocationSlice);
	const dispatch = useDispatch();

	useEffect(() => {
		if (geolocation) {
			(async () => {
				const coffeeStores = await fetchStoresData(geolocation);
				dispatch(setNearbyStores(coffeeStores));
			})();
		}
	}, [geolocation]);

	return (
		<>
			<Head>
				<title>Coffee Conniosseur</title>
			</Head>

			<div className={styles.home}>
				<Banner
					viewStores={handleTrackLocation}
					buttonText={isFindingLocation ? "locating..." : "View stores nearby"}
					locationErrMsg={locationErrMsg}
				/>
				{nearbyStores ? (
					<Cards stores={nearbyStores} nearby />
				) : (
					<Cards stores={stores} />
				)}
			</div>
		</>
	);
}
