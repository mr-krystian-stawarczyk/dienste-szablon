import Link from "next/link";
import React, { useRef, useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useAnimation } from "framer-motion";

import { AiOutlineFacebook, AiOutlineInstagram } from "react-icons/ai";

import { BsSnapchat } from "react-icons/bs";
import { client, urlFor } from "../lib/client";
function Footer() {
	const sectionRef = useRef(null);
	const [backgroundColor, setBackgroundColor] = useState("#ffffff");
	const [textColor, setTextColor] = useState("#000000");
	const [nazwaFirmy, setNazwaFirmy] = useState("");

	const [fbLink, setFbLink] = useState("");
	const [snLink, setSnLink] = useState("");
	const [instaLink, setInstaLink] = useState("");

	const [email, setEmail] = useState("");

	const handleLinkClick = (link) => {
		if (link) {
			window.open(`https://${encodeURIComponent(link)}`);
		}
	};

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

	const [categories, setCategories] = useState([]);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const categoryData = await client.fetch(
					`*[_type == "category"] | order(_createdAt) [0...4]`
				);
				setCategories(categoryData);
			} catch (error) {
				console.error("Error fetching categories from Sanity:", error);
			}
		};

		fetchCategories();
	}, []);

	const controls = useAnimation();
	useEffect(() => {
		if (inView) {
			controls.start(animateIn);
		}
	}, [inView, controls, animateIn]);

	const handleEmailClick = () => {
		window.location.href = `mailto:${email}`;
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await client.fetch(`*[_type == "footer"][0]`);
				if (data) {
					setBackgroundColor(data.backgroundColor || "#ffffff");
					setNazwaFirmy(data.nazwaFirmy || "");
					setFbLink(data.fbLink || "");
					setSnLink(data.snLink || "");
					setInstaLink(data.istaLink || "");
					setTextColor(data.textColor || "");
					setEmail(data.email || "");
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
			className="overflow-hidden shadow-md "
			style={{
				backgroundColor: backgroundColor,
				color: textColor,
			}}
			ref={sectionRef}
			id="contact"
		>
			<motion.div ref={ref} animate={controls}>
				<Row className=" justify-content-center align-items-top text-center  mt-2  border-bottom">
					<Col lg={3} sm={6} className=" mx-auto">
						<Card
							style={{ width: "20rem" }}
							className="bg-transparent border-0  "
						>
							<Card.Body className="">
								<h3 className="my-3 text-bold">Unsere Firma</h3>
								<Link href="/about" className="footer-links">
									<Card.Text
										className="py-2 hover"
										style={{
											color: textColor,
										}}
									>
										{" "}
										Über uns
									</Card.Text>
								</Link>
								<Link href="/contact" className="footer-links">
									<Card.Text
										className="py-2 hover"
										style={{
											color: textColor,
										}}
									>
										Kontakt
									</Card.Text>
								</Link>
								<Link href="/blog" className="footer-links">
									<Card.Text
										className="py-2 hover"
										style={{
											color: textColor,
										}}
									>
										Tipps
									</Card.Text>
								</Link>
								<Link href="/contact" className="footer-links">
									<Card.Text
										className="py-2 hover"
										style={{
											color: textColor,
										}}
									>
										Fragen
									</Card.Text>
								</Link>
							</Card.Body>
						</Card>
					</Col>
					<Col lg={3} sm={6} className="mx-auto">
						<Card
							style={{ width: "20rem" }}
							className="bg-transparent border-0  "
						>
							<Card.Body className="">
								<h3 className="my-3 text-bold">Mehr</h3>
								<Link href="werk" className="footer-links">
									<Card.Text
										className="py-2 hover"
										style={{
											color: textColor,
										}}
									>
										{" "}
										Realisierung
									</Card.Text>
								</Link>
								<Link href="dienste" className="footer-links">
									<Card.Text
										className="py-2 hover"
										style={{
											color: textColor,
										}}
									>
										Dienste
									</Card.Text>
								</Link>
							</Card.Body>
						</Card>
					</Col>
					<Col lg={3} sm={6} className=" mx-auto">
						<Card
							style={{ width: "20rem" }}
							className="bg-transparent border-0  "
						>
							<Card.Body className="">
								<h3 className="my-3 text-bold">Social Media </h3>

								<Card.Text className="footer-links contact-links">
									<a onClick={() => handleLinkClick(fbLink)} target="_blank">
										<AiOutlineFacebook
											style={{ fontSize: "3rem" }}
											className="contact-icons fb-icon"
										/>
									</a>
								</Card.Text>

								<Card.Text className="footer-links contact-links">
									<a onClick={() => handleLinkClick(instaLink)} target="_blank">
										<AiOutlineInstagram
											style={{ fontSize: "3rem" }}
											className="contact-icons in-icon"
										/>
									</a>
								</Card.Text>

								<Card.Text className="footer-links contact-links">
									<a onClick={() => handleLinkClick(snLink)} target="_blank">
										<BsSnapchat
											style={{ fontSize: "3rem" }}
											className="contact-icons sn-icon"
										/>
									</a>
								</Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col lg={3} sm={6} className=" mx-auto">
						<Card
							className="bg-transparent border-0  pt-3 "
							style={{ width: "20rem" }}
						>
							<h3 className="my-3 text-bold">Kontakt</h3>
							<a
								onClick={handleEmailClick}
								className="footer-links hover"
								style={{
									color: textColor,
								}}
							>
								<h4 className="py-5">{email}</h4>
							</a>
						</Card>
					</Col>
				</Row>
				<Row className="text-center my-2">
					<Col>
						<h6>2023 {nazwaFirmy} Alle Rechte vorbehalten</h6>
					</Col>
					<Col>
						<Link
							href="/policy"
							className="footer-links "
							style={{
								color: textColor,
							}}
						>
							<h6 className="hover">Politik & Cookies</h6>
						</Link>
					</Col>
				</Row>
			</motion.div>
		</Container>
	);
}

export default Footer;
