import { createApi } from "unsplash-js";

const unsplash = createApi({
	accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

const getSplashImages = async () => {
	const photos = await unsplash.search.getPhotos({
		query: "coffee store",
		perPage: 10,
	});

	return photos.response.results.map((photo) => photo.urls.small);
};

export const fetchStoresData = async (
	geolocation = "53.49092348038735,-2.2312767646808043"
) => {
	const photos = await getSplashImages();

	const url = `https://api.foursquare.com/v3/places/search?ll=${geolocation}&query=coffee&limit=10`;
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
		},
	};
	const response = await fetch(url, options);
	const data = await response.json();

	const coffeeStores = data.results.map((store, idx) => ({
		...store,
		imgUrl: photos[idx],
	}));

	return coffeeStores;
};
