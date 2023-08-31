import React, { useEffect, useState } from "react";
import { Col, Container, Row, Card, Button } from "react-bootstrap";
import { AiOutlinePhone, AiOutlineMail } from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";

import { client, urlFor } from "../lib/client";
function Contact1() {
	const handleCall = () => {
		const phoneLink = document.createElement("a");
		phoneLink.href = `tel:${telefonPrzycisk}`;
		phoneLink.click();
	};

	const handleEmailClick = () => {
		window.location.href = `mailto:${emailPrzycisk}`;
	};
	const [textColor, setTextColor] = useState("#000000");
	const [backgroundColor, setBackgroundColor] = useState("#ffffff");
	const [buttonBackground, setButtonBackground] = useState("#ffffff");

	const [telefon, setTelefon] = useState("");
	const [telefonPrzycisk, setTelefonPrzycisk] = useState("");
	const [email, setEmail] = useState("");
	const [emailPrzycisk, setEmailPrzycisk] = useState("");

	const [adres, setAdres] = useState("");

	const [adresPrzycisk, setAdresPrzycisk] = useState("#000000"); // Set a default value
	const [buttonTextColor, setButtonTextColor] = useState("#000000");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await client.fetch(`*[_type == "kontakt1"][0]`);
				if (data) {
					setTextColor(data.textColor || "");
					setBackgroundColor(data.backgroundColor || "#ffffff");
					setButtonBackground(data.buttonBackground || "");
					setTelefon(data.telefon || "");
					setTelefonPrzycisk(data.telefonPrzycisk || "");
					setEmail(data.email || "");
					setEmailPrzycisk(data.emailPrzycisk || "");
					setAdres(data.adres || "");
					setAdresPrzycisk(data.adresPrzycisk || "");

					setButtonTextColor(data.buttonTextColor || "#ffffff");
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
			className=""
			fluid
			style={{
				...backgroundStyle,
			}}
		>
			<div className="py-5" style={{ color: textColor }}>
				<Row className=" justify-content-center text-center align-items-center py-5">
					<h1 className="py-3 text-bold">Kontakt</h1>
					<Col lg={5} md={8} sm={8} className="mx-auto my-3 ">
						<Card
							style={{ minWidth: "18rem" }}
							className="bg-transparent border-0 shadow-lg  contact-card "
						>
							<Card.Body>
								<AiOutlinePhone style={{ fontSize: "4rem" }} />
								<Card.Title>Telefon</Card.Title>
								<Card.Text>{telefon}</Card.Text>
								<Button
									className="border-0"
									onClick={handleCall}
									style={{
										backgroundColor: buttonBackground,
										color: buttonTextColor,
									}}
								>
									Anruf
								</Button>
							</Card.Body>
						</Card>
					</Col>
					<Col lg={5} md={8} sm={8} className="my-3 mx-auto">
						<Card
							style={{ minWidth: "18rem" }}
							className="bg-transparent border-0 shadow-lg"
						>
							<Card.Body>
								<AiOutlineMail style={{ fontSize: "4rem" }} />
								<Card.Title>E-mail</Card.Title>
								<Card.Text>{email}</Card.Text>
								<Button
									className="border-0"
									onClick={handleEmailClick}
									style={{
										backgroundColor: buttonBackground,
										color: buttonTextColor,
									}}
								>
									E-Mail schicken
								</Button>
							</Card.Body>
						</Card>
					</Col>
					<Col lg={5} md={8} sm={8} className="my-3 mx-auto">
						<Card
							style={{ minWidth: "18rem" }}
							className="bg-transparent border-0 shadow-lg"
						>
							<Card.Body>
								<HiOutlineLocationMarker style={{ fontSize: "4rem" }} />
								<Card.Title>Adresse</Card.Title>
								<Card.Text>{adres}</Card.Text>
								<Button
									style={{
										backgroundColor: buttonBackground,
										color: buttonTextColor,
									}}
									className="border-0"
									onClick={() => {
										window.open(
											`https://www.google.com/maps/place/${encodeURIComponent(
												adresPrzycisk
											)}`
										);
									}}
								>
									Adresse
								</Button>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</div>
		</Container>
	);
}

export default Contact1;
