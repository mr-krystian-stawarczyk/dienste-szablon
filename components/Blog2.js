import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

import Link from "next/link";

import Image from "next/image";
import { client, urlFor } from "../lib/client";
import imageUrlBuilder from "@sanity/image-url";

function Blog2() {
	const [ref, inView] = useInView({
		threshold: 0.5,
		triggerOnce: false,
	});

	const animateIn = {
		opacity: 1,
		transition: {
			duration: 1,
			ease: "easeInOut",
		},
	};

	const controls = useAnimation();

	useEffect(() => {
		if (inView) {
			controls.start(animateIn);
		}
	}, [inView, controls, animateIn]);

	const [backgroundColor, setBackgroundColor] = useState("#ffffff");
	const [articles, setArticles] = useState([]); // Store the list of articles
	const [textColor, setTextColor] = useState("#000000");
	const [date, setDate] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await client.fetch(`*[_type == "porady2"]`);
				if (data) {
					setBackgroundColor(data[0].backgroundColor || "#ffffff");
					setTextColor(data[0].textColor || "");
					setArticles(data); // Store the list of articles
					setDate(data.data);
				}
			} catch (error) {
				console.error("Error fetching data from Sanity:", error);
			}
		};

		fetchData();
	}, []);

	const textColorH = (() => {
		const r = parseInt(backgroundColor.slice(1, 3), 16);
		const g = parseInt(backgroundColor.slice(3, 5), 16);
		const b = parseInt(backgroundColor.slice(5, 7), 16);
		const brightness = (r * 299 + g * 587 + b * 114) / 1000;
		return brightness > 128 ? "black" : "white";
	})();

	const backgroundStyle = { backgroundColor: backgroundColor };
	const textStyle = { color: textColorH };
	return (
		<motion.div ref={ref} animate={controls}>
			<Container
				fluid
				className="  align-items-center justify-content-center"
				style={{
					...backgroundStyle,
				}}
			>
				<Row className="py-1" id="blog2">
					<Col>
						<h1 className="text-center py-1" style={{ ...textStyle }}>
							Najnowsze Artykuły
						</h1>
					</Col>
				</Row>
				<Row className="justify-content-center  align-items-center">
					{articles.map((article, index) => (
						<Row key={index} className="py-3">
							<Col key={index} className="mx-auto my-2 text-center">
								{article.image && (
									<Image
										src={urlFor(article.image).url()}
										width={400}
										height={400}
										className="responsive-image shadow-lg"
										alt="Sanity Image"
										priority
									/>
								)}
								<Col md={8} className="mx-auto my-2">
									<Card className="border-0 bg-transparent">
										<Card.Body style={{ color: article.textColor }}>
											<h1 className="text-bold">{article.textDuzy}</h1>
											<Card.Text>{article.data}</Card.Text>
											<Card.Text>{article.textMaly1}</Card.Text>
											<Card.Text>{article.textMaly2}</Card.Text>
											<Card.Text>{article.textMaly3}</Card.Text>
										</Card.Body>
									</Card>
								</Col>
							</Col>{" "}
						</Row>
					))}
				</Row>
			</Container>
		</motion.div>
	);
}

export default Blog2;
