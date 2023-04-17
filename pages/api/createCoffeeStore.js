import { base } from '../../lib/airtable';

const table = base("coffee-stores");


export default async (req, res) => {
	if (req.method === "POST") {
		const { id, name, address, imgUrl, votes } = req.body;
		if (id && name) {
			try {
				const duplicatedRecords = await table
					.select({
						filterByFormula: `id='${id}'`,
					})
					.firstPage();

				if (!duplicatedRecords.length) {
					await table.create([
						{
							fields: {
								id,
								name,
								address,
								imgUrl,
								votes,
							},
						},
					]);

					res.json("records created");
				} else res.json("id already exists");
			} catch (err) {
				res.status(500).json({ Error: err.message });
			}
		} else res.status(400).json({ Error: "id or name is missing" });
	}
};
