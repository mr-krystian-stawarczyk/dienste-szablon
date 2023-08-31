import React from "react";
import { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useAnimation } from "framer-motion";

import Link from "next/link";

import Image from "next/image";
import { client, urlFor } from "../lib/client";
import imageUrlBuilder from "@sanity/image-url";
function About2() {
	const [backgroundColor, setBackgroundColor] = useState("#ffffff");
	const [textDuzy1, setTextDuzy1] = useState("");
	const [textDuzy2, setTextDuzy2] = useState("");
	const [textMaly1, setTextMaly1] = useState("");
	const [textMaly2, setTextMaly2] = useState("");
	const [textMaly3, setTextMaly3] = useState("");
	const [textMaly4, setTextMaly4] = useState("");
	const [textMaly5, setTextMaly5] = useState("");
	const [textMaly6, setTextMaly6] = useState("");
	const [textColor, setTextColor] = useState("#000000");

	const [ref1, inView1] = useInView({
		threshold: 0.5,
		triggerOnce: false,
	});

	const [ref2, inView2] = useInView({
		threshold: 0.5,
		triggerOnce: false,
	});
	const [ref3, inView3] = useInView({
		threshold: 0.5,
		triggerOnce: false,
	});

	const [ref4, inView4] = useInView({
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

	const [windowWidth, setWindowWidth] = useState(0);
	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		// Attach the event listener only on the client side
		if (typeof window !== "undefined") {
			setWindowWidth(window.innerWidth);
			window.addEventListener("resize", handleResize);
		}

		// Clean up the event listener when the component unmounts
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

	const controls1 = useAnimation();
	const controls2 = useAnimation();
	const controls3 = useAnimation();
	const controls4 = useAnimation();

	useEffect(() => {
		if (inView1) {
			controls1.start(animateIn);
		}
	}, [inView1, controls1, animateIn]);

	useEffect(() => {
		let timeout;
		if (inView2) {
			timeout = setTimeout(() => {
				controls2.start(animateIn);
			}, 500);
		}

		return () => clearTimeout(timeout);
	}, [inView2, controls2, animateIn]);

	useEffect(() => {
		let timeout;
		if (inView3) {
			timeout = setTimeout(() => {
				controls3.start(animateIn);
			}, 1000);
		}

		return () => clearTimeout(timeout);
	}, [inView3, controls3, animateIn]);

	useEffect(() => {
		let timeout;
		if (inView4) {
			timeout = setTimeout(() => {
				controls4.start(animateIn);
			}, 1900);
		}

		return () => clearTimeout(timeout);
	}, [inView4, controls4, animateIn]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await client.fetch(`*[_type == "onas2"][0]`);
				if (data) {
					setBackgroundColor(data.backgroundColor || "#ffffff");
					setTextDuzy1(data.textDuzy1 || "");
					setTextDuzy2(data.textDuzy2 || "");
					setTextMaly1(data.textMaly1 || "");
					setTextMaly2(data.textMaly2 || "");
					setTextMaly3(data.textMaly3 || "");
					setTextMaly4(data.textMaly4 || "");
					setTextMaly5(data.textMaly5 || "");
					setTextMaly6(data.textMaly6 || "");
					setTextColor(data.textColor || "");
				}
			} catch (error) {
				console.error("Error fetching data from Sanity:", error);
			}
		};

		fetchData();
	}, []);

	const backgroundStyle = { backgroundColor: backgroundColor };

	return (
		<Container
			fluid
			className={`d-flex flex-column py-5 justify-content-center align-items-center min-vh-100`}
			style={{ ...backgroundStyle, color: textColor }}
		>
			<Row className="text-center d-row my-2">
				<h1>{textDuzy1}</h1>
				<h3>{textDuzy2}</h3>
			</Row>
			<Row className=" text-center  ">
				<Col lg={3} className="mx-auto">
					<motion.div
						ref={ref1}
						animate={controls1}
						initial={{ opacity: 0 }}
						transition={{ delay: 1 }}
					>
						<Card className="border-0 bg-transparent ">
							<Card.Body>
								<h1>1</h1>
								<Card.Text className="text-bold">{textMaly1}</Card.Text>
								<Card.Text>{textMaly2}</Card.Text>
							</Card.Body>
						</Card>
					</motion.div>
				</Col>
				<Col lg={3} className="mx-auto">
					<motion.div
						ref={ref2}
						animate={controls2}
						initial={{ opacity: 0 }}
						transition={{ delay: 1 }}
					>
						<Card className="border-0 bg-transparent ">
							<Card.Body>
								<h1>2</h1>
								<Card.Text className="text-bold">{textMaly3}</Card.Text>
								<Card.Text>{textMaly4}</Card.Text>
							</Card.Body>
						</Card>
					</motion.div>
				</Col>
				<Col lg={3} className="mx-auto ">
					<motion.div
						ref={ref3}
						animate={controls3}
						initial={{ opacity: 0 }}
						transition={{ delay: 1 }}
					>
						<Card className="border-0 bg-transparent ">
							<Card.Body>
								<h1>3</h1>
								<Card.Text className="text-bold">{textMaly5}</Card.Text>
								<Card.Text>{textMaly6}</Card.Text>
							</Card.Body>
						</Card>{" "}
					</motion.div>
				</Col>
			</Row>
		</Container>
	);
}

export default About2;
