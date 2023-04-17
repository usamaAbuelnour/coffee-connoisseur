import { base } from "../../lib/airtable";

const table = base("coffee-stores");

export default async (req, res) => {
	const { id } = req.query;

	if (id) {
		try {
			const coffeeStore = await table
				.select({
					filterByFormula: `id='${id}'`,
				})
				.firstPage();
			if (coffeeStore.length) res.json(coffeeStore[0].fields);
			else res.status(400).json({ error: "no such id" });
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	} else res.status(400).json({ error: "id is missing bro!!" });
};
