import React, { useEffect, useState } from "react";
import { Container, Accordion, Row, Col } from "react-bootstrap";

import { client } from "../lib/client";
import Image from "next/image";

// Import the type

function Produkty3Faq() {
	const [accordionData, setAccordionData] = useState([]);
	const [backgroundColor, setBackgroundColor] = useState("#ffffff");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await client.fetch(`*[_type == "produkty-faq"]`);
				if (data) {
					setBackgroundColor(data[0].backgroundColor || "#ffffff");
					setAccordionData(data[0].accordionItems);
				}
			} catch (error) {
				console.error("Error fetching data from Sanity:", error);
			}
		};

		fetchData();
	}, []);

	const textColor = (() => {
		const r = parseInt(backgroundColor.slice(1, 3), 16);
		const g = parseInt(backgroundColor.slice(3, 5), 16);
		const b = parseInt(backgroundColor.slice(5, 7), 16);
		const brightness = (r * 299 + g * 587 + b * 114) / 1000;
		return brightness > 128 ? "black" : "white";
	})();

	const textStyle = { color: textColor };
	const backgroundStyle = { backgroundColor: backgroundColor };
	return (
		<Container
			className=" py-5"
			fluid
			id="web-design-faq"
			style={{
				...backgroundStyle,
			}}
		>
			<Row className="justify-content-center align-items-center">
				<Col lg={4} md={6} xs={12} className="py-5 text-center">
					<Image
						src="/assets/webentwicklung-nettetal-fragen1.png"
						width={300}
						height={300}
						alt="webentwicklung-nettetal-fragen1"
						priority
					/>
					<h4 className="text-dark">Najczęściej Zadawane Pytania</h4>
				</Col>
			</Row>
			<Row className="justify-content-center align-items-center">
				<Col lg={9} className="mx-auto">
					<Accordion className="shadow-lg">
						{accordionData.map((item, index) => (
							<Accordion.Item key={index} eventKey={index.toString()}>
								<Accordion.Header>{item.title}</Accordion.Header>
								<Accordion.Body>{item.content}</Accordion.Body>
							</Accordion.Item>
						))}
					</Accordion>
				</Col>
			</Row>
		</Container>
	);
}

export default Produkty3Faq;
