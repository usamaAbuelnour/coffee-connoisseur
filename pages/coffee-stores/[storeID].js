import { fetchStoresData } from "@/lib/fetchStoresData";
import { useRouter } from "next/router";
import styles from "../../styles/coffee-stores/StoreDetails.module.scss";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import ScaleLoader from "react-spinners/ScaleLoader";

export const getStaticPaths = async () => ({ paths: [], fallback: true });

export const getStaticProps = async ({ params }) => {
	const stores = await fetchStoresData();
	const store = stores.find((store) => store.fsq_id === params.storeID);
	if (!store) return { notFound: true };

	return {
		props: {
			store,
		},
	};
};

const StoreDetails = ({ store }) => {
	const router = useRouter();
	if (router.isFallback) return <h1>loading...</h1>;

	const mount = useRef(true);
	const mount1 = useRef(true);

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
		axios
			.post("/api/createCoffeeStore", {
				id: store.fsq_id,
				name: store.name,
				address: store.location.formatted_address,
				imgUrl: store.imgUrl,
				votes: 0,
			})
			.then(() =>
				axios
					.get(`/api/getCoffeeStoreById?id=${router.query.storeID}`)
					.then((res) => {
						setVotingCount(res.data.votes);
					})
			)
			.catch((err) => console.log(err.message));
	}, []);

	return (
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
							{store.location.formatted_address && (
								<div className={styles.iconWrapper}>
									<Image
										src="/icons/location.svg"
										width={24}
										height={24}
										alt="location"
									/>
									<p>{store.location.formatted_address}</p>
								</div>
							)}
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
	);
};

export default StoreDetails;
