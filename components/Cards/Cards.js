import styles from "./Cards.module.scss";
import Card from "../Card/Card";

function Cards({ stores, nearby }) {
	return (
		<>
			<h2 className={styles.storesHeading}>
				{nearby ? "Stores near me" : stores[0].location.locality + " stores"}
			</h2>
			<div className={styles.cards}>
				{stores.map((store) => (
					<Card
						key={Math.random()}
						name={store.name}
						href={
							nearby ? `/nearby/${store.fsq_id}` : `/coffee-stores/${store.fsq_id}`
						}
						imgUrl={store.imgUrl}
					/>
				))}
			</div>
		</>
	);
}

export default Cards;
