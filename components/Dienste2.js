import React, { useEffect, useState } from "react";
import { Container, Row, Card, Col } from "react-bootstrap";
import { client } from "../lib/client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Dienste2 = () => {
	const [diensteData, setDiensteData] = useState([]);

	const [windowWidth, setWindowWidth] = useState(0);
	const isMobile = windowWidth <= 768;

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		if (typeof window !== "undefined") {
			setWindowWidth(window.innerWidth);
			window.addEventListener("resize", handleResize);
		}

		return () => {
			if (typeof window !== "undefined") {
				window.removeEventListener("resize", handleResize);
			}
		};
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await client.fetch('*[_type == "dienste2"]');
				if (data) {
					setDiensteData(data);
				}
			} catch (error) {
				console.error("Error fetching data from Sanity:", error);
			}
		};

		fetchData();
	}, []);

	return (
		<Container
			fluid
			className={`d-flex flex-column bg-light py-3 align-items-center justify-content-center ${
				isMobile ? "min-vh-100" : "vh-100"
			}`}
		>
			<Row className="text-dark text-center mb-4">
				<Col xs={12} md={12}>
					<h1>Unsere Dienstleistungen</h1>
				</Col>
				<Col xs={12} md={12}>
					<Row>
						{diensteData.map((item, index) => (
							<Col md={5} key={index} className="mx-auto">
								<InViewWrapper>
									<Card
										className="text-dark m-5 mx-auto border-0 shadow-lg"
										style={{ minWidth: "18rem" }}
										data-index={index}
									>
										<Card.Body>
											<Card.Title className="py-2">{item.title}</Card.Title>
											<Card.Text className="py-1">{item.paragraph1}</Card.Text>
											<Card.Text className="py-1">{item.paragraph2}</Card.Text>
											<Card.Text className="py-1">{item.paragraph3}</Card.Text>
										</Card.Body>
									</Card>
								</InViewWrapper>
							</Col>
						))}
					</Row>
				</Col>
			</Row>
		</Container>
	);
};

const InViewWrapper = ({ children }) => {
	const [ref, inView] = useInView({
		triggerOnce: false,
	});

	const [hasAnimated, setHasAnimated] = useState(false);

	useEffect(() => {
		if (inView) {
			setHasAnimated(true);
		} else {
			setHasAnimated(false); // Resetuj hasAnimated, gdy element jest poza widokiem
		}
	}, [inView]);

	return (
		<motion.div
			ref={ref}
			initial={!hasAnimated ? { opacity: 0, y: 50 } : { opacity: 1, y: 0 }} // Użyj hasAnimated do określenia początkowego stanu
			animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }} // Uruchamia animację, gdy jest widoczne
			exit={{ opacity: 0, y: -50 }}
			transition={{ duration: 0.5 }}
		>
			{children}
		</motion.div>
	);
};

export default Dienste2;
