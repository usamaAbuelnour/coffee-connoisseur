import styles from "./Card.module.scss";
import Link from "next/link";
import Image from "next/image";
import cls from "classnames";

function Card(props) {
	return (
		<Link href={props.href}>
			<div className={cls(styles.card, "glass")}>
				<h2 className={styles.heading}>{props.name}</h2>
				<div className={styles.image}>
					<img src={props.imgUrl} alt="coffee-store-image" />
				</div>
			</div>
		</Link>
	);
}

export default Card;
