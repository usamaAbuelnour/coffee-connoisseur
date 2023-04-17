import styles from "./Banner.module.scss";
import Image from "next/image";
import avatar from "../../public/avatar.png";

const Banner = (props) => {
	return (
		<div className={styles.banner}>
			<h1 className={styles.title}>
				<span className={styles.title1}>Coffee</span>{" "}
				<span className={styles.title2}>Connoisseur</span>
			</h1>
			<p className={styles.subtitle}>Discover your local coffee shops!</p>
			<button onClick={props.viewStores}>{props.buttonText}</button>
			<div className={styles.avatar}>
				<img src="/avatar.png" alt='hero-image' />
			</div>
			{props.locationErrMsg && (
				<h6>Some thing went wrong: {props.locationErrMsg}</h6>
			)}
		</div>
	);
};
export default Banner;
