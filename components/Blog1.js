import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

import Link from "next/link";

import Image from "next/image";
import { client, urlFor } from "../lib/client";
import imageUrlBuilder from "@sanity/image-url";
import { AiOutlineArrowDown } from "react-icons/ai";

function Blog1() {
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
		products: "products",
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await client.fetch(`*[_type == "Porady1"][0]`);
				if (data) {
					setBackgroundColor(data.backgroundColor || "#ffffff");
					setTextDuzy(data.textDuzy || "");
					setTextMaly1(data.textMaly1 || "");
					setTextMaly2(data.textMaly2 || "");
					setTextMaly3(data.textMaly3 || "");
					setTextColor(data.textColor || "");

					setImage(data.image ? urlFor(data.image).url() : null); // Set the image URL
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
				className="vh-100 d-flex py-5 align-items-center justify-content-center "
				style={{
					...backgroundStyle,
				}}
			>
				<Row className="justify-content-center  align-items-center pt-5">
					<Col lg={5} xs={8} className="mx-auto my-2 text-center ">
						{image && (
							<Image
								src={image}
								width={400}
								height={400}
								layout="responsive"
								className="shadow-lg"
								alt="Sanity Image"
								priority
							/>
						)}
					</Col>{" "}
					<Col lg={5} className="mx-auto my-2 ">
						<Card className="border-0 bg-transparent ">
							<Card.Body style={{ color: textColor }}>
								<h1 className="text-bold"> {textDuzy}</h1>
								<Card.Text>{textMaly1}</Card.Text>
								<Card.Text>{textMaly2}</Card.Text>
								<Card.Text>{textMaly3}</Card.Text>
							</Card.Body>
							<div className="text-center">
								<Link href="#blog2">
									<AiOutlineArrowDown
										style={{ fontSize: "3rem" }}
										className="text-dark hover"
									/>{" "}
								</Link>
							</div>
						</Card>
					</Col>
				</Row>
			</Container>
		</motion.div>
	);
}

export default Blog1;
