import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

import Link from "next/link";

import Image from "next/image";
import { client, urlFor } from "../lib/client";
import imageUrlBuilder from "@sanity/image-url";

function Header2() {
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
	const [textDuzy, setTextDuzy] = useState("");
	const [textMaly1, setTextMaly1] = useState("");
	const [textMaly2, setTextMaly2] = useState("");
	const [textMaly3, setTextMaly3] = useState("");
	const [textColor, setTextColor] = useState("#000000");
	const [buttonText, setButtonText] = useState("");
	const [buttonBackground, setButtonBackground] = useState("#ffffff"); // Set a default value
	const [buttonTextColor, setButtonTextColor] = useState("#000000"); // Set a default value
	const [linkTo, setLinkTo] = useState("about"); // Initialize the state for linkTo

	const [image, setImage] = useState(null);

	const sectionPaths = {
		contact: "contact", // Mapuj wybór do odpowiednich ścieżek
		about: "about",
		blog: "blog",
		werk: "werk",
		dienste: "dienste",
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await client.fetch(`*[_type == "sekcja2"][0]`);
				if (data) {
					setBackgroundColor(data.backgroundColor || "#ffffff");
					setTextDuzy(data.textDuzy || "");
					setTextMaly1(data.textMaly1 || "");
					setTextMaly2(data.textMaly2 || "");
					setTextMaly3(data.textMaly3 || "");
					setTextColor(data.textColor || "");
					setButtonText(data.buttonText || "");
					setButtonBackground(data.buttonBackground || "");
					setButtonTextColor(data.buttonTextColor || "");
					setImage(data.image ? urlFor(data.image).url() : null); // Set the image URL

					setLinkTo(data.linkTo || "");
				}
			} catch (error) {
				console.error("Error fetching data from Sanity:", error);
			}
		};

		fetchData();
	}, []);

	const backgroundStyle = { backgroundColor: backgroundColor };

	return (
		<motion.div ref={ref} animate={controls} id="header2">
			<Container
				fluid
				className={`d-flex py-3 align-items-center justify-content-center ${
					isMobile ? "min-vh-100" : "vh-100"
				}`}
				style={{
					...backgroundStyle,
				}}
			>
				<Row className="justify-content-center  align-items-center">
					<Col lg={5} className="mx-auto my-2 ">
						<Card className="border-0 bg-transparent ">
							<Card.Body style={{ color: textColor }}>
								<h1 className="text-bold"> {textDuzy}</h1>
								<Card.Text>{textMaly1}</Card.Text>
								<Card.Text>{textMaly2}</Card.Text>
								<Card.Text>{textMaly3}</Card.Text>
								<div className="text-center">
									<Link href={sectionPaths[linkTo]} className="m-1">
										<Button
											className="btn-nav btn-lg"
											style={{
												backgroundColor: buttonBackground,
												color: buttonTextColor,
											}}
										>
											{buttonText}
										</Button>
									</Link>
								</div>
							</Card.Body>
						</Card>
					</Col>
					<Col lg={5} className="mx-auto my-2 text-center ">
						{image && (
							<Image
								src={image}
								width={400}
								height={400}
								layout="responsive"
								className="responsive-image shadow-lg"
								alt="Sanity Image"
								priority
							/>
						)}
					</Col>
				</Row>
			</Container>
		</motion.div>
	);
}

export default Header2;
