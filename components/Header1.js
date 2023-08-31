import React, { useEffect, useState } from "react";
import { Card, Container, Button, Row, Col } from "react-bootstrap";

import Link from "next/link";
import Image from "next/image";
import { client, urlFor } from "../lib/client";
import imageUrlBuilder from "@sanity/image-url";

const Header1 = () => {
	const [backgroundType, setBackgroundType] = useState("color");
	const [backgroundColor, setBackgroundColor] = useState("#ffffff");
	const [backgroundImage, setBackgroundImage] = useState(null);
	const [textDuzy, setTextDuzy] = useState("");
	const [textMaly, setTextMaly] = useState("");
	const [textColor, setTextColor] = useState("");
	const [button1Text, setButton1Text] = useState(""); // Nowe pole
	const [button2Text, setButton2Text] = useState(""); // Nowe pole
	const [buttonBackground, setButtonBackground] = useState(""); // Nowe pole
	const [buttonTextColor, setButtonTextColor] = useState(""); // Nowe pole

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await client.fetch(`*[_type == "sekcja1"][0]`);
				if (data) {
					setBackgroundType(data.backgroundType || "color");
					setBackgroundColor(data.backgroundColor || "#ffffff");
					setBackgroundImage(data.backgroundImage || null);
					setTextDuzy(data.textDuzy || "");
					setTextMaly(data.textMaly || "");
					setTextColor(data.textColor || "");
					setButton1Text(data.button1Text || ""); // Ustawienie tekstu przycisku 1
					setButton2Text(data.button2Text || ""); // Ustawienie tekstu przycisku 2
					setButtonBackground(data.buttonBackground || ""); // Ustawienie koloru tła przycisków
					setButtonTextColor(data.buttonTextColor || ""); // Ustawienie koloru tekstu przycisków
				}
			} catch (error) {
				console.error("Error fetching data from Sanity:", error);
			}
		};

		fetchData();
	}, []);

	if (
		!textDuzy ||
		!textMaly ||
		!backgroundType ||
		!button1Text ||
		!button2Text
	) {
		// You could render a loading state or return null
		return null;
	}

	const backgroundValue =
		backgroundType === "color"
			? backgroundColor
			: backgroundImage
			? `url(${urlFor(backgroundImage).url()})`
			: "";

	const backgroundStyle =
		backgroundType === "color"
			? { backgroundColor: backgroundColor }
			: backgroundImage
			? {
					backgroundImage: `url(${urlFor(backgroundImage).url()})`,
					backgroundSize: backgroundType === "image" ? "100% 100%" : "cover",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "center",
			  }
			: {};

	return (
		<Container
			fluid
			className="vh-100 d-flex"
			style={{
				...backgroundStyle,
			}}
		>
			<Row className="py-5 align-items-center justify-content-center text-center">
				<Col md={8} className="pt-5 mx-auto">
					<Card className="bg-transparent border-0  mx-auto">
						<Card.Body className="text-start blur" style={{ color: textColor }}>
							<h1 className="text-bold">{textDuzy}</h1>
							<h5 className="text-bold">{textMaly}</h5>
							<Button
								as={Link}
								href="#header2"
								className="my-1 mx-auto btn-lg btn-nav"
								style={{
									backgroundColor: buttonBackground,
									color: buttonTextColor,
								}}
							>
								{button1Text}
							</Button>
							<Button
								as={Link}
								href="dienste"
								className="mx-auto my-1 btn-lg btn-nav"
								style={{
									backgroundColor: buttonBackground,
									color: buttonTextColor,
								}}
							>
								{button2Text}
							</Button>
						</Card.Body>{" "}
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default Header1;
