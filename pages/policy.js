import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

import { client } from "../lib/client";

function Policy() {
	const [policyData, setPolicyData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await client.fetch(`*[_type == "policy"]`);
				if (data) {
					setPolicyData(data);
				}
			} catch (error) {
				console.error("Error fetching data from Sanity:", error);
			}
		};

		fetchData();
	}, []);

	return (
		<Container fluid className="py-5 bg-light text-dark">
			<Row className="text-center">
				<h2 className="py-3">Politik & Cookies</h2>
			</Row>

			{policyData.map((item) => (
				<Row key={item._id} className="mx-auto my-2">
					<h4 className="my-2">{item.title}</h4>
					<h5>{item.description}</h5>
				</Row>
			))}
		</Container>
	);
}

export default Policy;
