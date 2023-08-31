import { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { client, urlFor } from "../lib/client";
import Image from "next/image";
import ImageModal from "./ImageModal";

const Werk3 = () => {
	const [werkData, setWerkData] = useState([]);
	const [showModal, setShowModal] = useState(false); // State for showing modal
	const [modalImage, setModalImage] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await client.fetch(`*[_type == "werk2"]`);
				if (data) {
					setWerkData(data);
				}
			} catch (error) {
				console.error("Error fetching data from Sanity:", error);
			}
		};

		fetchData();
	}, []);

	const handleImageClick = (imageUrl) => {
		setModalImage(imageUrl);
		setShowModal(true);
	};

	return (
		<Container fluid className="bg-light py-5">
			<Row className="text-dark text-center my-3">
				<h1>Unsere Letzte Werk</h1>
			</Row>
			<Row className="justify-content-center align-items-center text-center">
				{werkData.map((item, index) => (
					<Col
						key={index}
						md={4}
						className="mx-auto my-3 d-flex justify-content-center"
					>
						<Card
							style={{ minWidth: "18rem" }}
							className="bg-transparent shadow-lg"
						>
							<div
								onClick={() => handleImageClick(urlFor(item.image))} // Use item.image here, assuming it's the field in your Sanity schema for the image
								variant="top"
							>
								<img
									src={urlFor(item.image)} // Use item.image here
									width={250}
									height={250}
									style={{ cursor: "pointer" }}
									className="m-1"
								/>
							</div>
							<Card.Body>
								<Card.Title className="text-dark">{item.textDuzy}</Card.Title>
							</Card.Body>
						</Card>
					</Col>
				))}
			</Row>
			<ImageModal
				show={showModal}
				handleClose={() => setShowModal(false)}
				imageUrl={modalImage} // Use imageUrl here
			/>
		</Container>
	);
};

export default Werk3;
