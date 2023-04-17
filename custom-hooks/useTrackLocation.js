import { useState } from "react";
import { setGeolocation } from "@/features/geolocationSlice";
import { useDispatch } from "react-redux";

export const useTrackLocation = () => {
    const dispatch = useDispatch();
	const [locationErrMsg, setLocationErrMsg] = useState();
	const [isFindingLocation, setIsFindingLocation] = useState(false);

	const success = (position) => {
		const latitude = position.coords.latitude;
		const longitude = position.coords.longitude;
        dispatch(setGeolocation(`${latitude},${longitude}`));
		setLocationErrMsg("");
		setIsFindingLocation(false);
	};

	const error = (msg) => {
		setLocationErrMsg(msg);
		setIsFindingLocation(false);
	};

	const handleTrackLocation = () => {
		setIsFindingLocation(true);
		if (!navigator.geolocation)
			error("Geolocation is not supported by your browser!");
		else
			navigator.geolocation.getCurrentPosition(success, () =>
				error("unable to retrieve your location!")
			);
	};

	return { handleTrackLocation, locationErrMsg, isFindingLocation };
};
