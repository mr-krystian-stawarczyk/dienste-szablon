import Image from "next/image";
import React from "react";
import { Col, Row, Container, Button } from "react-bootstrap";
import Head from "next/head";
import Link from "next/link";
function error() {
	return (
		<Container className="mt-5 pt-5">
			<Head>
				<title>404 Error </title>
				<meta
					name="description"
					content="Leider scheint die von Ihnen angeforderte Seite nicht vorhanden zu sein. Kontaktieren Sie uns, um Hilfe zu erhalten, oder besuchen Sie unsere Startseite, um unsere Dienstleistungen zu sehen."
				/>
			</Head>
			<Row className="text-center align-items-center justify-content-center">
				<Col lg={6}>
					<h1>Error</h1>
					<Link href="/">
						<Button className="btn-nav">Home</Button>
					</Link>
				</Col>
				<Col lg={6}>
					<Image
						src="/assets/webagentur-nettetal-pixel-genie-404.png"
						width={500}
						height={500}
						className="responsive-image py-3"
						alt="webagentur-nettetal-pixel-genie-404"
						priority
					/>
				</Col>
			</Row>
		</Container>
	);
}

export default error;
