import { useRouter } from "next/router";
import styles from "../../styles/coffee-stores/StoreDetails.module.scss";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { memo, useEffect, useRef, useState } from "react";
import axios from "axios";
import ScaleLoader from "react-spinners/ScaleLoader";

const StoreDetails = () => {
	const router = useRouter();
	const nearbyStores = useSelector((state) => state.nearbyStoresSlice);

	let [store, setStore] = useState();

	const mount = useRef(true);
	const mount1 = useRef(true);

	const getStoreAddress = () => {
		const {
			location: { locality },
		} = nearbyStores.find((store) => "locality" in store.location);
		return locality;
	};

	const [votingCount, setVotingCount] = useState("");

	const upVote = () => setVotingCount((prev) => ++prev);

	useEffect(() => {
		if (mount1.current) mount1.current = false;
		else
			axios.patch("/api/upVoteCoffeeStore", {
				id: router.query.storeID,
				votes: votingCount,
			});
	}, [votingCount]);

	useEffect(() => {
		if (nearbyStores) {
			setStore(
				nearbyStores.find((store) => store.fsq_id === router.query.storeID)
			);
		} else {
			if (mount.current) mount.current = false;
			else {
				axios
					.get(`/api/getCoffeeStoreById?id=${router.query.storeID}`)
					.then((res) => {
						setStore(res.data);
						setVotingCount(res.data.votes);
					});
			}
		}
	}, [router.query.storeID]);

	useEffect(() => {
		if (mount.current) mount.current = false;
		else {
			if (nearbyStores) {
				axios
					.post("/api/createCoffeeStore", {
						id: store.fsq_id,
						name: store.name,
						address: store.location.formatted_address || getStoreAddress(),
						imgUrl: store.imgUrl,
						votes: 0,
					})
					.then(() => {
						axios
							.get(`/api/getCoffeeStoreById?id=${router.query.storeID}`)
							.then((res) => {
								setVotingCount(res.data.votes);
							});
					})
					.catch((err) => console.log(err.message));
			}
		}
	}, [store]);

	return store ? (
		<>
			<Head>
				<title>{store.name}</title>
				<meta name="description" content={`${store.name} coffee store`} />
			</Head>
			<div className={styles.store}>
				<div className={styles.nameImageWrapper}>
					<Link className={styles.backLink} href="/">
						<Image
							src="/icons/back-arrow.svg"
							width={24}
							height={24}
							alt="back-arrow"
						/>{" "}
						Back to home
					</Link>
					<h1 className={styles.heading}>{store.name}</h1>

					<div className={styles.imageDetailsWrapper}>
						<div className={styles.imageWrapper}>
							<img src={store.imgUrl} alt="store-image" />
						</div>
						<div className={[styles.rateVoteWrapper, "glass"].join(" ")}>
							<div className={styles.iconWrapper}>
								<Image
									src="/icons/location.svg"
									width={24}
									height={24}
									alt="location"
								/>
								<p>
									{nearbyStores
										? store.location.formatted_address || getStoreAddress()
										: store.address}
								</p>
							</div>
							<div className={styles.iconWrapper}>
								<Image
									src="/icons/star.svg"
									width={24}
									height={24}
									alt="star"
								/>
								<p>
									{votingCount === "" ? (
										<ScaleLoader height={15} />
									) : (
										votingCount
									)}
								</p>
							</div>
							<button
								className={styles.voteButton}
								onClick={upVote}
								disabled={votingCount === ""}
							>
								Up vote!
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	) : null;
};

export default memo(StoreDetails);
