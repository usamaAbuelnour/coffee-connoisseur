import { base } from "../../lib/airtable";
const table = base("coffee-stores");
export default async (req, res) => {
	if (req.method === "PATCH") {
		const { id, votes } = req.body;

		if (id) {
			try {
				const coffeeStore = await table
					.select({
						filterByFormula: `id='${id}'`,
					})
					.firstPage();
				if (coffeeStore.length) {
					await table.update([
						{
							id: coffeeStore[0].id,
							fields: {
								votes
							},
						},
					]);
					res.json("record updated");
				} else res.status(400).json({ error: "no such id" });
			} catch (err) {
				res.status(500).json({ error: err.message });
			}
		} else res.status(400).json({ error: "id is missing bro!!" });
	}
};
