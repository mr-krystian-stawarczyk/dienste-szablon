import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Carousel } from "react-bootstrap";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { client } from "../lib/client";

function Header9() {
	const [windowWidth, setWindowWidth] = useState(0);

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
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const isMobile = windowWidth <= 768;

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

	const animateOut = {
		opacity: 0,
		transition: {
			duration: 1,
			ease: "easeInOut",
		},
	};

	const controls = useAnimation();

	useEffect(() => {
		if (inView) {
			controls.start(animateIn);
		} else {
			controls.start(animateOut);
		}
	}, [inView, controls, animateIn, animateOut]);

	const [backgroundColor, setBackgroundColor] = useState("#ffffff");
	const [data, setData] = useState([]); // Now we store an array of data from Sanity

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await client.fetch(`*[_type == "dienste4"]`);
				if (data) {
					setData(data); // Store the fetched data in the state
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
			className={`d-flex bg-light py-5 align-items-center justify-content-center "
				}`}
		>
			<Row className="justify-content-center  align-items-center flex-column">
				<Col className="text-dark text-center">
					<h1>Werden Sie einer unserer zufriedenen Kunden !</h1>
				</Col>
				<Col className="mx-auto my-2 text-dark ">
					<Carousel indicators={false} controls={false} interval={2000}>
						{data.map((item, index) => (
							<Carousel.Item key={index}>
								<Card className="border-0 bg-transparent text-center">
									<Card.Body>
										<h1 className="text-bold">{item.title}</h1>
										<Card.Text>{item.paragraph1}</Card.Text>
									</Card.Body>
								</Card>
							</Carousel.Item>
						))}
					</Carousel>
				</Col>
			</Row>
		</Container>
	);
}

export default Header9;
