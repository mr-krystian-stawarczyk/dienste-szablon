import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Link from "next/link";
import { AiOutlineFacebook, AiOutlineInstagram } from "react-icons/ai";
import { client, urlFor } from "../lib/client";

import { BsSnapchat } from "react-icons/bs";
import { useState, useEffect } from "react";
function Contact2() {
	const [textColor, setTextColor] = useState("#000000");
	const [backgroundColor, setBackgroundColor] = useState("#ffffff");
	const [textDuzy, setTextDuzy] = useState("");
	const [textMaly, setTextMaly] = useState("");
	const [fbLink, setFbLink] = useState("");
	const [snLink, setSnLink] = useState("");
	const [instaLink, setInstaLink] = useState("");

	const handleLinkClick = (link) => {
		if (link) {
			window.open(`https://${encodeURIComponent(link)}`);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await client.fetch(`*[_type == "kontakt2"][0]`);
				if (data) {
					setTextColor(data.textColor || "");
					setBackgroundColor(data.backgroundColor || "#ffffff");

					setTextDuzy(data.textDuzy || "");
					setTextMaly(data.textMaly || "");
					setFbLink(data.fbLink || "");
					setSnLink(data.snLink || "");
					setInstaLink(data.istaLink || "");
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
			className=" py-5 "
			fluid
			style={{
				...backgroundStyle,
			}}
		>
			<Row
				className="justify-content-center text-center align-items-center"
				style={{ color: textColor, minHeight: "70vh" }}
			>
				<Col lg={5} className="mx-auto">
					<Card className="border-0 bg-transparent">
						<Card.Body>
							<h2 className="text-bold">{textDuzy}</h2>
							<Card.Text>{textMaly}</Card.Text>
						</Card.Body>
					</Card>
				</Col>
				<Col lg={5} className="mx-auto d-flex">
					<div className="contact-links ">
						<a onClick={() => handleLinkClick(fbLink)} target="_blank">
							<AiOutlineFacebook
								style={{ fontSize: "7rem" }}
								className="contact-icons fb-icon"
							/>
						</a>
					</div>
					<div className="contact-links  ">
						<a onClick={() => handleLinkClick(snLink)} target="_blank">
							<BsSnapchat
								style={{ fontSize: "7rem" }}
								className="contact-icons sn-icon"
							/>
						</a>
					</div>
					<div className="contact-links  ">
						<a onClick={() => handleLinkClick(instaLink)} target="_blank">
							<AiOutlineInstagram
								style={{ fontSize: "7rem" }}
								className="contact-icons in-icon"
							/>
						</a>
					</div>
				</Col>
			</Row>
		</Container>
	);
}

export default Contact2;
